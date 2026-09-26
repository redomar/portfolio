"use server";

import { headers } from "next/headers";

export type ContactField = "name" | "email" | "company" | "role" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      values?: Partial<Record<ContactField, string>>;
    };

const LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 200,
  company: 120,
  role: 120,
  message: 2000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;

// Per-instance memory is enough for a single-container site; it resets on deploy.
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > RATE_MAX;
}

function field(form: FormData, name: ContactField): string {
  return String(form.get(name) ?? "")
    .trim()
    .slice(0, LIMITS[name]);
}

export async function submitContact(
  _prev: ContactState,
  form: FormData,
): Promise<ContactState> {
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
  if (rateLimited(ip)) {
    return {
      status: "error",
      message:
        "You've sent a few messages already. Please try again in an hour.",
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
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
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
