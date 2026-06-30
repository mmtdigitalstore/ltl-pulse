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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

interface VlogsPageContentProps {
  isSubscriber: boolean;
}

export function VlogsPageContent({ isSubscriber }: VlogsPageContentProps) {
  const vlogs = getCatalogByType("vlog");

  return (
    <div className="ltl-section-glow ltl-glow-dual min-h-screen bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-7xl"
      >
        <PageHeader
          title="Vlogs"
          subtitle="Short tactical videos — premium by default, with a few free tasters."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {vlogs.map((vlog) => {
            const isLocked = !vlog.free && !isSubscriber;

            return (
              <motion.div key={vlog.problemId} variants={staggerItem}>
                <Card className="overflow-hidden border-ltl-border bg-ltl-surface ring-ltl-border/50">
                  <div className="relative aspect-video">
                    <div
                      className={`h-full w-full bg-gradient-to-br from-ltl-bg via-ltl-border to-ltl-surface ${
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
                          href="/subscribe"
                          className="font-label text-xs uppercase tracking-wider text-ltl-accent hover:underline"
                        >
                          Subscribe to unlock
                        </Link>
                      </div>
                    )}
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
                  {vlog.free && (
                    <CardContent>
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-accent">
                        Free taster
                      </p>
                    </CardContent>
                  )}
                  {isLocked && (
                    <CardContent>
                      <p className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
                        Premium vlog — subscribers only
                      </p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
