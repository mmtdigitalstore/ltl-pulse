import { waitlistCopy } from "@/app/waitlist/waitlist.config";
import { tiers } from "@/app/pricing/pricing.config";
import { TURNOVER_GUIDE_LEAD_MAGNET } from "@/data/lead-magnets.config";

/**
 * Signup, waitlist, and notification facts so Cadence answers accurately.
 */
export function buildSiteServicesContext(): string {
  const foundingTierNames = tiers
    .filter((tier) => tier.status === "soon")
    .map((tier) => tier.name)
    .join(", ");

  return `Site signups and notifications (authoritative — use for waitlist, newsletter, email, and alert questions):

Waitlist (/waitlist):
- Purpose: Reserve founding member rates for premium tiers opening soon${foundingTierNames ? ` (${foundingTierNames})` : ""} — not a podcast episode notification list.
- ${waitlistCopy.subheadGeneric}
- After signup: ${waitlistCopy.successBody}
- Collects email + optional first name. No charge until the tier goes live.

Podcast episode alerts:
- LTL Pulse does not currently offer browser push notifications or a dedicated "notify me when an episode drops" signup.
- Season 1 unlocks one free conversation per week on /podcast (see Podcast pipeline).
- Best options today: visit /podcast each week, bookmark the season schedule, or use /contact if they want the team to follow up about episode reminders.

Newsletter vs Magazine:
- LTL Pulse Magazine (/magazine) = leadership articles published on the site. Some tasters are free; the full library is for members (/pricing, /subscribe).
- LTL Pulse does not run a separate email newsletter on ltlpulse.com — the Magazine is the editorial product here.
- The parent brand Let's Talk Leadership with MMTI (https://lead.mmti.me) has its own newsletter for leadership notes — separate from LTL Pulse Magazine.

Other email capture on LTL Pulse:
- Free account: /signup — podcasts, Cadence Lite, sample magazine.
- Lead magnet (homepage): "${TURNOVER_GUIDE_LEAD_MAGNET.title}" — email in exchange for a PDF guide.
- Membership: /subscribe for magazine, vlogs, and Cadence Premium.

When users ask about a waiting list, push notifications, or newsletter:
- Answer directly from this section.
- Do not say you lack details.
- If we do not offer push notifications, say so clearly and point to the best alternative (/waitlist for founding rates, /podcast for episodes, /contact for a human follow-up).`;
}
