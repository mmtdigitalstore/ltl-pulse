import { PODCAST_BRAND } from "@/data/podcast-brand.config";
import { MAGAZINE_ACCESS_COPY } from "@/data/magazine-access.config";
import { VLOG_ACCESS_COPY } from "@/data/vlog-access.config";
import { waitlistCopy } from "@/app/waitlist/waitlist.config";
import { PODCAST_SEASON_ALERT_ID, podcastAlertCopy } from "@/data/podcast-alerts.config";
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

Content access model (authoritative — use when users ask what is free vs paid):
- ${PODCAST_BRAND.name} (/podcast): free weekly episodes. All episodes free; one new unlocks each week during Season 1.
- Magazine (/magazine): ${MAGAZINE_ACCESS_COPY.cadenceBlurb}
- Vlogs (/vlogs): ${VLOG_ACCESS_COPY.cadenceBlurb}
- Free account (/signup): all podcasts, Cadence Lite, and two magazine playbooks when their episodes drop. No vlogs.
- Membership (/subscribe): full magazine library, all vlogs, Cadence Premium, ad-free experience.
- Do not say all magazine playbooks unlock free with each episode — only two magazine samples are free; member playbooks require membership.

Waitlist (/waitlist):
- Purpose: Reserve founding member rates for premium tiers opening soon${foundingTierNames ? ` (${foundingTierNames})` : ""} — not a podcast episode notification list.
- ${waitlistCopy.subheadGeneric}
- After signup: ${waitlistCopy.successBody}
- Collects email + optional first name. No charge until the tier goes live.

Podcast episode alerts:
- Signup: homepage launch trailer and /podcast (pre-launch) — "${podcastAlertCopy.heading}".
- Saves email to the Season 1 alert list (lead_magnet: ${PODCAST_SEASON_ALERT_ID}) — separate from founding /waitlist.
- ${podcastAlertCopy.body}
- Sends a confirmation email when Resend is configured. You'll email this list manually when Episode 1 drops (no browser push notifications yet).
- Best answer for "notify me when Episode 1 drops": point them to the signup on /podcast or the homepage trailer section.

Newsletter vs Magazine:
- LTL Pulse Magazine (/magazine) = ${MAGAZINE_ACCESS_COPY.cadenceBlurb}
- LTL Pulse Vlogs (/vlogs) = ${VLOG_ACCESS_COPY.cadenceBlurb}
- LTL Pulse does not run a separate email newsletter on ltlpulse.com — the Magazine is the editorial product here.
- The parent brand Let's Talk Leadership with MMTI (https://lead.mmti.me) has its own newsletter for leadership notes — separate from LTL Pulse Magazine.

Other email capture on LTL Pulse:
- Free account: /signup — all podcasts free, Cadence Lite, two magazine playbooks when their episodes drop (no vlogs).
- Lead magnet (homepage): "${TURNOVER_GUIDE_LEAD_MAGNET.title}" — email in exchange for a PDF guide.
- Membership: /subscribe for full magazine, all vlogs, and Cadence Premium.

When users ask about a waiting list, push notifications, or newsletter:
- Answer directly from this section.
- Do not say you lack details.
- If we do not offer push notifications, say so clearly and point to the best alternative (/waitlist for founding rates, /podcast for episodes, /contact for a human follow-up).`;
}
