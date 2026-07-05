import type { CatalogItem } from "@/lib/content/catalog";
import {
  getPodcastEpisodeNumber,
  getPodcastUnlockLabel,
} from "@/lib/content/podcast-release";

export type VlogCardState =
  | { kind: "upcoming"; episodeNumber: number | null; unlockLabel: string }
  | { kind: "members-only" }
  | { kind: "included" };

function upcomingState(problemId: string): VlogCardState {
  return {
    kind: "upcoming",
    episodeNumber: getPodcastEpisodeNumber(problemId),
    unlockLabel: getPodcastUnlockLabel(problemId),
  };
}

/** All vlogs are membership-only for non-subscribers — no free tasters. */
export function getVlogCardState(
  vlog: CatalogItem,
  isSubscriber: boolean,
): VlogCardState {
  if (!isSubscriber) {
    return { kind: "members-only" };
  }

  if (!vlog.released) {
    return upcomingState(vlog.problemId);
  }

  return { kind: "included" };
}
