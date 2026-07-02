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
      className="ltl-theme-platform ltl-blackblue-atmosphere ltl-hero-handoff relative overflow-hidden border-b border-ltl-border px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(11,32,114,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16 xl:gap-20">
          <div className="max-w-xl lg:max-w-md xl:max-w-lg lg:pb-2">
            <div className="h-px w-14 bg-ltl-accent" aria-hidden />

            <p className="mt-8 font-label text-[0.7rem] uppercase tracking-[0.28em] text-ltl-accent">
              {copy.kicker}
            </p>

            <h2 className="mt-4 font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-ltl-text-primary sm:text-4xl lg:text-[2.35rem]">
              {copy.headline}
            </h2>

            <p className="mt-6 border-l border-ltl-border/80 pl-5 text-base leading-[1.75] text-ltl-text-secondary sm:text-lg">
              {copy.body}
            </p>

            <p className="mt-5 font-label text-[0.65rem] uppercase tracking-[0.18em] text-ltl-text-secondary">
              {copy.trustLine}
            </p>

            <p className="mt-4 font-heading text-lg italic text-ltl-text-primary/90">
              {copy.seasonLine}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={PROMO_PODCAST_URL}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
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

          <div className="w-full lg:max-w-[58%] xl:max-w-[56%]">
            <PromoVideoPlayer
              title={promo.title}
              landscapeSrc={promo.landscape}
              portraitSrc={promo.portrait}
              variant="feature"
              showCaption={false}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
