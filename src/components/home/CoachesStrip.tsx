"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CoachesStrip() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="ltl-section-glow ltl-glow-brand-top border-b border-ltl-border bg-ltl-surface px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold text-ltl-text-primary md:text-3xl">
            Built for coaches and trainers, too
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ltl-text-secondary">
            Use our frameworks with your clients, join a community of practitioners,
            and — when you&apos;re ready — get featured to reach new clients.
          </p>
        </div>
        <Link
          href="/coaches"
          className={cn(
            buttonVariants({ size: "lg" }),
            "shrink-0 rounded-md bg-ltl-accent font-semibold text-ltl-bg hover:bg-ltl-accent-hover",
          )}
        >
          Explore the coach path
        </Link>
      </div>
    </motion.section>
  );
}
