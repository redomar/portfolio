"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useActionState, useEffect, useId, useState } from "react";
import {
  type ContactField,
  type ContactState,
  submitContact,
} from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

const input =
  "w-full min-h-12 border-2 border-white/60 bg-black/35 px-4 py-3 text-base text-white placeholder:text-white/50 transition-colors hover:border-white focus:border-[#00d4ff] focus:outline-none aria-[invalid=true]:border-[#ffff00]";
const label = "font-bebas-neue text-lg tracking-[0.15em] text-white";

type FieldProps = {
  name: ContactField;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
  state: ContactState;
};

function Field({
  name,
  label: text,
  required = false,
  type = "text",
  autoComplete,
  placeholder,
  multiline = false,
  state,
}: FieldProps) {
  const id = useId();
  const error =
    state.status === "error" ? state.fieldErrors?.[name] : undefined;
  const value = state.status === "error" ? state.values?.[name] : undefined;
  const common = {
    id,
    name,
    required,
    placeholder,
    defaultValue: value,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: input,
  };

  return (
    <div
      className={`flex flex-col gap-1.5 ${multiline ? "sm:col-span-2" : ""}`}
    >
      <label htmlFor={id} className={label}>
        {text}
        {required ? (
          <span aria-hidden="true" className="text-[#00d4ff]">
            {" "}
            *
          </span>
        ) : (
          <span className="font-mono text-xs tracking-normal text-white/60">
            {" "}
            (optional)
          </span>
        )}
      </label>
      {multiline ? (
        <textarea {...common} rows={5} className={`${input} resize-y`} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-[#ffff00]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  // Set after mount so server and client HTML match; used for bot timing only.
  const [startedAt, setStartedAt] = useState("0");
  useEffect(() => setStartedAt(String(Date.now())), []);

  if (state.status === "success") {
    return (
      <output className="flex flex-col gap-3 border-2 border-white bg-black/40 p-6">
        <CheckCircle2 aria-hidden="true" className="size-8 text-[#00ff88]" />
        <p className="font-anton text-3xl uppercase">
          Thanks{state.name ? `, ${state.name.split(" ")[0]}` : ""}!
        </p>
        <p className="text-white/90">
          Your details are with me. I’ll be in touch soon.
        </p>
      </output>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          required
          autoComplete="name"
          state={state}
        />
        <Field
          name="email"
          label="Work email"
          type="email"
          required
          autoComplete="email"
          state={state}
        />
        <Field
          name="company"
          label="Company"
          autoComplete="organization"
          state={state}
        />
        <Field
          name="role"
          label="Role you’re hiring for"
          placeholder="e.g. Senior Frontend Engineer"
          state={state}
        />
        <Field
          name="message"
          label="Message"
          required
          multiline
          placeholder="A little about the role, team or project"
          state={state}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      {state.status === "error" && (
        <p
          role="alert"
          className="border-l-4 border-[#ffff00] bg-black/40 px-4 py-3 text-sm font-medium text-white"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-white px-6 font-bebas-neue text-2xl tracking-[0.12em] text-[#0d0d10] shadow-[5px_5px_0_#0d0d10] transition-[transform,box-shadow,opacity] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#0d0d10] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
        >
          {pending ? "Sending…" : "Send my details"}
          <Send
            aria-hidden="true"
            className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </button>
        <p className="text-xs text-white/75 sm:max-w-[34ch]">
          Your details are only used to reply to you and are never shared.
        </p>
      </div>
    </form>
  );
}
