"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

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
    <section className="bg-[#F4F7FB] py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#C8A951]">
            Membership
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#1F3A5F] sm:text-4xl">
            Podcasts are free. Pay for the combinations that matter.
          </h1>
          <p className="mt-3 text-base text-[#6B7A8D]">
            Subscriptions bundle the paid tabs and deeper Cadence access. Services
            sit on top.
          </p>
        </div>

        {foundingOn && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-[#C8A951] bg-[#FBF4DF] px-5 py-4 text-center">
            <p className="text-sm font-bold text-[#1F3A5F]">{founding.headline}</p>
            <p className="mt-1 text-sm text-[#6B7A8D]">{founding.blurb}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#9A802E]">
              {seatsLeft != null
                ? `${seatsLeft} founding ${seatsLeft === 1 ? "seat" : "seats"} remaining`
                : endsLabel
                  ? `Founding rate available through ${endsLabel}`
                  : "Founding season — open now"}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={`text-sm font-medium ${
              interval === "month" ? "text-[#1F3A5F]" : "text-[#6B7A8D]"
            }`}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setInterval(interval === "month" ? "year" : "month")}
            className="relative h-7 w-14 rounded-full bg-[#1F3A5F] transition-colors"
            aria-label="Toggle billing interval"
            aria-pressed={interval === "year"}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-[#C8A951] transition-all ${
                interval === "year" ? "left-8" : "left-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              interval === "year" ? "text-[#1F3A5F]" : "text-[#6B7A8D]"
            }`}
          >
            Annual <span className="text-[#C8A951]">· 2 months free</span>
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} interval={interval} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-[#1F3A5F] p-8 sm:p-10">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Advisory &amp; Enterprise</h2>
              <p className="mt-1 max-w-xl text-sm text-[#CFDDEE]">
                Coaching, cohorts, and engagements — routed to the right expert by
                need, guided by Cadence.
              </p>
            </div>
            <TierCta
              href={advisoryCta.href}
              className="mt-4 inline-flex shrink-0 items-center justify-center rounded-lg bg-[#C8A951] px-5 py-2.5 text-sm font-semibold text-[#142439] transition hover:brightness-105 sm:mt-0"
            >
              {advisoryCta.label}
            </TierCta>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryOffers.map((offer) => (
              <div key={offer.name} className="rounded-xl bg-[#27496E] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{offer.name}</p>
                  <p className="shrink-0 text-sm font-bold text-[#C8A951]">
                    {offer.priceLabel}
                  </p>
                </div>
                <p className="mt-1 text-xs text-[#AFC3DB]">{offer.note}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#6B7A8D]">
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

  const ctaClassName = `mt-5 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
    isSoon
      ? "border border-[#1F3A5F] bg-white text-[#1F3A5F] hover:bg-[#F4F7FB]"
      : tier.highlight
        ? "bg-[#C8A951] text-[#142439] hover:brightness-105"
        : "bg-[#1F3A5F] text-white hover:bg-[#27496E]"
  }`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
        tier.highlight ? "border-[#C8A951] ring-2 ring-[#C8A951]/40" : "border-[#DBE3EC]"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold ${
            isSoon ? "bg-[#1F3A5F] text-[#C8A951]" : "bg-[#C8A951] text-[#142439]"
          }`}
        >
          {badge}
        </span>
      )}

      <h3 className="text-xl font-bold text-[#1F3A5F]">{tier.name}</h3>
      <p className="mt-1 min-h-[2.5rem] text-sm text-[#6B7A8D]">{tier.tagline}</p>

      <div className="mt-4">
        {isCustom ? (
          <span className="text-3xl font-bold text-[#1F3A5F]">Custom</span>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#1F3A5F]">${price}</span>
            {!isFree && <span className="text-sm text-[#6B7A8D]">/{unit}</span>}
            {showFounding && regular != null && (
              <span className="text-sm text-[#6B7A8D] line-through">${regular}</span>
            )}
          </div>
        )}
        {showFounding && !isFree && (
          <p className="mt-1 text-xs font-semibold text-[#9A802E]">
            {founding.badge} · locked for life
          </p>
        )}
        {interval === "year" && !isFree && !isCustom && eff != null && (
          <p className="mt-1 text-xs text-[#6B7A8D]">${eff}/mo billed annually</p>
        )}
      </div>

      <TierCta href={cta.href} className={ctaClassName}>
        {cta.label}
      </TierCta>
      {isSoon && <p className="mt-2 text-xs text-[#6B7A8D]">{comingSoon.note}</p>}

      <ul className="mt-6 space-y-2.5">
        {tier.features.map((feature) => {
          const isHeader = feature.endsWith(":");
          return (
            <li
              key={feature}
              className={`flex gap-2 text-sm ${
                isHeader ? "font-semibold text-[#1F3A5F]" : "text-[#22303F]"
              }`}
            >
              {!isHeader && (
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A951]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
