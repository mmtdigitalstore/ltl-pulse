import {
  FREE_VLOG_PROBLEM_IDS,
  problems,
  type Problem,
} from "@/data/problems.config";

export type ContentType = "podcast" | "magazine" | "vlog";

export interface CatalogItem {
  problemId: string;
  type: ContentType;
  title: string;
  free: boolean;
  problem: Problem;
}

export function getContentCatalog(): CatalogItem[] {
  return problems.flatMap((problem) => [
    {
      problemId: problem.id,
      type: "podcast" as const,
      title: problem.podcast,
      free: true,
      problem,
    },
    {
      problemId: problem.id,
      type: "magazine" as const,
      title: problem.magazine,
      free: false,
      problem,
    },
    {
      problemId: problem.id,
      type: "vlog" as const,
      title: problem.vlog,
      free: FREE_VLOG_PROBLEM_IDS.has(problem.id),
      problem,
    },
  ]);
}

export function getCatalogByType(type: ContentType): CatalogItem[] {
  return getContentCatalog().filter((item) => item.type === type);
}

export function formatProblemTag(problemId: string): string {
  return problemId.replace(/-/g, " ");
}
