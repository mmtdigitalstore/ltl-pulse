"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";

import { getCatalogByType, formatProblemTag } from "@/lib/content/catalog";
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

  return (
    <div className="ltl-theme-magazine ltl-media-page min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-7xl"
      >
        <PageHeader
          title="The Magazine"
          subtitle="Deep-dive playbooks — two free samples, full library for members."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => {
            const isLocked = !article.free && !isSubscriber;

            return (
              <motion.div key={article.problemId} variants={staggerItem}>
                <Card className="h-full overflow-hidden border-ltl-border bg-ltl-surface ring-ltl-border/50">
                  <div className="relative aspect-[16/10] w-full">
                    <div
                      className={`h-full w-full bg-gradient-to-br from-ltl-bg via-ltl-border/40 to-ltl-surface ${
                        isLocked ? "blur-[3px] scale-105" : ""
                      }`}
                    />
                    {isLocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ltl-bg/50">
                        <Lock
                          className="size-8 text-ltl-accent"
                          aria-label="Locked content"
                        />
                        <Link
                          href="/pricing"
                          className="font-label text-xs uppercase tracking-wider text-ltl-accent hover:underline"
                        >
                          Subscribe to unlock
                        </Link>
                      </div>
                    )}
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
                    {article.free ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-accent">
                        Free sample
                      </p>
                    ) : isLocked ? (
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        Member deep-dive — subscribers only
                      </p>
                    ) : (
                      <p className="flex items-center gap-1.5 font-label text-xs text-ltl-text-secondary">
                        <Clock className="size-3.5" aria-hidden />
                        Member deep-dive
                      </p>
                    )}
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
