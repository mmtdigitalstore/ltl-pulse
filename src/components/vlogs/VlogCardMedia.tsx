"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { VLOG_PLAYER_CONFIG } from "@/data/vlog-player.config";
import {
  getVlogVideoSrc,
  isVlogEmbedUrl,
} from "@/data/vlog-videos.config";
import { cn } from "@/lib/utils";

interface VlogCardMediaProps {
  problemId: string;
  title: string;
  /** Unlocked for this viewer — show play interaction. */
  playable: boolean;
  blurred?: boolean;
}

function VlogThumbnail({
  blurred,
  showGlow = false,
}: {
  blurred?: boolean;
  showGlow?: boolean;
}) {
  const { thumbnail } = VLOG_PLAYER_CONFIG;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className={cn(
          "h-full w-full",
          thumbnail.baseClass,
          blurred && "blur-[3px] scale-105",
        )}
      />
      {showGlow ? (
        <div
          className={cn("pointer-events-none absolute inset-0", thumbnail.glowClass)}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

export function VlogCardMedia({
  problemId,
  title,
  playable,
  blurred = false,
}: VlogCardMediaProps) {
  const [revealed, setRevealed] = useState(false);
  const videoSrc = getVlogVideoSrc(problemId);
  const copy = VLOG_PLAYER_CONFIG;
  const canReveal = playable && !blurred;

  if (!canReveal) {
    return <VlogThumbnail blurred={blurred} />;
  }

  if (revealed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: copy.play.revealDurationMs / 1000 }}
        className={cn("absolute inset-0", copy.play.revealShellClass)}
      >
        {videoSrc ? (
          isVlogEmbedUrl(videoSrc) ? (
            <iframe
              src={videoSrc}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              aria-label={title}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 border-t border-ltl-accent/20 bg-gradient-to-b from-ltl-surface to-ltl-bg px-6 text-center">
            <p className="font-heading text-sm font-medium text-ltl-text-primary sm:text-base">
              {copy.placeholder.title}
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-ltl-text-secondary sm:text-sm">
              {copy.placeholder.body}
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className={cn(
        "group absolute inset-0 flex cursor-pointer flex-col border-0 bg-transparent p-0 text-left",
        blurred && "pointer-events-none",
      )}
      aria-label={`Play ${title}`}
    >
      <VlogThumbnail blurred={blurred} showGlow />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          copy.play.overlayClass,
        )}
      >
        <span className={copy.play.buttonClass} aria-hidden>
          <Play className="ml-1 size-7 fill-current sm:size-8" />
        </span>
      </div>
    </button>
  );
}
