"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Lock } from "lucide-react";

import { getCatalogByType, formatProblemTag } from "@/lib/content/catalog";
import { getVlogCardState } from "@/lib/content/vlog-card-state";
import { VlogCardMedia } from "@/components/vlogs/VlogCardMedia";
import { VLOG_ACCESS_COPY } from "@/data/vlog-access.config";
import { VLOG_PLAYER_CONFIG } from "@/data/vlog-player.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface VlogsPageContentProps {
  isSubscriber: boolean;
}

export function VlogsPageContent({ isSubscriber }: VlogsPageContentProps) {
  const vlogs = getCatalogByType("vlog");
  const copy = VLOG_ACCESS_COPY;

  return (
    <div className="ltl-theme-magazine ltl-media-page min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-7xl"
      >
        <PageHeader title="Vlogs" subtitle={copy.pageSubtitle} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {vlogs.map((vlog) => {
            const state = getVlogCardState(vlog, isSubscriber);
            const showMemberLock = state.kind === "members-only";
            const showUpcoming = state.kind === "upcoming";
            const isPlayable = state.kind === "included";

            return (
              <motion.div key={vlog.problemId} variants={staggerItem}>
                <Card
                  className={cn(
                    "overflow-hidden border-ltl-border bg-ltl-surface ring-ltl-border/50",
                    isPlayable && VLOG_PLAYER_CONFIG.card.playableHoverClass,
                  )}
                >
                  <div className="relative aspect-video">
                    <VlogCardMedia
                      problemId={vlog.problemId}
                      title={vlog.title}
                      playable={isPlayable}
                      blurred={showMemberLock || showUpcoming}
                    />
                    {showUpcoming ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ltl-bg/55 px-4 text-center">
                        <Calendar
                          className="size-7 text-ltl-accent"
                          aria-hidden
                        />
                        <p className="font-label text-xs uppercase tracking-wider text-ltl-text-primary">
                          {copy.card.upcoming}
                          {state.episodeNumber ? ` ${state.episodeNumber}` : ""}
                        </p>
                        <p className="text-xs text-ltl-text-secondary">
                          {state.unlockLabel}
                        </p>
                        <Link
                          href={`/podcast#${vlog.problemId}`}
                          className="text-xs font-medium text-ltl-accent hover:underline"
                        >
                          See episode schedule
                        </Link>
                      </div>
                    ) : null}
                    {showMemberLock ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ltl-bg/50">
                        <Lock
                          className="size-8 text-ltl-accent"
                          aria-label="Membership required"
                        />
                        <p className="font-label text-xs uppercase tracking-wider text-ltl-text-primary">
                          {copy.card.membersOnly}
                        </p>
                        <Link
                          href="/pricing"
                          className="font-label text-xs uppercase tracking-wider text-ltl-accent hover:underline"
                        >
                          {copy.card.membersOnlyCta}
                        </Link>
                      </div>
                    ) : null}
                    <Badge className="absolute bottom-3 right-3 flex items-center gap-1 font-label border-ltl-border bg-ltl-bg/90 text-ltl-text-primary">
                      <Clock className="size-3" aria-hidden />
                      ~10 min
                    </Badge>
                  </div>
                  <CardHeader className="gap-2">
                    <Badge
                      variant="outline"
                      className="w-fit font-label border-ltl-border text-ltl-text-secondary"
                    >
                      {formatProblemTag(vlog.problemId)}
                    </Badge>
                    <CardTitle className="font-heading text-lg text-ltl-text-primary">
                      {vlog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {state.kind === "members-only" ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        {copy.card.membersOnly}
                      </p>
                    ) : null}
                    {state.kind === "upcoming" ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        {state.unlockLabel}
                      </p>
                    ) : null}
                    {state.kind === "included" ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        Included with your membership
                      </p>
                    ) : null}
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
