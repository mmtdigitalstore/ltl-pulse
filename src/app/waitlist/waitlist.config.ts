import { tiers } from "../pricing/pricing.config";

export const waitlistPlanIds = tiers
  .filter((tier) => tier.status === "soon")
  .map((tier) => tier.id);

export const waitlistCopy = {
  kicker: "Founding access",
  heading: "Reserve your founding rate",
  subheadKnown:
    "Lock today’s founding price for life. We’ll email you the moment it opens — no charge until then.",
  subheadGeneric:
    "Be first in line when our premium tiers open — and lock your founding rate for life. No charge until they go live.",

  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  nameLabel: "First name (optional)",

  consentNote:
    "We’ll only use this to tell you when your tier opens and to hold your founding rate. No spam, unsubscribe anytime.",

  submitLabel: "Reserve my founding rate",
  submittingLabel: "Reserving…",

  successHeading: "You’re on the founding list.",
  successBody:
    "Your founding rate is held. We’ll email you the moment this tier opens — thank you for backing us early.",

  errorBody: "Something went wrong. Please try again in a moment.",
  invalidPlanBody: "That plan isn’t open for founding reservations yet.",

  endpoint: "/api/waitlist",
};
