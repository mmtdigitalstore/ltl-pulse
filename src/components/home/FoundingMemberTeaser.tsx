"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { sectionFadeUp, sectionViewport } from "@/lib/motion";

export function FoundingMemberTeaser() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="ltl-section-glow ltl-glow-brand-top border-b border-ltl-border bg-ltl-bg px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-heading text-xl font-medium text-ltl-text-primary md:text-2xl">
          Premium leadership help, without the premium-coaching price.{" "}
          <Link
            href="/pricing"
            className="font-medium text-ltl-accent underline decoration-ltl-accent/50 underline-offset-4 hover:decoration-ltl-accent"
          >
            See plans →
          </Link>
        </p>
      </div>
    </motion.section>
  );
}
