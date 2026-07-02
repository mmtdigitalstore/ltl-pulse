"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
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
      className="ltl-theme-platform ltl-blackblue-atmosphere ltl-hero-handoff relative border-b border-ltl-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(11,32,114,0.22),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <article className="ltl-theme-magazine ltl-media-container overflow-hidden rounded-2xl">
          {/* Lead — sets up the video */}
          <header className="border-b border-ltl-border/50 px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div
                className="mx-auto h-px w-14 bg-ltl-accent"
                aria-hidden
              />
              <p className="mt-6 font-label text-[0.7rem] uppercase tracking-[0.28em] text-ltl-accent">
                {copy.kicker}
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.12] tracking-tight text-ltl-text-primary sm:text-4xl md:text-[2.5rem]">
                {copy.headline}
              </h2>
              <p className="mt-4 font-heading text-base italic text-ltl-text-secondary sm:text-lg">
                {copy.seasonLine}
              </p>
            </div>
          </header>

          {/* Preview — full-bleed, aligned to headline above */}
          <PromoVideoPlayer
            title={promo.title}
            landscapeSrc={promo.landscape}
            portraitSrc={promo.portrait}
            variant="editorial"
            showCaption={false}
          />

          {/* Detail + action — completes the story below the video */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-base leading-[1.8] text-ltl-text-secondary sm:text-lg">
                {copy.body}
              </p>

              <p className="mt-6 font-label text-[0.65rem] uppercase tracking-[0.2em] text-ltl-text-secondary">
                {copy.trustLine}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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
          </div>
        </article>
      </div>
    </motion.section>
  );
}
