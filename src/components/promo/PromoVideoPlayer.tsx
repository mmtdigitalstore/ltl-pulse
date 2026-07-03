"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

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

function usePortraitPromoVideo() {
  const [preferPortrait, setPreferPortrait] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    const sync = () => setPreferPortrait(query.matches);

    sync();
    query.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);

    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  return preferPortrait;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const preferPortrait = usePortraitPromoVideo();
  const isCinematic = variant === "cinematic";
  const videoSrc = preferPortrait ? portraitSrc : landscapeSrc;

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) {
      return;
    }

    video.load();
    setIsPlaying(false);
  }, [videoSrc, isInView]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  if (failed) {
    return null;
  }

  const videoLabel = title || description || "Promo video";

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
            ? preferPortrait
              ? "mx-auto aspect-[9/16] max-w-[min(100%,22rem)] bg-transparent"
              : "aspect-video bg-transparent"
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
        ) : isCinematic ? (
          <>
            <video
              ref={videoRef}
              className="block h-full w-full cursor-pointer bg-transparent object-contain"
              playsInline
              preload="metadata"
              aria-label={videoLabel}
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              onClick={togglePlayback}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={() => setFailed(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>

            <button
              type="button"
              onClick={togglePlayback}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                isPlaying
                  ? "pointer-events-none opacity-0"
                  : "bg-black/20 opacity-100 hover:bg-black/30",
              )}
              aria-label={isPlaying ? `Pause ${videoLabel}` : `Play ${videoLabel}`}
              tabIndex={isPlaying ? -1 : 0}
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-ltl-accent text-ltl-bg shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 sm:size-[4.5rem]">
                <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
              </span>
            </button>
          </>
        ) : (
          <video
            className="block h-full w-full bg-transparent object-contain"
            controls
            playsInline
            preload="metadata"
            aria-label={videoLabel}
            onError={() => setFailed(true)}
          >
            <source src={videoSrc} type="video/mp4" />
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
