"use client";

import { motion } from "framer-motion";
import { BookOpen, Bot, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { sectionFadeUp, sectionViewport } from "@/lib/motion";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Full Magazine Access",
    description:
      "Deep-dive articles on leadership, culture, and strategy — written for operators who think long-term.",
  },
  {
    icon: Bot,
    title: "AI Concierge",
    description:
      "Ask questions, surface insights, and explore our archive with AI Concierge — built for ambitious leaders.",
  },
  {
    icon: Sparkles,
    title: "Ad-Free Experience",
    description:
      "No distractions. Just premium podcasts, vlogs, and editorial content designed to elevate your perspective.",
  },
];

export function WhatsInside() {
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
          What&apos;s Inside
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-ltl-border bg-ltl-bg text-ltl-accent">
                <feature.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-ltl-text-primary">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ltl-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
