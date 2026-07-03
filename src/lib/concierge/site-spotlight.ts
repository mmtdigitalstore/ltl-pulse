import { PROMO_VIDEOS } from "@/data/promo.config";
import { getWeeklyPromoState } from "@/lib/content/weekly-promo";

/**
 * Mirrors homepage + podcast promo sections so Cadence can answer
 * "what's on the homepage" without claiming it cannot see the site.
 */
export function buildSiteSpotlightContext(now: Date = new Date()): string {
  const homepage = PROMO_VIDEOS.launchTrailer.homepage;
  const trailer = PROMO_VIDEOS.launchTrailer;
  const episode01 = PROMO_VIDEOS.episode01;
  const promo = getWeeklyPromoState(now);

  const upNextLine = promo.upNext
    ? `Up next on /podcast: Episode ${promo.upNext.episodeNumber} "${promo.upNext.title}" — ${promo.upNext.hook} (${promo.upNext.unlockLabel}).`
    : "";

  return `Site spotlight — what is live on ltlpulse.com (authoritative; users may reference the homepage promo or trailer):

Homepage (/) — Launch trailer band:
- Kicker: ${homepage.kicker}
- Headline: ${homepage.headline}
- Body: ${homepage.body}
- Season line: ${homepage.seasonLine}
- Trust line: ${homepage.trustLine}
- Video: "${trailer.title}" — ${trailer.description}
- Buttons: "${homepage.primaryCta}" and "${homepage.secondaryCta}" → /podcast

Featured conversation (homepage + /podcast pre-launch spotlight):
- Episode ${promo.featured.episodeNumber}: "${promo.featured.title}"
- Hook: ${promo.featured.hook}
- ${promo.featured.unlockLabel}
- ${promo.featured.href}
${upNextLine}

Episode 1 teaser: ${episode01.title} — ${episode01.description} (${episode01.podcastHref})

When users mention the homepage promo, trailer, or highlighted episode: answer with the episode number, title, unlock date, and hook from above. Link to /podcast or ${episode01.podcastHref}.`;
}
