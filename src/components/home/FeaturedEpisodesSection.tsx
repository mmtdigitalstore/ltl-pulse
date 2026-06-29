"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import {
  getFeaturedPodcastProblems,
  getPodcastHref,
} from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FeaturedEpisodesSection() {
  const featured = getFeaturedPodcastProblems();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="border-b border-ltl-border bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
            Featured free episodes
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            Three conversations owners reach for first — practical, problem-titled,
            and free to listen.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {featured.map((problem) => (
            <motion.div key={problem.id} variants={staggerItem}>
              <Link
                href={getPodcastHref(problem.id)}
                className={cn(
                  "group flex h-full flex-col rounded-xl border border-ltl-border bg-ltl-surface p-5 transition-colors",
                  "hover:border-ltl-accent/50 hover:bg-ltl-surface/90",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-ltl-accent/15 text-ltl-accent">
                    <Play className="size-3.5 fill-current" aria-hidden />
                  </span>
                  <p className="font-label text-[0.65rem] uppercase tracking-widest text-ltl-accent">
                    Free · LTL Conversations
                  </p>
                </div>
                <h3 className="mt-4 font-heading text-lg font-medium leading-snug text-ltl-text-primary">
                  {problem.podcast}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ltl-text-secondary">
                  {problem.hook}
                </p>
                <p className="mt-4 text-sm font-medium text-ltl-accent group-hover:underline">
                  Listen free →
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
