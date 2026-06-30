"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { YouTubeEmbed } from "@/components/about/YouTubeEmbed";
import {
  approvedLeaderVoices,
  hearFromLeadersCopy,
  type LeaderVoice,
} from "@/components/home/testimonials.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

function LeaderVoiceCard({
  voice,
  onPlatform = false,
}: {
  voice: LeaderVoice;
  onPlatform?: boolean;
}) {
  const caption = voice.org ? `${voice.author}, ${voice.role} · ${voice.org}` : `${voice.author}, ${voice.role}`;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5",
        onPlatform
          ? "ltl-theme-magazine ltl-media-container"
          : "border border-ltl-border bg-ltl-surface/80",
      )}
    >
      {voice.youtubeId ? (
        <YouTubeEmbed
          youtubeId={voice.youtubeId}
          title={caption}
          size="compact"
          className="shrink-0"
        />
      ) : voice.quote ? (
        <div className="flex max-w-[240px] shrink-0 flex-col">
          <Quote className="size-5 text-ltl-accent" aria-hidden />
          <blockquote className="mt-3 text-sm leading-relaxed text-ltl-text-primary">
            {voice.quote}
          </blockquote>
        </div>
      ) : null}
      <div className="mt-3 min-w-0 sm:mt-0 sm:flex-1">
        <p className="text-sm font-medium text-ltl-text-primary">{voice.author}</p>
        <p className="mt-1 text-sm leading-relaxed text-ltl-text-secondary">
          {voice.role}
          {voice.org ? ` · ${voice.org}` : null}
        </p>
      </div>
    </article>
  );
}

interface HearFromLeadersSectionProps {
  className?: string;
  compact?: boolean;
  /** Phased magazine containers on platform (black-blue) pages */
  onPlatform?: boolean;
}

export function HearFromLeadersSection({
  className,
  compact = false,
  onPlatform = false,
}: HearFromLeadersSectionProps) {
  const voices = approvedLeaderVoices();

  if (voices.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className={cn(compact ? "mt-12" : "mt-16 md:mt-20", className)}
      aria-labelledby="hear-from-leaders-heading"
    >
      <h2
        id="hear-from-leaders-heading"
        className={cn(
          "font-heading font-semibold text-ltl-text-primary",
          compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
        )}
      >
        {hearFromLeadersCopy.heading}
      </h2>
      {!compact ? (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ltl-text-secondary md:text-lg">
          {hearFromLeadersCopy.subhead}
        </p>
      ) : (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ltl-text-secondary">
          {hearFromLeadersCopy.subhead}
        </p>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className={cn(
          "grid gap-4",
          compact ? "mt-6 lg:grid-cols-2" : "mt-8 md:grid-cols-2 md:gap-6",
        )}
      >
        {voices.map((voice) => (
          <motion.div key={voice.id} variants={staggerItem}>
            <LeaderVoiceCard voice={voice} onPlatform={onPlatform} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
