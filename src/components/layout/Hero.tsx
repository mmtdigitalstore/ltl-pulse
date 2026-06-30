"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="ltl-theme-platform ltl-blackblue-atmosphere relative flex min-h-[calc(100dvh-4rem)] w-full flex-1 items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[28rem] w-[28rem] -translate-x-1/5 translate-y-1/5 rounded-full bg-[radial-gradient(circle,rgba(11,32,114,0.28)_0%,rgba(11,32,114,0.08)_40%,transparent_72%)] blur-3xl sm:h-[34rem] sm:w-[34rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[20rem] w-[20rem] translate-x-1/6 -translate-y-1/6 rounded-full bg-[radial-gradient(circle,rgba(11,32,114,0.22)_0%,rgba(11,32,114,0.06)_45%,transparent_70%)] blur-3xl sm:h-[26rem] sm:w-[26rem]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,0,0.22)_0%,rgba(255,180,0,0.06)_45%,transparent_70%)] blur-3xl sm:h-[36rem] sm:w-[36rem]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.75, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-48 w-[32rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,180,0,0.12),rgba(230,162,0,0.18),rgba(255,180,0,0.12),transparent)] blur-2xl"
        animate={{
          opacity: [0.35, 0.65, 0.35],
          x: ["-2%", "2%", "-2%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-heading text-4xl font-semibold leading-tight tracking-tight text-ltl-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Where Leadership Meets Culture
        </motion.h1>

        <motion.p
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-ltl-text-secondary sm:text-lg md:text-xl"
        >
          Practical, future-ready leadership for growing service businesses and the
          coaches who guide them — so you keep your best people, win loyal customers,
          and build a team that delivers.
        </motion.p>

        <motion.p
          custom={0.32}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 hidden max-w-xl font-sans text-sm leading-relaxed text-ltl-text-secondary md:block md:text-base"
        >
          Short reads, candid conversations, and on-demand expert help — for owners
          who&apos;d rather invest 15 minutes than lose another good employee.
        </motion.p>

        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href="/podcast"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 min-w-[10rem] rounded-md bg-ltl-accent px-6 font-semibold text-ltl-bg hover:bg-ltl-accent-hover",
            )}
          >
            Listen free
          </Link>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "h-12 min-w-[10rem] rounded-md border border-ltl-border bg-transparent px-6 font-semibold text-ltl-text-primary hover:bg-ltl-surface/50 hover:text-ltl-text-primary",
            )}
          >
            See plans
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
