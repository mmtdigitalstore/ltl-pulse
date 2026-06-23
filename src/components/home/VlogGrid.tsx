"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

import { sectionFadeUp, sectionViewport } from "@/lib/motion";

export interface Vlog {
  id: string;
  title: string;
  thumbnailAlt: string;
}

const latestVlogs: Vlog[] = [
  {
    id: "vlog-1",
    title: "Inside the Room: Board-Level Decisions",
    thumbnailAlt: "Boardroom vlog thumbnail",
  },
  {
    id: "vlog-2",
    title: "Founder Mindset Under Pressure",
    thumbnailAlt: "Founder mindset vlog thumbnail",
  },
  {
    id: "vlog-3",
    title: "Building Teams That Last",
    thumbnailAlt: "Team building vlog thumbnail",
  },
];

const isSubscriber = false;

function VlogCard({ vlog }: { vlog: Vlog }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-ltl-border bg-ltl-surface">
      <div className="relative aspect-video overflow-hidden">
        <div
          className="h-full w-full bg-gradient-to-br from-ltl-bg via-ltl-border to-ltl-surface blur-[2px] scale-105 transition-transform duration-300 group-hover:scale-110"
          role="img"
          aria-label={vlog.thumbnailAlt}
        />
        {!isSubscriber && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ltl-bg/60 backdrop-blur-sm">
            <Lock className="size-6 text-ltl-accent" aria-hidden />
            <p className="font-label text-xs uppercase tracking-wider text-ltl-text-primary">
              Subscribe to unlock
            </p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-medium text-ltl-text-primary">
          {vlog.title}
        </h3>
      </div>
    </article>
  );
}

export function VlogGrid() {
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
          Latest Vlogs
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestVlogs.map((vlog) => (
            <VlogCard key={vlog.id} vlog={vlog} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
