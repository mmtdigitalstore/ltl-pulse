"use client";

import { motion } from "framer-motion";
import { Clock, Play } from "lucide-react";

import { problems } from "@/data/problems.config";
import { formatProblemTag } from "@/lib/content/catalog";
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

export function PodcastPageContent() {
  useHashScroll();

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
          subtitle="The flagship podcast — free conversations mapped to the problems leaders face most."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 space-y-4"
        >
          {problems.map((problem, index) => (
            <motion.div key={problem.id} id={problem.id} variants={staggerItem} className="scroll-mt-24">
              <Card className="border-ltl-border bg-ltl-surface ring-ltl-border/50">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
                        Episode {problems.length - index} · Free
                      </p>
                      <Badge
                        variant="outline"
                        className="font-label border-ltl-border text-ltl-text-secondary"
                      >
                        {formatProblemTag(problem.id)}
                      </Badge>
                    </div>
                    <CardTitle className="font-heading text-xl text-ltl-text-primary">
                      {problem.podcast}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-full bg-ltl-accent text-ltl-bg hover:bg-ltl-accent-hover hover:text-ltl-bg"
                    aria-label={`Play ${problem.podcast}`}
                  >
                    <Play className="size-4 fill-current" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-ltl-text-secondary">
                    {problem.hook}
                  </CardDescription>
                  <p className="flex items-center gap-1.5 font-label text-xs text-ltl-text-secondary">
                    <Clock className="size-3.5" aria-hidden />
                    ~40 min
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
