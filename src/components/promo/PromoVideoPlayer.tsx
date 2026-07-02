"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface PromoVideoPlayerProps {
  title: string;
  description?: string;
  /** Wide video — YouTube-style 16:9 */
  landscapeSrc: string;
  /** Tall video — phone / Stories 9:16 */
  portraitSrc: string;
  className?: string;
}

export function PromoVideoPlayer({
  title,
  description,
  landscapeSrc,
  portraitSrc,
  className,
}: PromoVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (failed) {
    return null;
  }

  return (
    <motion.figure
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.85, y: 16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-3", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-ltl-border bg-ltl-surface",
          "mx-auto aspect-[9/16] w-full max-w-sm md:aspect-video md:max-w-none",
        )}
      >
        {!isInView ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 px-6 md:min-h-[200px]">
            <span className="size-10 rounded-full border-2 border-ltl-accent/40 border-t-ltl-accent animate-spin" aria-hidden />
            <p className="font-label text-[0.65rem] uppercase tracking-widest text-ltl-text-secondary">
              Preview loads as you scroll
            </p>
          </div>
        ) : (
          <>
            <video
              className="hidden h-full w-full object-cover md:block"
              controls
              playsInline
              preload="metadata"
              aria-label={title}
              onError={() => setFailed(true)}
            >
              <source src={landscapeSrc} type="video/mp4" />
            </video>
            <video
              className="block h-full w-full object-cover md:hidden"
              controls
              playsInline
              preload="metadata"
              aria-label={title}
              onError={() => setFailed(true)}
            >
              <source src={portraitSrc} type="video/mp4" />
            </video>
          </>
        )}
      </div>
      <figcaption className="space-y-1">
        <p className="font-heading text-lg font-medium text-ltl-text-primary md:text-xl">
          {title}
        </p>
        {description ? (
          <p className="text-sm leading-relaxed text-ltl-text-secondary md:text-base">
            {description}
          </p>
        ) : null}
      </figcaption>
    </motion.figure>
  );
}
