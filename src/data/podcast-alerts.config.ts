import { PROMO_VIDEOS } from "@/data/promo.config";

/** Stored in Supabase `leads.lead_magnet` — separate from founding /waitlist. */
export const PODCAST_SEASON_ALERT_ID = "season-1-episode-alerts";

export const podcastAlertCopy = {
  kicker: "Episode alerts",
  heading: "Notify me when Episode 1 drops",
  body: `We'll email you when "${PROMO_VIDEOS.episode01.title}" goes live — ${PROMO_VIDEOS.launchTrailer.homepage.seasonLine.replace("Season 1 opens ", "opens ")}. One note, no spam.`,
  emailPlaceholder: "you@company.com",
  submitLabel: "Notify me",
  submittingLabel: "Saving…",
  consentNote: "Unsubscribe anytime. Podcast episodes stay free on LTL Pulse.",
  successHeading: "You're on the list.",
  successBody:
    "We'll email you when Episode 1 unlocks. Until then, browse the season schedule on the podcast page.",
  errorBody: "Something went wrong. Please try again in a moment.",
  endpoint: "/api/podcast-alerts",
} as const;
