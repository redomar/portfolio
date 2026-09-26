"use server";

import { headers } from "next/headers";

export type ContactField = "name" | "email" | "company" | "role" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  /** Daily limit reached: send people to LinkedIn until `lockedUntil` (ms epoch). */
  | { status: "limited"; lockedUntil: number }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      values?: Partial<Record<ContactField, string>>;
    };

export type ContactAvailability =
  | { open: true }
  | { open: false; lockedUntil: number };

const LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 200,
  company: 120,
  role: 120,
  message: 2000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;
const DAY_MS = 24 * 60 * 60 * 1000;
/** Messages accepted site-wide per day before the form closes for 24 hours. */
const DAILY_LIMIT = 10;
/** Messages one visitor (IP) can send per day, so nobody uses up the whole allowance. */
const PER_IP_DAILY_LIMIT = 3;

// Per-instance memory for a single-container site. The n8n workflow keeps the
// authoritative daily count (it survives redeploys); this mirrors its lock so the
// page can show the LinkedIn fallback without a round trip, and covers local dev.
const site = { windowStart: 0, count: 0, lockedUntil: 0 };
const perIp = new Map<string, number[]>();

function lockedUntil(now = Date.now()): number | null {
  return site.lockedUntil > now ? site.lockedUntil : null;
}

function lockUntil(until: number) {
  site.lockedUntil = Math.max(site.lockedUntil, until);
}

function recordAccepted(now = Date.now()) {
  if (now - site.windowStart >= DAY_MS || site.lockedUntil) {
    site.windowStart = now;
    site.count = 0;
    site.lockedUntil = 0;
  }
  site.count += 1;
  if (site.count >= DAILY_LIMIT) lockUntil(now + DAY_MS);
}

function ipLimited(ip: string, now = Date.now()): boolean {
  const hits = (perIp.get(ip) ?? []).filter((t) => now - t < DAY_MS);
  perIp.set(ip, hits);
  return hits.length >= PER_IP_DAILY_LIMIT;
}

function recordIp(ip: string, now = Date.now()) {
  perIp.set(ip, [...(perIp.get(ip) ?? []), now]);
}

function field(form: FormData, name: ContactField): string {
  return String(form.get(name) ?? "")
    .trim()
    .slice(0, LIMITS[name]);
}

/** Lets the (static) page decide on load whether to show the form or LinkedIn. */
export async function getContactAvailability(): Promise<ContactAvailability> {
  const until = lockedUntil();
  return until ? { open: false, lockedUntil: until } : { open: true };
}

export async function submitContact(
  _prev: ContactState,
  form: FormData,
): Promise<ContactState> {
  const locked = lockedUntil();
  if (locked) return { status: "limited", lockedUntil: locked };

  const values = {
    name: field(form, "name"),
    email: field(form, "email"),
    company: field(form, "company"),
    role: field(form, "role"),
    message: field(form, "message"),
  };

  // Bots: the honeypot is hidden from people, and real people take a few seconds.
  const startedAt = Number(form.get("startedAt") ?? 0);
  if (String(form.get("website") ?? "") !== "") {
    return { status: "success", name: values.name };
  }
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return {
      status: "error",
      message: "That was quick! Please check your details and send again.",
      values,
    };
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};
  if (values.name.length < 2) fieldErrors.name = "Enter your name.";
  if (!EMAIL.test(values.email))
    fieldErrors.email = "Enter an email address I can reply to.";
  if (values.message.length < 10)
    fieldErrors.message = "Add a short message (at least 10 characters).";
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (ipLimited(ip)) {
    return {
      status: "error",
      message:
        "You've already sent a few messages today. I'll reply soon, or you can message me on LinkedIn.",
      values,
    };
  }

  const payload = {
    ...values,
    submittedAt: new Date().toISOString(),
    source: "redomar.co.uk contact form",
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[contact] CONTACT_WEBHOOK_URL not set; submission:",
        payload,
      );
      recordIp(ip);
      recordAccepted();
      return { status: "success", name: values.name };
    }
    console.error("[contact] CONTACT_WEBHOOK_URL is not configured");
    return {
      status: "error",
      message:
        "The form isn't accepting messages right now. Please reach out on LinkedIn instead.",
      values,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { "X-Contact-Secret": process.env.CONTACT_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await response.json().catch(() => ({}))) as {
      lockedUntil?: number | null;
    };

    if (response.status === 429) {
      const until =
        typeof body.lockedUntil === "number"
          ? body.lockedUntil
          : Date.now() + DAY_MS;
      lockUntil(until);
      return { status: "limited", lockedUntil: until };
    }
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);

    recordIp(ip);
    recordAccepted();
    if (typeof body.lockedUntil === "number") lockUntil(body.lockedUntil);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return {
      status: "error",
      message:
        "Your message couldn't be sent. Please try again, or reach out on LinkedIn.",
      values,
    };
  }

  return { status: "success", name: values.name };
}
