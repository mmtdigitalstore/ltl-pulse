"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export function YouTubeEmbed({ youtubeId, title, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div
        className={cn(
          "aspect-video w-full overflow-hidden rounded-lg border border-ltl-border bg-ltl-bg",
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
        "group relative aspect-video w-full overflow-hidden rounded-lg border border-ltl-border bg-ltl-bg text-left",
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
        <span className="flex size-14 items-center justify-center rounded-full bg-ltl-accent text-ltl-bg shadow-lg">
          <Play className="ml-1 size-6 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
}
