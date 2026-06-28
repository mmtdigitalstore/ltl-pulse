// =============================================================================
// LTL Pulse — Pricing configuration (single source of truth)
// -----------------------------------------------------------------------------
// Edit prices, features, and copy HERE. The pricing UI reads from this file, so
// you never have to touch the component to change a price or a feature.
//
// MODEL: Podcasts are always FREE (top of funnel, never paywalled).
// Subscriptions bundle the paid tabs (magazine, vlogs) + deeper Cadence access.
// Advisory & Enterprise are services routed to individual experts via Cadence.
// =============================================================================

export type BillingInterval = "month" | "year";

export interface Tier {
  id: string;
  name: string;
  /** One-line positioning shown under the tier name. */
  tagline: string;
  /** Price in whole USD. Use null for "custom / contact us". */
  priceMonthly: number | null;
  priceYearly: number | null;
  /** Bullet list of what's included. Prefix upgrades with "Everything in X, plus:". */
  features: string[];
  /** Button label + where it points. */
  cta: { label: string; href: string };
  /** Visually emphasize this tier (e.g., "Most popular"). */
  highlight?: boolean;
  badge?: string;
  /**
   * Launch state for a STAGED rollout:
   *  - "live" → checkout works now.
   *  - "soon" → show "Opening this founding season" + a reserve/waitlist CTA
   *             (no charge yet). Flip to "live" when the tier's perks are ready.
   * Defaults to "live" if omitted.
   */
  status?: "live" | "soon";
  /** Stripe Price IDs — fill these in from your Stripe dashboard. */
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  /**
   * Founding Member rate — locked for life for early subscribers.
   * Shown instead of the regular price (with the regular price struck through)
   * while `founding.active` is true. Leave undefined for the Free tier.
   */
  foundingPriceMonthly?: number;
  foundingPriceYearly?: number;
  stripePriceIdFoundingMonthly?: string;
  stripePriceIdFoundingYearly?: string;
}

export interface AdvisoryOffer {
  name: string;
  priceLabel: string;
  note: string;
}

// ----------------------------- SUBSCRIPTION TIERS ----------------------------
export const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    status: "live",
    tagline: "Start listening — no card required.",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "All podcasts, always free",
      "Sample magazine articles",
      "Cadence Lite — your AI concierge",
    ],
    cta: { label: "Create free account", href: "/signup" },
  },
  {
    id: "member",
    name: "Member",
    status: "live",
    tagline: "The full premium media experience.",
    priceMonthly: 9,
    priceYearly: 90,
    features: [
      "Full magazine access",
      "All premium vlogs",
      "Ad-free experience",
      "Cadence Premium",
    ],
    cta: { label: "Subscribe", href: "/subscribe?plan=member" },
    stripePriceIdMonthly: "price_MEMBER_MONTHLY",
    stripePriceIdYearly: "price_MEMBER_YEARLY",
    foundingPriceMonthly: 7,
    foundingPriceYearly: 70,
  },
  {
    id: "pro",
    name: "Pro",
    status: "soon",
    tagline: "For leaders who want the playbooks.",
    priceMonthly: 29,
    priceYearly: 290,
    highlight: true,
    badge: "Most popular",
    features: [
      "Everything in Member, plus:",
      "Frameworks & Playbooks library (THRIVE, DISC)",
      "Exclusive masterclasses",
      "Members' community",
      "Monthly live session with an LTL expert",
      "Cadence Pro — personalized roadmaps",
      "10–15% off all advisory sessions",
    ],
    cta: { label: "Go Pro", href: "/subscribe?plan=pro" },
    stripePriceIdMonthly: "price_PRO_MONTHLY",
    stripePriceIdYearly: "price_PRO_YEARLY",
    foundingPriceMonthly: 23,
    foundingPriceYearly: 230,
  },
  {
    id: "executive",
    name: "Executive",
    status: "soon",
    tagline: "Content plus real access to experts.",
    priceMonthly: 99,
    priceYearly: 790,
    features: [
      "Everything in Pro, plus:",
      "Priority expert matching via Cadence",
      "One 1:1 strategy session credit / quarter",
      "Invitation-only executive roundtables",
      "Early access to new content",
      "Concierge introductions across the network",
    ],
    cta: { label: "Become Executive", href: "/subscribe?plan=executive" },
    stripePriceIdMonthly: "price_EXEC_MONTHLY",
    stripePriceIdYearly: "price_EXEC_YEARLY",
    foundingPriceMonthly: 79,
    foundingPriceYearly: 690,
  },
];

// ------------------------------ FOUNDING MEMBER ------------------------------
export const founding = {
  active: true,
  launchAt: "2026-11-18",
  durationMonths: 6,
  seatsTotal: 250 as number | null,
  seatsTaken: null as number | null,
  badge: "Founding rate",
  headline: "Founding Member — your rate, locked for life",
  blurb:
    "Join during our founding season and keep this price for as long as you stay — our thank-you to the leaders who back us early.",
};

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function foundingEndsAt(): Date | null {
  if (!founding.launchAt) return null;
  return addMonths(new Date(founding.launchAt), founding.durationMonths);
}

export function isFoundingActive(now: Date = new Date()): boolean {
  if (!founding.active) return false;
  if (founding.launchAt && now < new Date(founding.launchAt)) return false;
  const end = foundingEndsAt();
  if (end && now >= end) return false;
  if (
    founding.seatsTotal != null &&
    founding.seatsTaken != null &&
    founding.seatsTaken >= founding.seatsTotal
  )
    return false;
  return true;
}

export function foundingSeatsRemaining(): number | null {
  if (founding.seatsTotal == null || founding.seatsTaken == null) return null;
  return Math.max(0, founding.seatsTotal - founding.seatsTaken);
}

export function foundingEndsLabel(): string | null {
  const end = foundingEndsAt();
  if (!end) return null;
  return end.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// --------------------------- ADVISORY & ENTERPRISE ---------------------------
export const advisoryOffers: AdvisoryOffer[] = [
  {
    name: "Single strategy / coaching session",
    priceLabel: "$250–350",
    note: "Members get 10–15% off",
  },
  {
    name: "3-session coaching package",
    priceLabel: "$750–950",
    note: "Most popular individual path",
  },
  {
    name: "Monthly coaching retainer",
    priceLabel: "$500–1,200/mo",
    note: "Expert-led, ongoing",
  },
  {
    name: "DISC assessment + debrief",
    priceLabel: "$200–400",
    note: "Individual or per team member",
  },
  {
    name: "Team license (5–25 seats)",
    priceLabel: "$20–25/seat/mo",
    note: "Content + dashboard + workshop",
  },
  {
    name: "Institutional / enterprise engagement",
    priceLabel: "From $10k+",
    note: "Cohorts, transformation, keynotes",
  },
];

export const advisoryCta = { label: "Talk to Cadence", href: "/concierge" };

export const comingSoon = {
  badge: "Opening this season",
  note: "Reserve your founding rate now — perks roll out during the founding season.",
  cta: { label: "Reserve my founding rate", href: "/waitlist" },
};

export function effectiveMonthly(tier: Tier): number | null {
  if (tier.priceYearly == null) return null;
  return Math.round((tier.priceYearly / 12) * 100) / 100;
}
