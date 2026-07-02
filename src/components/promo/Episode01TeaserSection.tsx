"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PromoVideoPlayer } from "@/components/promo/PromoVideoPlayer";
import { TrailerTextReveal } from "@/components/promo/TrailerTextReveal";
import { PROMO_VIDEOS } from "@/data/promo.config";

export function Episode01TeaserSection() {
  const promo = PROMO_VIDEOS.episode01;

  return (
    <section className="mb-12">
      <div className="mx-auto max-w-3xl text-center">
        <TrailerTextReveal
          as="p"
          text="Episode 1"
          className="font-label text-[0.7rem] uppercase tracking-[0.32em] text-ltl-accent"
          stagger={0.1}
        />

        <TrailerTextReveal
          as="h2"
          text="Where leadership meets culture"
          className="mt-4 font-heading text-2xl font-semibold leading-tight text-ltl-text-primary sm:text-3xl md:text-4xl"
          delay={0.15}
          stagger={0.065}
        />

        <div className="mx-auto mt-8 w-[90%] md:mt-10">
          <PromoVideoPlayer
            title={promo.title}
            description={promo.description}
            landscapeSrc={promo.landscape}
            portraitSrc={promo.portrait}
            variant="cinematic"
            showCaption={false}
          />
        </div>

        <TrailerTextReveal
          text={promo.description}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ltl-text-secondary md:mt-7 md:text-lg"
          delay={0.2}
          stagger={0.05}
        />

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
