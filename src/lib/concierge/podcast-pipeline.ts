import { getPodcastHref, getPodcastSeasonProblems } from "@/data/problems.config";
import {
  formatPodcastUnlockDate,
  getPodcastEpisodeNumber,
  getPodcastUnlockAt,
  isPodcastReleased,
  PODCAST_SEASON_EPISODE_COUNT,
  PODCAST_SERIES_START_ISO,
} from "@/lib/content/podcast-release";
import { getWeeklyPromoState } from "@/lib/content/weekly-promo";

/**
 * Dynamic Season 1 schedule for Cadence — includes upcoming episodes, not just released.
 */
export function buildPodcastPipelineContext(now: Date = new Date()): string {
  const promo = getWeeklyPromoState(now);
  const season = getPodcastSeasonProblems();
  const firstEpisode = season[0];
  const seriesStart = firstEpisode
    ? (getPodcastUnlockAt(firstEpisode.id) ?? new Date(PODCAST_SERIES_START_ISO))
    : new Date(PODCAST_SERIES_START_ISO);

  const scheduleLines = season.map((problem) => {
    const episodeNumber = getPodcastEpisodeNumber(problem.id) ?? 0;
    const unlockAt = getPodcastUnlockAt(problem.id);
    const released = isPodcastReleased(problem.id, now);
    const status = released
      ? "Available now"
      : unlockAt
        ? `Unlocks ${formatPodcastUnlockDate(unlockAt)}`
        : "Coming soon";

    return `Episode ${episodeNumber}: "${problem.podcast}" — ${problem.cadenceChip}. ${status}. ${getPodcastHref(problem.id)}`;
  });

  let statusBlock: string;

  if (promo.phase === "pre-launch") {
    statusBlock = `Current status: Pre-launch — Season 1 has not started yet.
Launching first: Episode ${promo.featured.episodeNumber} "${promo.featured.title}" (${promo.featured.unlockLabel}).
${
  promo.upNext
    ? `Up next after launch: Episode ${promo.upNext.episodeNumber} "${promo.upNext.title}" (${promo.upNext.unlockLabel}).`
    : ""
}`;
  } else if (promo.phase === "active") {
    statusBlock = `Current status: Season 1 is active — new conversations unlock weekly.
${
  promo.current
    ? `Latest live: Episode ${promo.current.episodeNumber} "${promo.current.title}".`
    : ""
}
${
  promo.upNext
    ? `Coming next: Episode ${promo.upNext.episodeNumber} "${promo.upNext.title}" (${promo.upNext.unlockLabel}).`
    : ""
}`;
  } else {
    statusBlock = `Current status: Season 1 is complete — all ${PODCAST_SEASON_EPISODE_COUNT} conversations are on /podcast.`;
  }

  return `Podcast pipeline (authoritative — use when users ask about upcoming episodes, the schedule, what's dropping, Season 1, or the podcast pipeline):
- LTL Pulse podcast: leadership conversations for SMB owners and coaches.
- Season 1: ${PODCAST_SEASON_EPISODE_COUNT} episodes, one unlocks per week (weekly drip).
- Series starts: ${formatPodcastUnlockDate(seriesStart)}.
- Full season page: /podcast

${statusBlock}

Season 1 lineup (release order):
${scheduleLines.join("\n")}

When users ask what's coming on the podcast: answer from this section — share phase, next unlock, a few upcoming titles, and link to /podcast.

Never say you cannot provide specifics on future episodes, that you lack schedule details, or apologize for oversights — the schedule above is complete and authoritative.`;
}
