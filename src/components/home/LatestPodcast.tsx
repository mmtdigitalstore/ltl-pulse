"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  transcriptTeaser: string;
  artworkAlt: string;
}

const latestEpisode: Episode = {
  id: "ep-42",
  number: 42,
  title: "Culture as a Competitive Moat",
  description:
    "A candid conversation on how leaders build teams that move fast without burning out — and why culture is the hardest advantage to copy.",
  transcriptTeaser:
    '"The best cultures aren\'t declared in all-hands — they\'re reinforced in the small decisions every single day..."',
  artworkAlt: "Episode 42 artwork",
};

export function LatestPodcast() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="border-b border-ltl-border bg-ltl-surface px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:items-center md:gap-14">
        <div
          className="aspect-square w-full max-w-[280px] rounded-xl bg-gradient-to-br from-ltl-bg via-ltl-border/50 to-ltl-accent/20 ring-1 ring-ltl-border"
          role="img"
          aria-label={latestEpisode.artworkAlt}
        />

        <div className="space-y-5">
          <p className="font-label text-sm uppercase tracking-widest text-ltl-accent">
            Episode {latestEpisode.number}
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-ltl-text-primary md:text-4xl">
            {latestEpisode.title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-ltl-text-secondary">
            {latestEpisode.description}
          </p>
          <Button
            className="gap-2 rounded-md bg-ltl-accent font-semibold text-ltl-bg hover:bg-ltl-accent-hover"
            aria-label="Play latest episode"
          >
            <Play className="size-4 fill-current" />
            Play Episode
          </Button>
          <p className="border-l-2 border-ltl-accent/50 pl-4 font-sans text-sm italic text-ltl-text-secondary">
            {latestEpisode.transcriptTeaser}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
