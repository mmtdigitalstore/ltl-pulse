import { advisoryOffers, memberAdvisoryDiscountPolicy } from "@/app/pricing/pricing.config";

export function buildAdvisoryKnowledgeSection(): string {
  const offerLines = advisoryOffers.map(
    (offer) => `- ${offer.name}: ${offer.priceLabel} — ${offer.note}`,
  );

  return `## Advisory & Enterprise (from /pricing)
Coaching, cohorts, and engagements routed to the right LTL consultant by need.
${memberAdvisoryDiscountPolicy}

${offerLines.join("\n")}

Routing guidance:
- DISC assessment/debrief, team communication, customer experience → Jackie John (/about#jackie)
- People, culture, retention, client-flow systems → Dawn Kirk (/about#dawn)
- Scaling structure, governance, financial durability → Dr. Sylvan Lashley (/about#lashley)
- Venture growth, repositioning, innovation strategy → Joshua Ogbonnia (/about#joshua)
- Institutional / enterprise engagements (from $10k+) → clarify scope, then route to best-fit consultant; /contact for follow-up

When users ask about advisory bundles, coaching, consulting, or enterprise engagements, share these offerings and price ranges. Do not invent prices outside this list.`;
}

export function buildCadenceAdvisoryReply(isSubscriber: boolean): string {
  const offerLines = advisoryOffers.map(
    (offer) => `${offer.name} — ${offer.priceLabel} (${offer.note})`,
  );

  return [
    "Here's our Advisory & Enterprise menu — coaching, cohorts, and engagements routed to the right LTL consultant (USD, from /pricing):",
    "",
    ...offerLines,
    "",
    isSubscriber
      ? `Your Member plan: ${memberAdvisoryDiscountPolicy}`
      : `Membership perk: ${memberAdvisoryDiscountPolicy}`,
    ...(isSubscriber ? [] : ["See /pricing to subscribe."]),
    "",
    "DISC and frontline alignment often start with Jackie. People, culture, and client-flow work often fit Dawn. Scaling and governance often fit Dr. Lashley. Venture repositioning and innovation often fit Joshua.",
    "",
    "Tell me what you're trying to solve and I'll point you to the best-fit consultant — or use /contact when you're ready for a human follow-up.",
  ].join("\n");
}
