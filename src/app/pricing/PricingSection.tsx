"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  tiers,
  advisoryOffers,
  advisoryCta,
  founding,
  comingSoon,
  isFoundingActive,
  foundingSeatsRemaining,
  foundingEndsLabel,
  type BillingInterval,
  type Tier,
} from "./pricing.config";

function TierCta({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function PricingSection() {
  const [interval, setInterval] = useState<BillingInterval>("month");
  const foundingOn = isFoundingActive();
  const seatsLeft = foundingSeatsRemaining();
  const endsLabel = foundingEndsLabel();

  return (
    <section className="min-h-[calc(100dvh-4rem)] bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
            Membership
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-ltl-text-primary sm:text-4xl md:text-5xl">
            Podcasts are free. Pay for the combinations that matter.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ltl-text-secondary md:text-lg">
            Subscriptions bundle the paid tabs and deeper Cadence access. Services
            sit on top.
          </p>
        </div>

        {foundingOn && (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-ltl-accent/35 bg-ltl-accent/10 px-5 py-4 text-center">
            <p className="font-heading text-sm font-semibold text-ltl-text-primary">
              {founding.headline}
            </p>
            <p className="mt-1 text-sm text-ltl-text-secondary">{founding.blurb}</p>
            <p className="mt-2 font-label text-xs uppercase tracking-widest text-ltl-accent">
              {seatsLeft != null
                ? `${seatsLeft} founding ${seatsLeft === 1 ? "seat" : "seats"} remaining`
                : endsLabel
                  ? `Founding rate available through ${endsLabel}`
                  : "Founding season — open now"}
            </p>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              interval === "month" ? "text-ltl-text-primary" : "text-ltl-text-secondary",
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setInterval(interval === "month" ? "year" : "month")}
            className="relative h-7 w-14 rounded-full border border-ltl-border bg-ltl-surface transition-colors"
            aria-label="Toggle billing interval"
            aria-pressed={interval === "year"}
          >
            <span
              className={cn(
                "absolute top-1 h-5 w-5 rounded-full bg-ltl-accent transition-all",
                interval === "year" ? "left-8" : "left-1",
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium",
              interval === "year" ? "text-ltl-text-primary" : "text-ltl-text-secondary",
            )}
          >
            Annual <span className="text-ltl-accent">· 2 months free</span>
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} interval={interval} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-ltl-border bg-ltl-surface p-8 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ltl-text-primary">
                Advisory &amp; Enterprise
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ltl-text-secondary">
                Coaching, cohorts, and engagements — routed to the right expert by
                need, guided by Cadence.
              </p>
            </div>
            <TierCta
              href={advisoryCta.href}
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-ltl-accent px-5 py-2.5 text-sm font-bold text-ltl-bg transition hover:bg-ltl-accent-hover"
            >
              {advisoryCta.label}
            </TierCta>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryOffers.map((offer) => (
              <div
                key={offer.name}
                className="rounded-xl border border-ltl-border bg-ltl-bg p-4"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-ltl-text-primary">
                    {offer.name}
                  </p>
                  <p className="shrink-0 text-sm font-bold text-ltl-accent">
                    {offer.priceLabel}
                  </p>
                </div>
                <p className="mt-1 text-xs text-ltl-text-secondary">{offer.note}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ltl-text-secondary">
          Prices in USD. Cancel anytime. Annual plans billed once per year.
        </p>
      </div>
    </section>
  );
}

function TierCard({ tier, interval }: { tier: Tier; interval: BillingInterval }) {
  const regular = interval === "month" ? tier.priceMonthly : tier.priceYearly;
  const foundingPrice =
    interval === "month" ? tier.foundingPriceMonthly : tier.foundingPriceYearly;
  const showFounding = isFoundingActive() && foundingPrice != null;
  const price = showFounding ? foundingPrice : regular;

  const isSoon = tier.status === "soon";
  const badge = isSoon ? comingSoon.badge : tier.badge;
  const cta = isSoon
    ? { label: comingSoon.cta.label, href: `${comingSoon.cta.href}?plan=${tier.id}` }
    : tier.cta;

  const isFree = price === 0;
  const isCustom = price == null;
  const unit = interval === "month" ? "mo" : "yr";
  const eff =
    price != null && interval === "year"
      ? Math.round((price / 12) * 100) / 100
      : null;

  const ctaClassName = cn(
    "mt-5 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold transition",
    isSoon
      ? "bg-ltl-accent text-ltl-bg shadow-[0_4px_16px_rgba(255,180,0,0.35)] hover:bg-ltl-accent-hover hover:shadow-[0_6px_22px_rgba(255,180,0,0.45)]"
      : tier.highlight
        ? "bg-ltl-accent text-ltl-bg hover:bg-ltl-accent-hover"
        : "bg-ltl-text-primary text-ltl-bg hover:bg-ltl-text-primary/90",
  );

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-ltl-surface p-6",
        tier.highlight && !isSoon
          ? "border-ltl-accent ring-1 ring-ltl-accent/30"
          : isSoon && tier.highlight
            ? "border-ltl-accent/35"
            : "border-ltl-border",
      )}
    >
      {badge && (
        <span
          className={cn(
            "mb-3 inline-flex w-fit rounded-full px-3 py-1 font-label text-xs uppercase tracking-wider",
            isSoon
              ? "border border-ltl-accent/60 bg-ltl-bg text-ltl-accent"
              : "bg-ltl-accent text-ltl-bg",
          )}
        >
          {badge}
        </span>
      )}

      <h3 className="font-heading text-xl font-semibold text-ltl-text-primary">
        {tier.name}
      </h3>
      <p className="mt-1 min-h-[2.5rem] text-sm text-ltl-text-secondary">
        {tier.tagline}
      </p>

      <div className="mt-4">
        {isCustom ? (
          <span className="font-heading text-3xl font-semibold text-ltl-text-primary">
            Custom
          </span>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-semibold text-ltl-text-primary">
              ${price}
            </span>
            {!isFree && (
              <span className="text-sm text-ltl-text-secondary">/{unit}</span>
            )}
            {showFounding && regular != null && (
              <span className="text-sm text-ltl-text-secondary line-through">
                ${regular}
              </span>
            )}
          </div>
        )}
        {showFounding && !isFree && (
          <p className="mt-1 font-label text-xs uppercase tracking-wide text-ltl-accent">
            {founding.badge} · locked for life
          </p>
        )}
        {interval === "year" && !isFree && !isCustom && eff != null && (
          <p className="mt-1 text-xs text-ltl-text-secondary">
            ${eff}/mo billed annually
          </p>
        )}
      </div>

      <TierCta href={cta.href} className={ctaClassName}>
        {cta.label}
      </TierCta>
      {isSoon && (
        <p className="mt-2 text-xs text-ltl-text-secondary">{comingSoon.note}</p>
      )}

      <ul className="mt-6 space-y-2.5">
        {tier.features.map((feature) => {
          const isHeader = feature.endsWith(":");

          return (
            <li
              key={feature}
              className={cn(
                "flex gap-2 text-sm",
                isHeader
                  ? "font-semibold text-ltl-text-primary"
                  : "text-ltl-text-secondary",
              )}
            >
              {!isHeader && (
                <Check className="mt-0.5 size-4 shrink-0 text-ltl-accent" aria-hidden />
              )}
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
