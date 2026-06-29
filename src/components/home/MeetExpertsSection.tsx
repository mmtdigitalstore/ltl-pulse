"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { EXPERT_IDS, experts } from "@/data/problems.config";
import { buttonVariants } from "@/components/ui/button";
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

            return (
              <motion.article
                key={id}
                variants={staggerItem}
                className="flex flex-col rounded-xl border border-ltl-border bg-ltl-surface p-6"
              >
                <h3 className="font-heading text-xl font-semibold text-ltl-text-primary">
                  {expert.name}
                </h3>
                <p className="mt-2 text-sm text-ltl-text-secondary">{expert.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-ltl-text-primary">
                  <span className="font-medium text-ltl-accent">Best for:</span>{" "}
                  {expert.bestFor}
                </p>
                <Link
                  href="/concierge"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "mt-6 w-fit rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-bg",
                  )}
                >
                  Connect via Cadence
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
