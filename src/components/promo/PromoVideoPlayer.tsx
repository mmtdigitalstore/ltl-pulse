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
  /** Title and/or description beneath the video */
  showCaption?: boolean;
  /** Borderless trailer-style vs basic embed */
  variant?: "default" | "cinematic";
}

export function PromoVideoPlayer({
  title,
  description,
  landscapeSrc,
  portraitSrc,
  className,
  showCaption = true,
  variant = "default",
}: PromoVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [failed, setFailed] = useState(false);
  const isCinematic = variant === "cinematic";

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
      initial={{ opacity: 0, y: isCinematic ? 20 : 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.88, y: isCinematic ? 20 : 12 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isCinematic
            ? "aspect-video bg-transparent"
            : [
                "rounded-xl border border-ltl-border bg-ltl-surface",
                "mx-auto aspect-[9/16] max-w-sm md:aspect-video md:max-w-none",
              ],
        )}
      >
        {!isInView ? (
          <div
            className={cn(
              "flex aspect-video items-center justify-center",
              !isCinematic && "min-h-[200px]",
            )}
            aria-hidden
          />
        ) : (
          <video
            className="block h-full w-full bg-transparent object-contain"
            controls
            playsInline
            preload="metadata"
            aria-label={title}
            onError={() => setFailed(true)}
          >
            <source src={landscapeSrc} type="video/mp4" />
          </video>
        )}
      </div>

      {showCaption && (title || description) ? (
        <figcaption
          className={cn(
            "space-y-2",
            isCinematic
              ? "mx-auto mt-5 max-w-2xl text-center md:mt-7"
              : "mt-3",
          )}
        >
          {title ? (
            <p
              className={cn(
                "font-heading text-ltl-text-primary",
                isCinematic
                  ? "text-xl font-medium md:text-2xl"
                  : "text-lg font-medium md:text-xl",
              )}
            >
              {title}
            </p>
          ) : null}
          {description ? (
            <p
              className={cn(
                "leading-relaxed text-ltl-text-secondary",
                isCinematic ? "text-base md:text-lg" : "text-sm md:text-base",
              )}
            >
              {description}
            </p>
          ) : null}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
