"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, Quote, Video } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  approvedSpotlights,
  approvedTestimonials,
  testimonialsCopy,
  type Spotlight,
  type Testimonial,
} from "./testimonials.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const spotlights = approvedSpotlights();
  const testimonials = approvedTestimonials();
  const [featured, ...wallQuotes] = testimonials;
  const hasWallContent = spotlights.length > 0 || testimonials.length > 0;

  return (
    <motion.section
      id="community"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="relative scroll-mt-16 overflow-hidden border-b border-ltl-border bg-ltl-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,180,0,0.08)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
              {testimonialsCopy.kicker}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
              {testimonialsCopy.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
              {testimonialsCopy.subhead}
            </p>
          </div>

          <Link
            href={testimonialsCopy.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 shrink-0 rounded-md bg-ltl-accent px-6 font-bold text-ltl-bg hover:bg-ltl-accent-hover",
            )}
          >
            {testimonialsCopy.cta.label}
          </Link>
        </div>

        {spotlights.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {spotlights.map((spotlight) => (
              <motion.div key={spotlight.id} variants={staggerItem}>
                <SpotlightCard spotlight={spotlight} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {featured && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={sectionFadeUp}
            className="mt-12"
          >
            <p className="mb-4 font-label text-xs uppercase tracking-widest text-ltl-text-secondary">
              Shift of the moment
            </p>
            <FeaturedQuoteCard testimonial={featured} />
          </motion.div>
        )}

        {wallQuotes.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="mt-8 columns-1 gap-6 md:columns-2 lg:columns-3"
          >
            {wallQuotes.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                className="mb-6 break-inside-avoid"
              >
                <QuoteCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!hasWallContent && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={sectionFadeUp}
            className="mt-12 rounded-2xl border border-dashed border-ltl-border bg-ltl-surface/50 px-6 py-10 text-center sm:px-10"
          >
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ltl-text-secondary">
              {testimonialsCopy.emptyWall}
            </p>
          </motion.div>
        )}

        <div className="mt-12 rounded-xl border border-ltl-border bg-ltl-surface/80 px-6 py-5 text-center sm:px-8">
          <p className="text-sm text-ltl-text-secondary md:text-base">
            {testimonialsCopy.ctaNote}
          </p>
          <Link
            href={testimonialsCopy.cta.href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ltl-accent hover:underline"
          >
            {testimonialsCopy.cta.label} →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function FeaturedQuoteCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, author, role, org, companyUrl, audioUrl, videoUrl } = testimonial;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-ltl-accent/30 bg-ltl-surface p-8 shadow-[0_0_40px_rgba(255,180,0,0.06)] sm:p-10">
      <Quote
        className="absolute right-6 top-6 size-16 text-ltl-accent/15"
        aria-hidden
      />
      <blockquote className="relative max-w-3xl font-heading text-xl leading-relaxed text-ltl-text-primary sm:text-2xl">
        {quote}
      </blockquote>
      {videoUrl && <VideoPlayer videoUrl={videoUrl} className="relative mt-6 max-w-lg" />}
      {audioUrl && !videoUrl && (
        <AudioPlayer audioUrl={audioUrl} className="relative mt-6 max-w-md" />
      )}
      <figcaption className="relative mt-8 flex items-center gap-4">
        <AuthorAvatar name={author} size="lg" />
        <AuthorAttribution
          author={author}
          role={role}
          org={org}
          companyUrl={companyUrl}
        />
      </figcaption>
    </figure>
  );
}

function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, author, role, org, companyUrl, audioUrl, videoUrl } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-ltl-border bg-ltl-surface p-6 transition-colors hover:border-ltl-accent/25">
      <span aria-hidden className="font-heading text-3xl leading-none text-ltl-accent/80">
        “
      </span>
      <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ltl-text-primary">
        {quote}
      </blockquote>
      {videoUrl && <VideoPlayer videoUrl={videoUrl} className="mt-4" />}
      {audioUrl && !videoUrl && <AudioPlayer audioUrl={audioUrl} className="mt-4" />}
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ltl-border pt-4">
        <AuthorAvatar name={author} />
        <AuthorAttribution
          author={author}
          role={role}
          org={org}
          companyUrl={companyUrl}
          compact
        />
      </figcaption>
    </figure>
  );
}

function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  const { name, role, org, work, shift, href, avatarUrl } = spotlight;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-ltl-accent/35 bg-gradient-to-br from-ltl-surface to-ltl-bg p-6">
      <span className="font-label text-xs uppercase tracking-widest text-ltl-accent">
        Member spotlight
      </span>
      <div className="mt-4 flex items-center gap-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            className="size-12 rounded-full object-cover ring-2 ring-ltl-accent/30"
          />
        ) : (
          <AuthorAvatar name={name} size="lg" />
        )}
        <div>
          <p className="font-semibold text-ltl-text-primary">{name}</p>
          <p className="text-sm text-ltl-text-secondary">
            {role}
            {org ? ` · ${org}` : ""}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-ltl-text-secondary">{work}</p>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ltl-text-primary">
        {shift}
      </p>
      {href && href !== "#" && (
        <a
          href={href}
          className="mt-4 inline-flex w-fit text-sm font-semibold text-ltl-accent hover:underline"
        >
          See their work →
        </a>
      )}
    </article>
  );
}

function AudioPlayer({ audioUrl, className }: { audioUrl: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Mic className="size-4 shrink-0 text-ltl-accent" aria-hidden />
      <audio controls preload="none" className="h-8 w-full max-w-xs opacity-90">
        <source src={audioUrl} />
      </audio>
    </div>
  );
}

function VideoPlayer({ videoUrl, className }: { videoUrl: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-ltl-border bg-ltl-bg", className)}>
      <div className="flex items-center gap-2 border-b border-ltl-border px-3 py-2">
        <Video className="size-4 shrink-0 text-ltl-accent" aria-hidden />
        <span className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
          Video testimonial
        </span>
      </div>
      <video controls preload="metadata" playsInline className="aspect-video w-full">
        <source src={videoUrl} />
      </video>
    </div>
  );
}

function AuthorAttribution({
  author,
  role,
  org,
  companyUrl,
  compact = false,
}: {
  author: string;
  role: string;
  org?: string;
  companyUrl?: string;
  compact?: boolean;
}) {
  const nameClass = compact
    ? "text-sm font-semibold text-ltl-text-primary"
    : "font-semibold text-ltl-text-primary";
  const metaClass = compact ? "text-xs text-ltl-text-secondary" : "text-sm text-ltl-text-secondary";

  return (
    <div>
      <p className={nameClass}>{author}</p>
      <p className={metaClass}>
        {role}
        {org ? (
          <>
            {" · "}
            {companyUrl ? (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ltl-accent hover:underline"
              >
                {org}
              </a>
            ) : (
              org
            )}
          </>
        ) : companyUrl ? (
          <>
            {" · "}
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ltl-accent hover:underline"
            >
              Company site
            </a>
          </>
        ) : null}
      </p>
    </div>
  );
}

function AuthorAvatar({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-ltl-accent/15 font-label font-semibold text-ltl-accent ring-1 ring-ltl-accent/30",
        size === "lg" ? "size-12 text-sm" : "size-9 text-xs",
      )}
    >
      {initials(name)}
    </span>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === "") return "•";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
