"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Lock } from "lucide-react";

import { getCatalogByType, formatProblemTag } from "@/lib/content/catalog";
import { getMagazineCardState } from "@/lib/content/magazine-card-state";
import { MAGAZINE_ACCESS_COPY } from "@/data/magazine-access.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

interface MagazinePageContentProps {
  isSubscriber: boolean;
}

export function MagazinePageContent({ isSubscriber }: MagazinePageContentProps) {
  const articles = getCatalogByType("magazine");
  const copy = MAGAZINE_ACCESS_COPY;

  return (
    <div className="ltl-theme-magazine ltl-media-page min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-7xl"
      >
        <PageHeader title="The Magazine" subtitle={copy.pageSubtitle} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => {
            const state = getMagazineCardState(article, isSubscriber);
            const showMemberLock = state.kind === "members-only";
            const showUpcoming = state.kind === "upcoming";

            return (
              <motion.div key={article.problemId} variants={staggerItem}>
                <Card className="h-full overflow-hidden border-ltl-border bg-ltl-surface ring-ltl-border/50">
                  <div className="relative aspect-[16/10] w-full">
                    <div
                      className={`h-full w-full bg-gradient-to-br from-ltl-bg via-ltl-border/40 to-ltl-surface ${
                        showMemberLock || showUpcoming ? "blur-[3px] scale-105" : ""
                      }`}
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
                          href={`/podcast#${article.problemId}`}
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
                  </div>
                  <CardHeader className="gap-3">
                    <Badge
                      variant="outline"
                      className="font-label border-ltl-accent/40 bg-ltl-accent/10 text-ltl-accent"
                    >
                      {formatProblemTag(article.problemId)}
                    </Badge>
                    <CardTitle className="font-heading text-xl text-ltl-text-primary">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-ltl-text-secondary">
                      {article.problem.hook}
                    </CardDescription>
                    {state.kind === "free-sample" ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-accent">
                        {copy.card.freeSample}
                      </p>
                    ) : null}
                    {state.kind === "upcoming" ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        {state.unlockLabel}
                      </p>
                    ) : null}
                    {state.kind === "members-only" ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        {copy.card.membersOnly}
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
