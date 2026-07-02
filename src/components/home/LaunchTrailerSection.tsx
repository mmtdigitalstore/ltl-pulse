"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
import { TrailerTextReveal } from "@/components/promo/TrailerTextReveal";
import { buttonVariants } from "@/components/ui/button";
import { PROMO_PODCAST_URL, PROMO_VIDEOS } from "@/data/promo.config";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function LaunchTrailerSection() {
  const promo = PROMO_VIDEOS.launchTrailer;
  const copy = promo.homepage;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="ltl-theme-platform ltl-blackblue-atmosphere ltl-hero-handoff relative border-b border-ltl-border px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(11,32,114,0.2),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <TrailerTextReveal
          as="p"
          text={copy.kicker}
          className="font-label text-[0.7rem] uppercase tracking-[0.32em] text-ltl-accent"
          stagger={0.09}
        />

        <TrailerTextReveal
          as="h2"
          text={copy.headline}
          className="mt-5 font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-ltl-text-primary sm:text-4xl md:text-5xl"
          delay={0.2}
          stagger={0.07}
        />

        <div className="mx-auto mt-10 w-[90%] md:mt-12">
          <PromoVideoPlayer
            title={promo.title}
            landscapeSrc={promo.landscape}
            portraitSrc={promo.portrait}
            variant="cinematic"
            showCaption={false}
          />
        </div>

        <TrailerTextReveal
          text={copy.body}
          className="mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-ltl-text-secondary sm:mt-8 sm:text-lg"
          delay={0.15}
          stagger={0.04}
        />

        <TrailerTextReveal
          as="p"
          text={copy.trustLine}
          className="mt-5 font-label text-[0.65rem] uppercase tracking-[0.22em] text-ltl-text-secondary"
          delay={0.1}
          stagger={0.05}
        />

        <TrailerTextReveal
          as="p"
          text={copy.seasonLine}
          className="mt-4 font-heading text-lg italic text-ltl-text-primary/90 md:text-xl"
          delay={0.25}
          stagger={0.06}
        />

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <Link
            href={PROMO_PODCAST_URL}
            className={cn(
              buttonVariants({ size: "lg" }),
              "min-w-[11rem] rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
            )}
          >
            {copy.primaryCta}
          </Link>
          <Link
            href="/podcast"
            className="text-sm font-medium text-ltl-text-secondary transition-colors hover:text-ltl-accent"
          >
            {copy.secondaryCta}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
