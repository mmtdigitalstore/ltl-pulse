/** Public podcast URL for promos and CTAs */
export const PROMO_PODCAST_URL = "https://ltlpulse.com/podcast";
export const PROMO_PODCAST_URL_DISPLAY = "ltlpulse.com/podcast";

/** Self-hosted promo MP4s in /public/promo — run `npm run generate:promo` to create them. */
export const PROMO_VIDEOS = {
  launchTrailer: {
    title: "LTL Conversations — Season 1 launch",
    description:
      "Twelve free conversations, one unlocks every week, starting November 18, 2026.",
    landscape: "/promo/launch-trailer-landscape.mp4",
    portrait: "/promo/launch-trailer-portrait.mp4",
    durationLabel: "30 sec",
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
