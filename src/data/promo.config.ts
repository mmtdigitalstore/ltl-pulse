/** Public podcast URL for promos and CTAs */
export const PROMO_PODCAST_URL = "https://ltlpulse.com/podcast";
export const PROMO_PODCAST_URL_DISPLAY = "ltlpulse.com/podcast";

/** Shared Season 1 promo lines — homepage + conversations page */
const SEASON_1_PROMO = {
  kicker: "LTL Conversations · Season 1",
  trustLine:
    "Maxwell-certified coaches · Cornell systems · Google innovation · doctoral-level strategy",
  seasonLine: "Season 1 opens Wednesday, November 18.",
} as const;

/** Self-hosted promo MP4s in /public/promo — run `npm run generate:promo` to create them. */
export const PROMO_VIDEOS = {
  launchTrailer: {
    title: "LTL Conversations — Season 1",
    description:
      "Episode 1 opens Season 1 with the full LTL team — where leadership meets culture, free to listen.",
    landscape: "/promo/launch-trailer-landscape.mp4",
    portrait: "/promo/launch-trailer-portrait.mp4",
    /** Charcoal grade for the magazine / conversations hub */
    magazineLandscape: "/promo/launch-trailer-magazine-landscape.mp4",
    magazinePortrait: "/promo/launch-trailer-magazine-portrait.mp4",
    durationLabel: "30 sec",
    homepage: {
      ...SEASON_1_PROMO,
      headline:
        "The conversations your business needs before the next hire, lost customer, or growth push.",
      body:
        "Each week: one candid conversation on the problems that actually stall growth — turnover, feast-or-famine revenue, new leaders without a playbook, customer loyalty, and scaling without chaos. Expert-led by certified coaches and specialists. No paywall on the podcast.",
      primaryCta: "Listen free",
      secondaryCta: "See the 12-episode schedule",
    },
    podcastPage: {
      ...SEASON_1_PROMO,
      pageSubtitle:
        "Free weekly episodes for growing service businesses and the coaches who guide them. One unlocks each week.",
      preLaunchTagline:
        "The Full Table conversation that opens the season — whole team, one engine: leadership and culture.",
    },
  },
  episode01: {
    title: "Episode 1 — Where leadership meets culture",
    description:
      "Season 1 opens with the full LTL team. Unlocks Wednesday, November 18, 2026.",
    landscape: "/promo/episode-01-landscape.mp4",
    portrait: "/promo/episode-01-portrait.mp4",
    durationLabel: "15 sec",
    podcastHref: "/podcast#where-leadership-meets-culture",
  },
} as const;
