import Link from "next/link";
import type { ReactNode } from "react";

const INTERNAL_PATH_PATTERN =
  /(\/(?:podcast|contact|pricing|magazine|vlogs|subscribe|concierge|coaches|challenge)(?:#[\w-]+)?(?:\?[^\s,.;)]+)?)/g;

function linkLabel(href: string): string {
  if (href.startsWith("/podcast")) {
    return "Listen free";
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
