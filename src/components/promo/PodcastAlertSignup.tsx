"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { podcastAlertCopy } from "@/data/podcast-alerts.config";
import { cn } from "@/lib/utils";

type PodcastAlertSignupProps = {
  source: "homepage" | "podcast";
  className?: string;
  /** Tighter layout for hero bands */
  compact?: boolean;
};

export function PodcastAlertSignup({
  source,
  className,
  compact = false,
}: PodcastAlertSignupProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(podcastAlertCopy.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });

      const data = (await response.json()) as {
        error?: string;
        emailSent?: boolean;
      };

      if (!response.ok) {
        setError(data.error ?? podcastAlertCopy.errorBody);
        return;
      }

      setSubmittedEmail(email.trim());
      setEmailSent(Boolean(data.emailSent));
      setSubmitted(true);
      setEmail("");
    } catch {
      setError(podcastAlertCopy.errorBody);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-xl border border-ltl-border/80 bg-ltl-surface/60 px-5 py-6 text-center",
          className,
        )}
      >
        <p className="font-heading text-lg font-semibold text-ltl-text-primary">
          {podcastAlertCopy.successHeading}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ltl-text-secondary">
          {emailSent ? (
            <>
              We sent a confirmation to{" "}
              <span className="font-medium text-ltl-text-primary">{submittedEmail}</span>.
              {podcastAlertCopy.successBody}
            </>
          ) : (
            <>
              Thanks — we saved{" "}
              <span className="font-medium text-ltl-text-primary">{submittedEmail}</span>.{" "}
              {podcastAlertCopy.successBody}
            </>
          )}
        </p>
        <Link
          href="/podcast"
          className="mt-4 inline-block text-sm font-medium text-ltl-accent hover:underline"
        >
          See the 12-episode schedule
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-ltl-border/80 bg-ltl-surface/40 px-5 py-6",
        compact ? "text-left" : "text-center",
        className,
      )}
    >
      {!compact ? (
        <p className="font-label text-[0.65rem] uppercase tracking-[0.22em] text-ltl-accent">
          {podcastAlertCopy.kicker}
        </p>
      ) : null}
      <p
        className={cn(
          "font-heading font-semibold text-ltl-text-primary",
          compact ? "text-lg" : "mt-2 text-xl md:text-2xl",
        )}
      >
        {podcastAlertCopy.heading}
      </p>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed text-ltl-text-secondary",
          compact ? "max-w-none" : "mx-auto max-w-md",
        )}
      >
        {podcastAlertCopy.body}
      </p>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "mt-5 flex flex-col gap-3",
          compact ? "sm:flex-row sm:items-start" : "sm:mx-auto sm:max-w-md",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Input
            type="email"
            name="email"
            placeholder={podcastAlertCopy.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 border-ltl-border bg-ltl-bg text-ltl-text-primary placeholder:text-ltl-text-secondary"
            aria-label="Email for episode alerts"
            required
            disabled={submitting}
          />
          {error ? (
            <p className="text-left text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 shrink-0 rounded-md bg-ltl-accent px-6 font-bold text-ltl-bg hover:bg-ltl-accent-hover"
        >
          {submitting ? podcastAlertCopy.submittingLabel : podcastAlertCopy.submitLabel}
        </Button>
      </form>

      <p className="mt-3 text-xs text-ltl-text-secondary">{podcastAlertCopy.consentNote}</p>
    </div>
  );
}
