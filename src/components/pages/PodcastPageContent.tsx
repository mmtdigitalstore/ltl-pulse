"use client";

import { motion } from "framer-motion";
import { Clock, Eye, Lock, Play } from "lucide-react";

import {
  getPodcastSeasonProblems,
  PODCAST_SEASON_EPISODE_COUNT,
} from "@/data/problems.config";
import { formatProblemTag } from "@/lib/content/catalog";
import {
  getPodcastEpisodeNumber,
  getPodcastUnlockLabel,
  isPodcastReleased,
} from "@/lib/content/podcast-release";
import { PageHeader } from "@/components/layout/PageHeader";
import { useHashScroll } from "@/lib/navigation/use-hash-scroll";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PodcastPageContentProps {
  canPreviewAll?: boolean;
}

export function PodcastPageContent({
  canPreviewAll = false,
}: PodcastPageContentProps) {
  useHashScroll();
  const season = getPodcastSeasonProblems();
  const releaseOptions = canPreviewAll ? { previewAll: true } : undefined;
  const releasedCount = season.filter((problem) =>
    isPodcastReleased(problem.id, new Date(), releaseOptions),
  ).length;

  return (
    <div className="ltl-theme-magazine ltl-media-page min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-3xl"
      >
        <PageHeader
          title="LTL Conversations"
          subtitle="The flagship podcast — free conversations mapped to the problems leaders face most. A new episode unlocks each week."
        />

        {canPreviewAll ? (
          <p className="mt-6 flex items-start gap-2 rounded-xl border border-ltl-accent/35 bg-ltl-accent/10 px-4 py-3 text-sm leading-relaxed text-ltl-text-primary">
            <Eye className="mt-0.5 size-4 shrink-0 text-ltl-accent" aria-hidden />
            <span>
              <span className="font-medium text-ltl-accent">Team preview mode.</span>{" "}
              Unreleased episodes are visible to your admin account only — public
              visitors still see locked cards until each unlock date.
            </span>
          </p>
        ) : null}

        <p className="mt-6 rounded-xl border border-ltl-border bg-ltl-surface/60 px-4 py-3 text-sm leading-relaxed text-ltl-text-secondary">
          {releasedCount} of {PODCAST_SEASON_EPISODE_COUNT} live. Upcoming episodes
          appear below with their unlock dates — still free once they drop.
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-4"
        >
          {season.map((problem) => {
            const released = isPodcastReleased(
              problem.id,
              new Date(),
              releaseOptions,
            );
            const publiclyReleased = isPodcastReleased(problem.id);
            const previewOnly = canPreviewAll && released && !publiclyReleased;
            const episodeNumber = getPodcastEpisodeNumber(problem.id);

            return (
              <motion.div
                key={problem.id}
                id={problem.id}
                variants={staggerItem}
                className="scroll-mt-24"
              >
                <Card
                  className={cn(
                    "border-ltl-border bg-ltl-surface ring-ltl-border/50",
                    !released && "opacity-90",
                    previewOnly && "border-ltl-accent/30",
                  )}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
                          Episode {episodeNumber ?? "—"}
                          {released ? " · Free" : " · Coming soon"}
                        </p>
                        <Badge
                          variant="outline"
                          className="font-label border-ltl-border text-ltl-text-secondary"
                        >
                          {formatProblemTag(problem.id)}
                        </Badge>
                        {previewOnly ? (
                          <Badge
                            variant="outline"
                            className="font-label border-ltl-accent/35 bg-ltl-accent/10 text-ltl-accent"
                          >
                            Team preview
                          </Badge>
                        ) : null}
                        {!released ? (
                          <Badge
                            variant="outline"
                            className="font-label border-ltl-accent/35 bg-ltl-accent/10 text-ltl-accent"
                          >
                            {getPodcastUnlockLabel(problem.id)}
                          </Badge>
                        ) : null}
                      </div>
                      <CardTitle
                        className={cn(
                          "font-heading text-xl text-ltl-text-primary",
                          !released && "text-ltl-text-secondary",
                        )}
                      >
                        {problem.podcast}
                      </CardTitle>
                    </div>
                    {released ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 rounded-full bg-ltl-accent text-ltl-bg hover:bg-ltl-accent-hover hover:text-ltl-bg"
                        aria-label={`Play ${problem.podcast}`}
                      >
                        <Play className="size-4 fill-current" />
                      </Button>
                    ) : (
                      <span
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ltl-border bg-ltl-bg text-ltl-text-secondary"
                        aria-hidden
                      >
                        <Lock className="size-4" />
                      </span>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-ltl-text-secondary">
                      {problem.hook}
                    </CardDescription>
                    <p className="flex items-center gap-1.5 font-label text-xs text-ltl-text-secondary">
                      <Clock className="size-3.5" aria-hidden />
                      {released
                        ? previewOnly
                          ? "Team preview · ~40 min"
                          : "~40 min"
                        : getPodcastUnlockLabel(problem.id)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
