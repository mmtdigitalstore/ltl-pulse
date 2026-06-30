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

function LeaderVoiceCard({ voice }: { voice: LeaderVoice }) {
  const caption = voice.org ? `${voice.author}, ${voice.role} · ${voice.org}` : `${voice.author}, ${voice.role}`;

  return (
    <article className="flex h-full flex-col rounded-xl border border-ltl-border bg-ltl-surface p-5 md:p-6">
      {voice.youtubeId ? (
        <YouTubeEmbed youtubeId={voice.youtubeId} title={caption} />
      ) : voice.quote ? (
        <div className="flex flex-1 flex-col">
          <Quote className="size-5 text-ltl-accent" aria-hidden />
          <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ltl-text-primary">
            {voice.quote}
          </blockquote>
        </div>
      ) : null}
      <p className="mt-4 text-sm font-medium text-ltl-text-primary">{voice.author}</p>
      <p className="mt-1 text-sm text-ltl-text-secondary">
        {voice.role}
        {voice.org ? ` · ${voice.org}` : null}
      </p>
    </article>
  );
}

interface HearFromLeadersSectionProps {
  className?: string;
  compact?: boolean;
}

export function HearFromLeadersSection({
  className,
  compact = false,
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
        className="font-heading text-2xl font-semibold text-ltl-text-primary md:text-3xl"
      >
        {hearFromLeadersCopy.heading}
      </h2>
      {!compact ? (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ltl-text-secondary md:text-lg">
          {hearFromLeadersCopy.subhead}
        </p>
      ) : null}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className={cn(
          "grid gap-6",
          compact ? "mt-8 md:grid-cols-2" : "mt-8 md:mt-10 md:grid-cols-2 md:gap-8",
        )}
      >
        {voices.map((voice) => (
          <motion.div key={voice.id} variants={staggerItem}>
            <LeaderVoiceCard voice={voice} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
