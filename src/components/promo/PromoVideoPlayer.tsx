"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PromoVideoPlayerProps {
  title: string;
  description?: string;
  /** Wide video — YouTube-style 16:9 */
  landscapeSrc: string;
  /** Tall video — phone / Stories 9:16 */
  portraitSrc: string;
  className?: string;
}

export function PromoVideoPlayer({
  title,
  description,
  landscapeSrc,
  portraitSrc,
  className,
}: PromoVideoPlayerProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <figure className={cn("space-y-3", className)}>
      <div className="relative overflow-hidden rounded-xl border border-ltl-border bg-ltl-surface">
        <video
          className="hidden w-full md:block"
          controls
          playsInline
          preload="metadata"
          aria-label={title}
          onError={() => setFailed(true)}
        >
          <source src={landscapeSrc} type="video/mp4" />
        </video>
        <video
          className="mx-auto block max-h-[70vh] w-full max-w-sm md:hidden"
          controls
          playsInline
          preload="metadata"
          aria-label={title}
          onError={() => setFailed(true)}
        >
          <source src={portraitSrc} type="video/mp4" />
        </video>
      </div>
      <figcaption className="space-y-1">
        <p className="font-heading text-lg font-medium text-ltl-text-primary">
          {title}
        </p>
        {description ? (
          <p className="text-sm leading-relaxed text-ltl-text-secondary">
            {description}
          </p>
        ) : null}
        <p className="font-label text-[0.65rem] uppercase tracking-widest text-ltl-text-secondary">
          Silent preview — add background music or a voiceover in your editor
        </p>
      </figcaption>
    </figure>
  );
}
