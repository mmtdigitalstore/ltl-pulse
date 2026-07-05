import { FREE_MAGAZINE_PROBLEM_IDS } from "@/data/problems.config";
import type { CatalogItem } from "@/lib/content/catalog";
import {
  getPodcastEpisodeNumber,
  getPodcastUnlockLabel,
} from "@/lib/content/podcast-release";

export type MagazineCardState =
  | { kind: "upcoming"; episodeNumber: number | null; unlockLabel: string }
  | { kind: "free-sample" }
  | { kind: "members-only" }
  | { kind: "included" };

export function isFreeMagazineSample(problemId: string): boolean {
  return FREE_MAGAZINE_PROBLEM_IDS.has(problemId);
}

function upcomingState(problemId: string): MagazineCardState {
  return {
    kind: "upcoming",
    episodeNumber: getPodcastEpisodeNumber(problemId),
    unlockLabel: getPodcastUnlockLabel(problemId),
  };
}

/**
 * Strategy A: only the two free samples follow the episode drip for non-subscribers.
 * Member playbooks stay membership-gated regardless of podcast release week.
 */
export function getMagazineCardState(
  article: CatalogItem,
  isSubscriber: boolean,
): MagazineCardState {
  const isFreeSample = isFreeMagazineSample(article.problemId);

  if (isFreeSample) {
    if (!article.released) {
      return upcomingState(article.problemId);
    }
    return { kind: "free-sample" };
  }

  if (!isSubscriber) {
    return { kind: "members-only" };
  }

  if (!article.released) {
    return upcomingState(article.problemId);
  }

  return { kind: "included" };
}
