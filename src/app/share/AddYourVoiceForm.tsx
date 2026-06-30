"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shareCopy } from "./share.config";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "mt-2 w-full rounded-lg border border-ltl-border bg-ltl-bg px-3 py-2 text-ltl-text-primary outline-none placeholder:text-ltl-text-secondary focus:border-ltl-accent focus:ring-2 focus:ring-ltl-accent/20";

const fileInputClassName =
  "mt-2 block w-full text-sm text-ltl-text-secondary file:mr-3 file:rounded-md file:border-0 file:bg-ltl-accent file:px-4 file:py-2 file:text-sm file:font-bold file:text-ltl-bg hover:file:bg-ltl-accent-hover";

const hubPageClass =
  "ltl-theme-magazine ltl-hub-page ltl-hub-handoff relative min-h-[calc(100dvh-4rem)] bg-ltl-bg px-4 py-16 sm:px-6";

export default function AddYourVoiceForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const remaining = shareCopy.maxQuoteLength - quote.length;
  const canSubmit =
    quote.trim().length > 0 &&
    name.trim().length > 0 &&
    role.trim().length > 0 &&
    consent &&
    status !== "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch(shareCopy.endpoint, { method: "POST", body: data });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(payload.error ?? shareCopy.errorBody);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(shareCopy.errorBody);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={hubPageClass}>
        <div className="mx-auto max-w-xl ltl-media-container rounded-2xl p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-ltl-accent/15 ring-1 ring-ltl-accent/30">
            <span className="text-2xl font-bold text-ltl-accent" aria-hidden>
              ✓
            </span>
          </div>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-ltl-text-primary">
            {shareCopy.successHeading}
          </h1>
          <p className="mt-2 text-ltl-text-secondary">{shareCopy.successBody}</p>
          <Link
            href="/#community"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-6 h-11 rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-bg",
            )}
          >
            Back to the community wall
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={hubPageClass}>
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
            {shareCopy.kicker}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-ltl-text-primary">
            {shareCopy.heading}
          </h1>
          <p className="mt-3 text-base text-ltl-text-secondary">{shareCopy.subhead}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="ltl-media-container mt-8 space-y-5 rounded-2xl p-6 sm:p-8"
        >
          <div>
            <label htmlFor="quote" className="block text-sm font-semibold text-ltl-text-primary">
              {shareCopy.promptLabel}
            </label>
            <textarea
              id="quote"
              name="quote"
              required
              rows={4}
              maxLength={shareCopy.maxQuoteLength}
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              placeholder={shareCopy.promptPlaceholder}
              className={fieldClassName}
            />
            <div className="mt-1 flex justify-between text-xs text-ltl-text-secondary">
              <span>{shareCopy.promptHint}</span>
              <span aria-live="polite">{remaining}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              id="name"
              name="name"
              label={shareCopy.nameLabel}
              required
              value={name}
              onChange={setName}
            />
            <Field
              id="role"
              name="role"
              label={shareCopy.roleLabel}
              required
              value={role}
              onChange={setRole}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="org" name="org" label={shareCopy.orgLabel} />
            <div>
              <Field
                id="email"
                name="email"
                type="email"
                label={shareCopy.emailLabel}
                autoComplete="email"
              />
              <p className="mt-1 text-xs text-ltl-text-secondary">
                {shareCopy.emailPrivacyNote}
              </p>
            </div>
          </div>

          <Field
            id="companyUrl"
            name="companyUrl"
            type="url"
            label={shareCopy.companyUrlLabel}
            placeholder={shareCopy.companyUrlPlaceholder}
          />

          {shareCopy.allowAudio && (
            <div>
              <label htmlFor="audio" className="block text-sm font-semibold text-ltl-text-primary">
                {shareCopy.audioLabel}
              </label>
              <input
                id="audio"
                name="audio"
                type="file"
                accept="audio/*"
                className={fileInputClassName}
              />
              <p className="mt-1 text-xs text-ltl-text-secondary">{shareCopy.audioHint}</p>
            </div>
          )}

          {shareCopy.allowVideo && (
            <div>
              <label htmlFor="video" className="block text-sm font-semibold text-ltl-text-primary">
                {shareCopy.videoLabel}
              </label>
              <input
                id="video"
                name="video"
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className={fileInputClassName}
              />
              <p className="mt-1 text-xs text-ltl-text-secondary">{shareCopy.videoHint}</p>
            </div>
          )}

          <label className="flex items-start gap-3 text-sm text-ltl-text-secondary">
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              className="mt-0.5 size-4 rounded border-ltl-border text-ltl-accent focus:ring-ltl-accent"
            />
            <span>{shareCopy.consentLabel}</span>
          </label>

          {status === "error" && errorMessage && (
            <p className="text-sm font-medium text-destructive" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-md bg-ltl-accent px-5 py-3 text-sm font-bold text-ltl-bg transition hover:bg-ltl-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? shareCopy.submittingLabel : shareCopy.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ltl-text-primary">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...(onChange != null && value != null
          ? { value, onChange: (event) => onChange(event.target.value) }
          : {})}
        className={fieldClassName}
      />
    </div>
  );
}
