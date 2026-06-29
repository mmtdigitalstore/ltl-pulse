"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CadenceIcon } from "@/components/concierge/CadenceIcon";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";

const ladderSteps = [
  {
    title: "Free podcasts",
    description: "LTL Conversations — practical help you can use today, no paywall.",
    href: "/podcast",
  },
  {
    title: "Magazine deep-dives",
    description: "How-to playbooks for the problems that keep showing up.",
    href: "/magazine",
  },
  {
    title: "Premium vlogs",
    description: "Short, tactical videos when you want to see it in action.",
    href: "/vlogs",
  },
  {
    title: "Cadence + human experts",
    description: "Your AI concierge routes you to the right LTL consultant when you need a person.",
    href: "/concierge",
    cadence: true,
  },
] as const;

export function ContentLadderSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="border-b border-ltl-border bg-ltl-surface px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
          From a 10-minute listen to a 1:1 with an expert
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-ltl-text-secondary">
          A simple path — start free, go deeper when it&apos;s useful, connect with a
          human when it matters.
        </p>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ladderSteps.map((step, index) => (
            <li key={step.title}>
              <Link
                href={step.href}
                className="group flex h-full flex-col rounded-xl border border-ltl-border bg-ltl-bg p-5 transition-colors hover:border-ltl-accent/40"
              >
                <span className="font-label text-xs uppercase tracking-widest text-ltl-accent">
                  Step {index + 1}
                </span>
                <div className="mt-3 flex items-center gap-2">
                  {"cadence" in step && step.cadence ? (
                    <CadenceIcon className="size-6" />
                  ) : null}
                  <h3 className="font-heading text-lg font-medium text-ltl-text-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ltl-text-secondary">
                  {step.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ltl-accent">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
