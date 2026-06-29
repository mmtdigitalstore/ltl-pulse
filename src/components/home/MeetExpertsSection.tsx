"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ExpertPhoto } from "@/components/team/ExpertPhoto";
import { buttonVariants } from "@/components/ui/button";
import { EXPERT_PHOTOS } from "@/data/expert-photos.config";
import { EXPERT_IDS, experts, getExpertHref } from "@/data/problems.config";
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
      className="border-b border-ltl-border bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8"
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
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {EXPERT_IDS.map((id) => {
            const expert = experts[id];
            const photo = EXPERT_PHOTOS[id];

            return (
              <motion.article
                key={id}
                variants={staggerItem}
                className="flex flex-col gap-5 rounded-xl border border-ltl-border bg-ltl-surface p-6 sm:flex-row sm:items-start"
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
                    {expert.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ltl-text-primary">
                    <span className="font-medium text-ltl-accent">Best for:</span>{" "}
                    {expert.bestFor}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={getExpertHref(id)}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "default" }),
                        "h-9 rounded-md px-3 text-sm text-ltl-text-secondary hover:bg-ltl-bg hover:text-ltl-text-primary",
                      )}
                    >
                      Read bio
                    </Link>
                    <Link
                      href="/concierge"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "default" }),
                        "h-9 rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-bg",
                      )}
                    >
                      Connect via Cadence
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
