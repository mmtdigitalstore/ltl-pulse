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
  /** Hide title/description under the player (use when copy lives beside it). */
  showCaption?: boolean;
  /** Homepage cinematic frame vs standard embed */
  variant?: "default" | "feature" | "editorial";
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
  const isEditorial = variant === "editorial";
  const isFeature = variant === "feature";

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

  const landscapeOnly = isEditorial;

  return (
    <motion.figure
      ref={containerRef}
      initial={{ opacity: 0, y: isEditorial ? 12 : isFeature ? 24 : 16 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0.9, y: isEditorial ? 12 : isFeature ? 24 : 16 }
      }
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(showCaption ? "space-y-3" : "space-y-0", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#0a081b]",
          isEditorial && [
            "aspect-video w-full",
            "border-y border-ltl-border/60",
            "shadow-[inset_0_1px_0_rgba(255,180,0,0.08)]",
          ],
          isFeature && [
            "rounded-2xl",
            "ring-1 ring-ltl-accent/15",
            "shadow-[0_32px_64px_-24px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,180,0,0.06)]",
            "mx-auto aspect-[9/16] w-full max-w-[280px] sm:max-w-xs",
            "md:aspect-video md:max-w-none",
          ],
          !isEditorial &&
            !isFeature && [
              "rounded-xl border border-ltl-border bg-ltl-surface",
              "mx-auto aspect-[9/16] w-full max-w-sm md:aspect-video md:max-w-none",
            ],
        )}
      >
        {isFeature ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0a081b]/50 via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-6 top-6 z-10 h-8 w-px bg-ltl-accent/70"
            />
          </>
        ) : null}

        {!isInView ? (
          <div
            className={cn(
              "flex h-full min-h-[200px] flex-col items-center justify-center gap-3 px-6",
              isEditorial && "min-h-0 aspect-video",
              isFeature && "min-h-[320px] md:min-h-[280px]",
            )}
          >
            <div className="h-px w-16 overflow-hidden bg-ltl-border">
              <span
                className="block h-full w-1/2 animate-pulse bg-ltl-accent/80"
                aria-hidden
              />
            </div>
          </div>
        ) : (
          <>
            <video
              className={cn(
                "h-full w-full bg-[#0a081b]",
                landscapeOnly || isEditorial
                  ? "block object-contain"
                  : "hidden object-cover md:block",
              )}
              controls
              playsInline
              preload="metadata"
              aria-label={title}
              onError={() => setFailed(true)}
            >
              <source src={landscapeSrc} type="video/mp4" />
            </video>
            {!landscapeOnly ? (
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
            ) : null}
          </>
        )}
      </div>

      {showCaption ? (
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
      ) : null}
    </motion.figure>
  );
}
