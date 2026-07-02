/** First public unlock (UTC). Override with NEXT_PUBLIC_PODCAST_SERIES_START (YYYY-MM-DD). */
export const PODCAST_SERIES_START_ISO =
  process.env.NEXT_PUBLIC_PODCAST_SERIES_START?.trim() || "2026-11-18";

export const PODCAST_SEASON_EPISODE_COUNT = 12;

/**
 * Season 1 release order — one conversation unlocks per week from series start.
 * Full Table tentpoles: weeks 1, 2, 3, 8, 12.
 *
 * Future: Executive-tier early access (≤2 days, site-only) — OFF at launch.
 */
export const PODCAST_RELEASE_ORDER = [
  "where-leadership-meets-culture",
  "turnover",
  "new-to-leading",
  "feast-or-famine",
  "losing-customers",
  "leading-change",
  "scaling-chaos",
  "leadership-life-plan",
  "webscore-found-online",
  "team-misaligned",
  "stalled-growth",
  "planning-backwards",
] as const;

export type PodcastReleaseId = (typeof PODCAST_RELEASE_ORDER)[number];

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

const releaseIndexById = new Map<string, number>(
  PODCAST_RELEASE_ORDER.map((id, index) => [id, index]),
);

export type PodcastReleaseOptions = {
  now?: Date;
  /** Team/admin preview — treats all season episodes as released (site-only). */
  previewAll?: boolean;
};

function seriesStartUtc(): Date {
  const [year, month, day] = PODCAST_SERIES_START_ISO.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
}

export function isInPodcastSeason(problemId: string): boolean {
  return releaseIndexById.has(problemId);
}

export function getPodcastEpisodeNumber(problemId: string): number | null {
  const index = releaseIndexById.get(problemId);
  return index === undefined ? null : index + 1;
}

export function getPodcastUnlockAt(problemId: string): Date | null {
  const index = releaseIndexById.get(problemId);
  if (index === undefined) {
    return null;
  }

  return new Date(seriesStartUtc().getTime() + index * MS_PER_WEEK);
}

export function isPodcastReleased(
  problemId: string,
  now: Date = new Date(),
  options?: PodcastReleaseOptions,
): boolean {
  if (options?.previewAll && isInPodcastSeason(problemId)) {
    return true;
  }

  const unlockAt = getPodcastUnlockAt(problemId);
  if (!unlockAt) {
    return true;
  }

  const effectiveNow = options?.now ?? now;
  return effectiveNow.getTime() >= unlockAt.getTime();
}

export function formatPodcastUnlockDate(
  unlockAt: Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  return unlockAt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
    ...options,
  });
}

export function getPodcastUnlockLabel(problemId: string): string {
  const unlockAt = getPodcastUnlockAt(problemId);
  if (!unlockAt) {
    return "Coming soon";
  }

  return `Unlocks ${formatPodcastUnlockDate(unlockAt)}`;
}
