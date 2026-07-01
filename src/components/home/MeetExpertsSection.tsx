"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ExpertPhoto } from "@/components/team/ExpertPhoto";
import { buttonVariants } from "@/components/ui/button";
import { EXPERT_PHOTOS } from "@/data/expert-photos.config";
import { EXPERT_IDS, experts, getConciergeHref, getExpertHref } from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MeetExpertsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="ltl-section-glow ltl-glow-brand-center border-b border-ltl-border bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
          Meet the experts
        </h2>
        <p className="mt-4 max-w-2xl text-base text-ltl-text-secondary md:text-lg">
          Four consultants behind LTL Pulse — each with a lane that maps to the
          problems you&apos;re facing.
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {EXPERT_IDS.map((id) => {
            const expert = experts[id];
            const photo = EXPERT_PHOTOS[id];

            return (
              <motion.article
                key={id}
                variants={staggerItem}
                className="flex min-w-0 flex-col gap-5 rounded-xl border border-ltl-border bg-ltl-surface p-6 sm:flex-row sm:items-start"
              >
                <Link
                  href={getExpertHref(id)}
                  className="shrink-0 transition-opacity hover:opacity-90"
                >
                  <ExpertPhoto
                    src={photo.src}
                    alt={photo.alt}
                    name={expert.name}
                    size="sm"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-heading text-xl font-semibold text-ltl-text-primary">
                    <Link
                      href={getExpertHref(id)}
                      className="hover:text-ltl-accent hover:underline underline-offset-2"
                    >
                      {expert.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-label text-[0.65rem] uppercase tracking-widest text-ltl-accent">
                    {expert.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ltl-text-secondary">
                    {expert.homepageTagline ?? expert.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ltl-text-primary">
                    <span className="font-medium text-ltl-accent">Best for:</span>{" "}
                    {expert.homepageLane ??
                      expert.homepageBestFor ??
                      expert.bestFor}
                  </p>
                  <div className="mt-6 flex max-w-xs flex-col gap-3 md:max-w-none md:flex-row md:flex-wrap md:items-center">
                    <Link
                      href={getConciergeHref(id)}
                      className={cn(
                        buttonVariants({ size: "default" }),
                        "h-10 w-full rounded-md border-transparent bg-ltl-accent font-bold text-ltl-bg shadow-none hover:bg-ltl-accent-hover md:w-auto md:flex-1",
                      )}
                    >
                      Connect via Cadence
                    </Link>
                    <Link
                      href={getExpertHref(id)}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "default" }),
                        "h-10 w-full rounded-md border-ltl-border bg-transparent text-ltl-text-primary shadow-none hover:bg-ltl-bg hover:text-ltl-text-primary md:w-auto md:flex-1",
                      )}
                    >
                      Read bio
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
