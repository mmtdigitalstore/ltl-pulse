"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type TrailerTextElement = "p" | "h1" | "h2" | "h3" | "span";

interface TrailerTextRevealProps {
  text: string;
  className?: string;
  as?: TrailerTextElement;
  /** Seconds before the first word appears */
  delay?: number;
  /** Seconds between each word */
  stagger?: number;
}

const motionElements = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
} as const;

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

export function TrailerTextReveal({
  text,
  className,
  as: Tag = "p",
  delay = 0,
  stagger = 0.065,
}: TrailerTextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = motionElements[Tag];

  if (reduceMotion) {
    const StaticTag = Tag;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={{ delay, stagger }}
      variants={containerVariants}
      className={cn(className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
