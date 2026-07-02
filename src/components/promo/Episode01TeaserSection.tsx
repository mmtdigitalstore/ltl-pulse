"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
import { PROMO_VIDEOS } from "@/data/promo.config";

export function Episode01TeaserSection() {
  const promo = PROMO_VIDEOS.episode01;

  return (
    <section className="mb-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-label text-[0.7rem] uppercase tracking-[0.32em] text-ltl-accent">
          Episode 1
        </p>

        <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight text-ltl-text-primary sm:text-3xl md:text-4xl">
          Where leadership meets culture
        </h2>

        <div className="mt-8 md:mt-10">
          <PromoVideoPlayer
            title=""
            description={promo.description}
            landscapeSrc={promo.landscape}
            portraitSrc={promo.portrait}
            variant="cinematic"
            showCaption
          />
        </div>

        <Link
          href={promo.podcastHref}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ltl-accent hover:underline"
        >
          Episode details
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
