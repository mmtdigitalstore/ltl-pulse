"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { getFeaturedProblems, getPodcastHref } from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

export function FeaturedFreeEpisodes() {
  const featured = getFeaturedProblems(3);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="border-b border-ltl-border bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
          Start with a free conversation
        </h2>
        <p className="mt-4 max-w-2xl text-base text-ltl-text-secondary md:text-lg">
          Three episodes built around the problems owners ask us about most — no
          signup required.
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {featured.map((problem, index) => (
            <motion.article
              key={problem.id}
              variants={staggerItem}
              className="flex flex-col rounded-xl border border-ltl-border bg-ltl-surface p-6"
            >
              <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
                Episode {index + 1} · Free
              </p>
              <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-ltl-text-primary">
                {problem.podcast}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ltl-text-secondary">
                {problem.hook}
              </p>
              <Link
                href={getPodcastHref(problem.id)}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-ltl-accent px-4 py-2 text-sm font-semibold text-ltl-bg hover:bg-ltl-accent-hover"
              >
                <Play className="size-4 fill-current" aria-hidden />
                Listen free
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
