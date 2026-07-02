/** Public podcast URL for promos and CTAs */
export const PROMO_PODCAST_URL = "https://ltlpulse.com/podcast";
export const PROMO_PODCAST_URL_DISPLAY = "ltlpulse.com/podcast";

/** Self-hosted promo MP4s in /public/promo — run `npm run generate:promo` to create them. */
export const PROMO_VIDEOS = {
  launchTrailer: {
    title: "LTL Conversations — Season 1",
    description:
      "Candid weekly conversations for growing service businesses and the coaches who guide them.",
    landscape: "/promo/launch-trailer-landscape.mp4",
    portrait: "/promo/launch-trailer-portrait.mp4",
    durationLabel: "30 sec",
    homepage: {
      kicker: "LTL Conversations",
      headline: "Leadership for what's coming — not just what's been.",
      body:
        "Built for growing service businesses and the coaches who guide them. Each week, our Maxwell-certified team goes candid on keeping your best people, winning loyal customers, building steadier client-flow, and leading a team that delivers — practical, future-ready, and free to listen.",
      trustLine:
        "Maxwell Leadership Certified team · Cornell & Google certified experts",
      seasonLine: "Season 1 opens Wednesday, November 18.",
      primaryCta: "Listen free",
      secondaryCta: "View the season",
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
