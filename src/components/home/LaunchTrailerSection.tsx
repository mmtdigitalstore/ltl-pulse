"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
import { PROMO_VIDEOS } from "@/data/promo.config";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";

export function LaunchTrailerSection() {
  const promo = PROMO_VIDEOS.launchTrailer;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="ltl-theme-platform ltl-blackblue-atmosphere border-b border-ltl-border px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
            Season 1 · Launch trailer
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
            Twelve conversations. One unlocks every week.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            LTL Conversations starts Wednesday, November 18, 2026 — free,
            problem-led episodes for growing service businesses.
          </p>
          <Link
            href="/podcast"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ltl-accent hover:underline"
          >
            See the full season
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
        <PromoVideoPlayer
          title={promo.title}
          description={promo.description}
          landscapeSrc={promo.landscape}
          portraitSrc={promo.portrait}
        />
      </div>
    </motion.section>
  );
}
