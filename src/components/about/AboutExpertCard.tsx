"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ExpertPhoto } from "@/components/team/ExpertPhoto";
import {
  experts,
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
  isObscured?: boolean;
  onOpenDetail?: () => void;
  className?: string;
}

export function AboutExpertCard({
  id,
  displayName,
  role,
  lane,
  positioning,
  photo,
  isFocused = false,
  isObscured = false,
  onOpenDetail,
  className,
}: AboutExpertCardProps) {
  const shortName = getExpertShortName(id);
  const socialUrl = experts[id].socialUrl?.trim();

  function handleOpen() {
    onOpenDetail?.();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  }

  return (
    <article
      id={id}
      role="button"
      tabIndex={0}
      aria-current={isFocused ? "true" : undefined}
      aria-haspopup="dialog"
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex h-full scroll-mt-24 cursor-pointer flex-col rounded-xl ltl-theme-magazine ltl-media-container p-6 transition-[border-color,box-shadow,opacity,transform] duration-300 md:p-7",
        "hover:border-ltl-accent/30 hover:shadow-[0_0_28px_rgba(255,180,0,0.08)]",
        isObscured && "opacity-40 saturate-[0.6]",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <ExpertPhoto src={photo.src} alt={photo.alt} name={displayName} size="sm" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="font-heading text-lg font-semibold text-ltl-text-primary md:text-xl">
              {displayName}
            </h3>
            {socialUrl ? (
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${displayName} on LinkedIn`}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
                className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-ltl-text-secondary transition hover:bg-ltl-border/40 hover:text-ltl-accent"
              >
                <LinkedInGlyph className="size-4" />
              </a>
            ) : null}
          </div>
          <p className="mt-1 font-label text-xs uppercase tracking-wider text-ltl-accent">
            {role}
          </p>
          <p className="mt-2 text-sm font-medium leading-snug text-ltl-text-primary">
            {lane}
          </p>
          <div className="mt-4 line-clamp-4 text-sm font-medium leading-relaxed text-ltl-text-primary md:text-base">
            {positioning}
          </div>
        </div>
      </div>

      <p className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ltl-accent">
        See how {shortName} can help
        <ChevronRight className="size-4" aria-hidden />
      </p>
    </article>
  );
}
