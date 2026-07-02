"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
import { PROMO_VIDEOS } from "@/data/promo.config";

export function Episode01TeaserSection() {
  const promo = PROMO_VIDEOS.episode01;

  return (
    <section className="mb-10 rounded-xl border border-ltl-border bg-ltl-surface/60 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
            Episode 1 teaser
          </p>
          <h2 className="mt-1 font-heading text-xl font-semibold text-ltl-text-primary sm:text-2xl">
            Where leadership meets culture
          </h2>
        </div>
        <Link
          href={promo.podcastHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-ltl-accent hover:underline"
        >
          Episode details
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
      <PromoVideoPlayer
        title={promo.title}
        description={promo.description}
        landscapeSrc={promo.landscape}
        portraitSrc={promo.portrait}
      />
    </section>
  );
}
