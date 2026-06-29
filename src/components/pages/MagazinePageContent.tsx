"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

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

export function MagazinePageContent() {
  const articles = getCatalogByType("magazine");

  return (
    <div className="min-h-screen bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-7xl"
      >
        <PageHeader
          title="The Magazine"
          subtitle="Deep-dive playbooks — one per problem, for members who want the how-to."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.div key={article.problemId} variants={staggerItem}>
              <Card className="h-full border-ltl-border bg-ltl-surface ring-ltl-border/50">
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-ltl-bg via-ltl-border/40 to-ltl-surface" />
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
                  <p className="flex items-center gap-1.5 font-label text-xs text-ltl-text-secondary">
                    <Clock className="size-3.5" aria-hidden />
                    Member deep-dive
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
