import {
  FREE_MAGAZINE_PROBLEM_IDS,
  FREE_VLOG_PROBLEM_IDS,
  problems,
  type Problem,
} from "@/data/problems.config";
import {
  isInPodcastSeason,
  isPodcastReleased,
  type PodcastReleaseOptions,
} from "@/lib/content/podcast-release";

export type ContentType = "podcast" | "magazine" | "vlog";

export interface CatalogItem {
  problemId: string;
  type: ContentType;
  title: string;
  /** No subscription required once the weekly package is live. */
  free: boolean;
  /** Weekly package (podcast + magazine + vlog) has unlocked for this problem. */
  released: boolean;
  problem: Problem;
}

function isPackageReleased(
  problemId: string,
  options?: PodcastReleaseOptions,
): boolean {
  if (!isInPodcastSeason(problemId)) {
    return true;
  }

  return isPodcastReleased(problemId, options?.now, options);
}

export function getContentCatalog(
  options?: PodcastReleaseOptions,
): CatalogItem[] {
  return problems.flatMap((problem) => {
    const released = isPackageReleased(problem.id, options);

    return [
      {
        problemId: problem.id,
        type: "podcast" as const,
        title: problem.podcast,
        free: released,
        released,
        problem,
      },
      {
        problemId: problem.id,
        type: "magazine" as const,
        title: problem.magazine,
        free: released && FREE_MAGAZINE_PROBLEM_IDS.has(problem.id),
        released,
        problem,
      },
      {
        problemId: problem.id,
        type: "vlog" as const,
        title: problem.vlog,
        free: released && FREE_VLOG_PROBLEM_IDS.has(problem.id),
        released,
        problem,
      },
    ];
  });
}

export function getCatalogByType(
  type: ContentType,
  options?: PodcastReleaseOptions,
): CatalogItem[] {
  return getContentCatalog(options).filter((item) => item.type === type);
}

export function formatProblemTag(problemId: string): string {
  return problemId.replace(/-/g, " ");
}
