"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
  className?: string;
  /** compact = supporting thumbnail, not a hero block */
  size?: "default" | "compact";
}

const sizeClasses = {
  default: {
    frame: "aspect-video w-full max-w-full",
    play: "size-14",
    playIcon: "size-6",
  },
  compact: {
    frame: "aspect-video w-full max-w-[220px] sm:max-w-[240px]",
    play: "size-10",
    playIcon: "size-4",
  },
} as const;

export function YouTubeEmbed({
  youtubeId,
  title,
  className,
  size = "default",
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const sizing = sizeClasses[size];

  if (playing) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-ltl-border bg-ltl-bg",
          sizing.frame,
          className,
        )}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&cc_load_policy=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-ltl-border bg-ltl-bg text-left",
        sizing.frame,
        className,
      )}
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition group-hover:bg-black/45">
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-ltl-accent text-ltl-bg shadow-lg",
            sizing.play,
          )}
        >
          <Play className={cn("ml-0.5 fill-current", sizing.playIcon)} aria-hidden />
        </span>
      </span>
    </button>
  );
}
