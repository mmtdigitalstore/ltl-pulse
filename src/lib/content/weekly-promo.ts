import {
  getPodcastSeasonProblems,
  getPodcastHref,
  type Problem,
} from "@/data/problems.config";
import {
  formatPodcastUnlockDate,
  getPodcastEpisodeNumber,
  getPodcastUnlockAt,
  getPodcastUnlockLabel,
  isPodcastReleased,
  type PodcastReleaseOptions,
} from "@/lib/content/podcast-release";

export type WeeklyPromoEpisode = {
  id: string;
  episodeNumber: number;
  title: string;
  hook: string;
  href: string;
  unlockAt: Date;
  unlockLabel: string;
  isReleased: boolean;
};

export type WeeklyPromoPhase = "pre-launch" | "active" | "season-complete";

export type WeeklyPromoState = {
  phase: WeeklyPromoPhase;
  /** Latest publicly released episode, if any. */
  current: WeeklyPromoEpisode | null;
  /** Primary spotlight — episode 1 before launch, otherwise same as current. */
  featured: WeeklyPromoEpisode;
  /** Next episode still locked, if any. */
  upNext: WeeklyPromoEpisode | null;
};

function toWeeklyPromoEpisode(
  problem: Problem,
  now: Date,
  options?: PodcastReleaseOptions,
): WeeklyPromoEpisode {
  const unlockAt = getPodcastUnlockAt(problem.id);
  const episodeNumber = getPodcastEpisodeNumber(problem.id) ?? 0;

  return {
    id: problem.id,
    episodeNumber,
    title: problem.podcast,
    hook: problem.hook,
    href: getPodcastHref(problem.id),
    unlockAt: unlockAt ?? now,
    unlockLabel: getPodcastUnlockLabel(problem.id),
    isReleased: isPodcastReleased(problem.id, now, options),
  };
}

/**
 * Resolves which episodes to highlight for the weekly on-site promo.
 * Uses the real calendar (not team preview) so admins see what visitors see.
 */
export function getWeeklyPromoState(now: Date = new Date()): WeeklyPromoState {
  const season = getPodcastSeasonProblems();
  const episodes = season.map((problem) => toWeeklyPromoEpisode(problem, now));

  const released = episodes.filter((episode) => episode.isReleased);
  const current = released.at(-1) ?? null;
  const upNext = episodes.find((episode) => !episode.isReleased) ?? null;
  const firstEpisode = episodes[0];

  if (!firstEpisode) {
    throw new Error("Podcast season has no episodes configured.");
  }

  if (!current) {
    return {
      phase: "pre-launch",
      current: null,
      featured: firstEpisode,
      upNext: episodes[1] ?? null,
    };
  }

  if (!upNext) {
    return {
      phase: "season-complete",
      current,
      featured: current,
      upNext: null,
    };
  }

  return {
    phase: "active",
    current,
    featured: current,
    upNext,
  };
}

export function formatWeeklyUnlockShort(unlockAt: Date): string {
  return formatPodcastUnlockDate(unlockAt, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
