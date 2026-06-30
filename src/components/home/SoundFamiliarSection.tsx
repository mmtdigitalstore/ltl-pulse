"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  featuredProblems,
  getPodcastHref,
} from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SoundFamiliarSection() {
  const featured = featuredProblems();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="ltl-section-glow ltl-glow-brand-top ltl-hero-handoff relative border-b border-ltl-border bg-ltl-surface px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
            Sound familiar?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            Real problems we help you solve — start with a free listen.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {featured.map((problem) => (
            <motion.div key={problem.id} variants={staggerItem}>
              <Link
                href={getPodcastHref(problem.id)}
                className={cn(
                  "group flex h-full flex-col rounded-xl border border-ltl-border bg-ltl-bg p-4 transition-colors sm:p-5",
                  "hover:border-ltl-accent/50 hover:bg-ltl-bg/80",
                )}
              >
                <p className="font-label text-[0.65rem] uppercase tracking-widest text-ltl-accent">
                  Free conversation
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ltl-text-primary">
                  {problem.hook}
                </p>
                <p className="mt-2 line-clamp-2 text-xs text-ltl-text-secondary">
                  {problem.podcast}
                </p>
                <p className="mt-3 text-xs font-medium text-ltl-accent group-hover:underline">
                  Listen free →
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8">
          <Link
            href="/podcast"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ltl-accent hover:underline"
          >
            See all conversations
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
