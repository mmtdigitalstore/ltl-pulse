"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { ExpertPhoto } from "@/components/team/ExpertPhoto";
import { buttonVariants } from "@/components/ui/button";
import {
  experts,
  getConciergeHref,
  getExpertShortName,
  type ExpertId,
} from "@/data/problems.config";
import { cn } from "@/lib/utils";

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface AboutExpertCardProps {
  id: ExpertId;
  displayName: string;
  role: string;
  lane: string;
  positioning: ReactNode;
  credentials: string;
  canHelpWhen: string[];
  specialties: ReactNode;
  photo: { src: string; alt: string };
  isFocused?: boolean;
  className?: string;
}

export function AboutExpertCard({
  id,
  displayName,
  role,
  lane,
  positioning,
  credentials,
  canHelpWhen,
  specialties,
  photo,
  isFocused = false,
  className,
}: AboutExpertCardProps) {
  const [expanded, setExpanded] = useState(false);
  const shortName = getExpertShortName(id);
  const socialUrl = experts[id].socialUrl?.trim();

  return (
    <article
      id={id}
      aria-current={isFocused ? "true" : undefined}
      className={cn(
        "flex h-full scroll-mt-24 flex-col rounded-xl ltl-theme-magazine ltl-media-container p-6 transition-[border-color,box-shadow,opacity] duration-300 md:p-7",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <ExpertPhoto src={photo.src} alt={photo.alt} name={displayName} size="sm" />
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-semibold text-ltl-text-primary md:text-xl">
            {displayName}
          </h3>
          <p className="mt-1 font-label text-xs uppercase tracking-wider text-ltl-accent">
            {role}
          </p>
          <p className="mt-2 text-sm font-medium leading-snug text-ltl-text-primary">
            {lane}
          </p>
          <div className="mt-4 text-sm font-medium leading-relaxed text-ltl-text-primary md:text-base">
            {positioning}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ltl-accent transition hover:text-ltl-accent-hover"
      >
        See how {shortName} can help
        <ChevronDown
          className={cn("size-4 transition-transform", expanded && "rotate-180")}
          aria-hidden
        />
      </button>

      {expanded ? (
        <div className="mt-5 space-y-4 border-t border-ltl-border pt-5 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
          <p className="text-xs italic leading-relaxed text-ltl-text-secondary md:text-sm">
            {credentials}
          </p>
          <div>
            <p className="font-medium text-ltl-text-primary">
              {shortName} can help you when:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {canHelpWhen.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
            <span className="font-label uppercase tracking-wider text-ltl-accent">
              Specialties:
            </span>{" "}
            {specialties}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={getConciergeHref(id)}
              className={cn(
                buttonVariants({ size: "default" }),
                "h-10 rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
              )}
            >
              Connect with {shortName}
            </Link>
            {socialUrl ? (
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ltl-text-secondary transition hover:text-ltl-accent"
              >
                <LinkedInGlyph className="size-4" aria-hidden />
                Connect on LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
