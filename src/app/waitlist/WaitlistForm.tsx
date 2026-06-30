"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { founding, tiers } from "../pricing/pricing.config";
import { waitlistCopy, waitlistPlanIds } from "./waitlist.config";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "mt-2 w-full rounded-lg border border-ltl-border bg-ltl-bg px-3 py-2 text-ltl-text-primary outline-none placeholder:text-ltl-text-secondary focus:border-ltl-accent focus:ring-2 focus:ring-ltl-accent/20";

const hubPageClass =
  "ltl-theme-magazine ltl-hub-page ltl-hub-handoff relative min-h-[calc(100dvh-4rem)] bg-ltl-bg px-4 py-16 sm:px-6";

export default function WaitlistForm({ plan }: { plan?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tier = plan ? tiers.find((entry) => entry.id === plan) : undefined;
  const isValidPlan = !plan || waitlistPlanIds.includes(plan);
  const foundingMonthly = tier?.foundingPriceMonthly;
  const foundingYearly = tier?.foundingPriceYearly;
  const showFoundingRate =
    founding.active && foundingMonthly != null && foundingYearly != null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isValidPlan) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = {
        email: String(formData.get("email") ?? "").trim(),
        name: String(formData.get("name") ?? "").trim(),
        plan: String(formData.get("plan") ?? "").trim(),
      };

      const response = await fetch(waitlistCopy.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? waitlistCopy.errorBody);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(waitlistCopy.errorBody);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={hubPageClass}>
        <div className="mx-auto max-w-md ltl-media-container rounded-2xl p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-ltl-accent/15 ring-1 ring-ltl-accent/30">
            <span className="text-2xl font-bold text-ltl-accent" aria-hidden>
              ✓
            </span>
          </div>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-ltl-text-primary">
            {waitlistCopy.successHeading}
          </h1>
          <p className="mt-2 text-ltl-text-secondary">{waitlistCopy.successBody}</p>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-6 h-11 rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-bg",
            )}
          >
            Back to pricing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={hubPageClass}>
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
            {waitlistCopy.kicker}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-ltl-text-primary">
            {waitlistCopy.heading}
          </h1>
          <p className="mt-3 text-base text-ltl-text-secondary">
            {tier ? waitlistCopy.subheadKnown : waitlistCopy.subheadGeneric}
          </p>
        </div>

        {!isValidPlan && (
          <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-center text-sm text-destructive">
            {waitlistCopy.invalidPlanBody}
          </p>
        )}

        {tier && isValidPlan && (
          <div className="mt-6 rounded-xl border border-ltl-accent/35 bg-ltl-accent/10 px-5 py-4 text-center">
            <p className="text-sm text-ltl-text-secondary">You&apos;re reserving</p>
            <p className="font-heading text-lg font-semibold text-ltl-text-primary">
              Pulse {tier.name}
            </p>
            {tier.tagline ? (
              <p className="mt-1 text-sm text-ltl-text-secondary">{tier.tagline}</p>
            ) : null}
            {showFoundingRate && (
              <p className="mt-2 font-label text-xs uppercase tracking-wide text-ltl-accent">
                {founding.badge}: ${foundingMonthly}/mo · ${foundingYearly}/yr — locked for life
              </p>
            )}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="ltl-media-container mt-6 space-y-4 rounded-2xl p-6 sm:p-8"
        >
          <input type="hidden" name="plan" value={plan ?? ""} />

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ltl-text-primary">
              {waitlistCopy.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={!isValidPlan}
              placeholder={waitlistCopy.emailPlaceholder}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ltl-text-primary">
              {waitlistCopy.nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              disabled={!isValidPlan}
              className={fieldClassName}
            />
          </div>

          {status === "error" && errorMessage && (
            <p className="text-sm font-medium text-destructive" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting" || !isValidPlan}
            className="w-full rounded-md bg-ltl-accent px-5 py-3 text-sm font-bold text-ltl-bg transition hover:bg-ltl-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? waitlistCopy.submittingLabel : waitlistCopy.submitLabel}
          </button>

          <p className="text-center text-xs text-ltl-text-secondary">
            {waitlistCopy.consentNote}
          </p>
        </form>
      </div>
    </section>
  );
}
