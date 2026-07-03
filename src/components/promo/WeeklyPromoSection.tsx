"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Play } from "lucide-react";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
import { PROMO_VIDEOS } from "@/data/promo.config";
import {
  formatWeeklyUnlockShort,
  getWeeklyPromoState,
} from "@/lib/content/weekly-promo";
import { cn } from "@/lib/utils";

const launchPromo = PROMO_VIDEOS.launchTrailer;
const podcastCopy = launchPromo.podcastPage;

function LaunchTrailerVideo() {
  return (
    <div className="mx-auto mt-8 w-[90%] md:mt-10">
      <PromoVideoPlayer
        title={launchPromo.title}
        landscapeSrc={launchPromo.landscape}
        portraitSrc={launchPromo.portrait}
        variant="cinematic"
        showCaption={false}
      />
    </div>
  );
}

function PromoEpisodeBlock({
  label,
  episodeNumber,
  title,
  hook,
  href,
  unlockLabel,
  isReleased,
  variant = "featured",
}: {
  label: string;
  episodeNumber: number;
  title: string;
  hook: string;
  href: string;
  unlockLabel?: string;
  isReleased: boolean;
  variant?: "featured" | "up-next";
}) {
  const isUpNext = variant === "up-next";

  return (
    <div
      className={cn(
        "rounded-xl border px-5 py-6 text-center sm:px-6 sm:py-7",
        isUpNext
          ? "border-ltl-border/70 bg-ltl-surface/40"
          : "border-ltl-border bg-ltl-surface/60",
      )}
    >
      <p className="font-label text-[0.7rem] uppercase tracking-[0.32em] text-ltl-accent">
        {label}
      </p>

      <p className="mt-2 font-label text-xs uppercase tracking-widest text-ltl-text-secondary">
        Episode {episodeNumber}
      </p>

      <h2
        className={cn(
          "mt-3 font-heading font-semibold leading-tight text-ltl-text-primary",
          isUpNext ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl md:text-4xl",
        )}
      >
        {title}
      </h2>

      <p
        className={cn(
          "mx-auto mt-4 max-w-xl leading-relaxed text-ltl-text-secondary",
          isUpNext ? "text-sm sm:text-base" : "text-base sm:text-lg",
        )}
      >
        {hook}
      </p>

      {unlockLabel && !isReleased ? (
        <p className="mt-4 flex items-center justify-center gap-1.5 font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
          <Calendar className="size-3.5 shrink-0 text-ltl-accent" aria-hidden />
          {unlockLabel}
        </p>
      ) : null}

      {isReleased ? (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-ltl-accent px-5 py-2.5 text-sm font-semibold text-ltl-bg transition-colors hover:bg-ltl-accent-hover"
        >
          <Play className="size-4 fill-current" aria-hidden />
          Listen now
        </Link>
      ) : (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ltl-accent hover:underline"
        >
          Episode preview
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}

export function WeeklyPromoSection() {
  const { phase, current, featured, upNext } = getWeeklyPromoState();

  if (phase === "pre-launch") {
    return (
      <section className="mb-12" aria-labelledby="weekly-promo-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-label text-[0.7rem] uppercase tracking-[0.32em] text-ltl-accent">
            {podcastCopy.kicker}
          </p>

          <h2
            id="weekly-promo-heading"
            className="mt-4 font-heading text-2xl font-semibold leading-tight text-ltl-text-primary sm:text-3xl md:text-4xl"
          >
            {featured.title}
          </h2>

          <p className="mt-2 font-label text-xs uppercase tracking-widest text-ltl-text-secondary">
            Episode {featured.episodeNumber}
          </p>

          <LaunchTrailerVideo />

          <p className="mx-auto mt-5 max-w-2xl font-heading text-base italic leading-relaxed text-ltl-text-primary/90 md:mt-7 md:text-lg">
            {podcastCopy.preLaunchTagline}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ltl-text-secondary sm:text-lg">
            {featured.hook}
          </p>

          <p className="mt-5 font-label text-[0.65rem] uppercase tracking-[0.22em] text-ltl-text-secondary">
            {podcastCopy.trustLine}
          </p>

          <p className="mt-4 font-heading text-lg italic text-ltl-text-primary/90">
            {podcastCopy.seasonLine}
          </p>

          <p className="mt-3 flex items-center justify-center gap-1.5 font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
            <Calendar className="size-3.5 shrink-0 text-ltl-accent" aria-hidden />
            {featured.unlockLabel}
          </p>

          <Link
            href={featured.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ltl-accent hover:underline"
          >
            Episode details
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>

          {upNext ? (
            <div className="mt-10 text-left">
              <PromoEpisodeBlock
                label="Up next"
                episodeNumber={upNext.episodeNumber}
                title={upNext.title}
                hook={upNext.hook}
                href={upNext.href}
                unlockLabel={`Unlocks ${formatWeeklyUnlockShort(upNext.unlockAt)}`}
                isReleased={false}
                variant="up-next"
              />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12" aria-labelledby="weekly-promo-heading">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-label text-[0.7rem] uppercase tracking-[0.32em] text-ltl-accent">
            {podcastCopy.kicker}
          </p>
          <h2
            id="weekly-promo-heading"
            className="mt-3 font-heading text-xl font-semibold text-ltl-text-primary sm:text-2xl"
          >
            {phase === "season-complete"
              ? "Full season available — free to listen"
              : "Listen now · Coming up next"}
          </h2>
        </div>

        <div
          className={cn(
            "mt-8 grid gap-6",
            upNext ? "md:grid-cols-2" : "md:mx-auto md:max-w-xl",
          )}
        >
          {current ? (
            <PromoEpisodeBlock
              label={phase === "season-complete" ? "Latest episode" : "Listen now"}
              episodeNumber={current.episodeNumber}
              title={current.title}
              hook={current.hook}
              href={current.href}
              isReleased
            />
          ) : null}

          {upNext ? (
            <PromoEpisodeBlock
              label="Up next"
              episodeNumber={upNext.episodeNumber}
              title={upNext.title}
              hook={upNext.hook}
              href={upNext.href}
              unlockLabel={`Unlocks ${formatWeeklyUnlockShort(upNext.unlockAt)}`}
              isReleased={false}
              variant="up-next"
            />
          ) : null}
        </div>

        <p className="mt-6 text-center font-label text-[0.65rem] uppercase tracking-[0.22em] text-ltl-text-secondary">
          {podcastCopy.trustLine}
        </p>
      </div>
    </section>
  );
}
