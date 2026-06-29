import Link from "next/link";
import type { ReactNode } from "react";

import {
  experts,
  getProblemById,
  type ExpertId,
} from "@/data/problems.config";

const INTERNAL_PATH_PATTERN =
  /(\/(?:podcast|about|contact|pricing|magazine|vlogs|subscribe|concierge|coaches|challenge)(?:#[\w-]+)?(?:\?[^\s,.;)]+)?)/g;

function expertIdFromHref(href: string): ExpertId | null {
  const hash = href.split("#")[1];

  if (hash && hash in experts) {
    return hash as ExpertId;
  }

  return null;
}

function linkLabel(href: string): string {
  if (href.startsWith("/about#")) {
    const expertId = expertIdFromHref(href);
    return expertId ? `Meet ${experts[expertId].name}` : "Meet the team";
  }

  if (href.startsWith("/podcast#")) {
    const problemId = href.split("#")[1];
    const problem = problemId ? getProblemById(problemId) : undefined;
    return problem ? `Listen: ${problem.podcast}` : "Listen to this episode";
  }

  if (href.startsWith("/podcast")) {
    return "Browse podcasts";
  }

  if (href === "/contact") {
    return "Contact us";
  }

  if (href.startsWith("/pricing") || href.startsWith("/subscribe")) {
    return "See plans";
  }

  if (href.startsWith("/magazine")) {
    return "Read in the magazine";
  }

  if (href.startsWith("/concierge")) {
    return "Chat with Cadence";
  }

  return href;
}

export function linkifyCadenceText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INTERNAL_PATH_PATTERN)) {
    const href = match[1];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    nodes.push(
      <Link
        key={`${index}-${href}`}
        href={href}
        className="font-medium text-ltl-accent underline-offset-2 hover:underline"
      >
        {linkLabel(href)}
      </Link>,
    );

    lastIndex = index + href.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}
