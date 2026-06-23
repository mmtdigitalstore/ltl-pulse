"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

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

interface MagazineArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

const articles: MagazineArticle[] = [
  {
    id: "1",
    title: "The Quiet Discipline of Cultural Leadership",
    excerpt:
      "Why the most enduring companies treat culture as infrastructure, not inspiration.",
    category: "Leadership",
    readTime: "9 min read",
  },
  {
    id: "2",
    title: "Decision-Making at the Speed of Trust",
    excerpt:
      "How high-trust teams move faster without sacrificing alignment or accountability.",
    category: "Culture",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "What Boardrooms Get Wrong About Purpose",
    excerpt:
      "Purpose statements fail when they aren't backed by daily operational choices.",
    category: "Strategy",
    readTime: "8 min read",
  },
  {
    id: "4",
    title: "The Art of Hiring for Values Fit",
    excerpt:
      "Skills can be taught. Character and cultural contribution are harder to retrofit.",
    category: "People",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "Leading Through Uncertainty Without Burning Out",
    excerpt:
      "Resilience isn't grit alone — it's designing systems that protect human energy.",
    category: "Leadership",
    readTime: "10 min read",
  },
  {
    id: "6",
    title: "Why Storytelling Is a Strategic Capability",
    excerpt:
      "Narrative shapes perception, recruits talent, and anchors teams during change.",
    category: "Ideas",
    readTime: "5 min read",
  },
];

export function MagazinePageContent() {
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
          subtitle="In-depth editorial on leadership, culture, and ideas that matter."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={staggerItem}>
              <Card className="h-full border-ltl-border bg-ltl-surface ring-ltl-border/50">
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-ltl-bg via-ltl-border/40 to-ltl-surface" />
                <CardHeader className="gap-3">
                  <Badge
                    variant="outline"
                    className="font-label border-ltl-accent/40 bg-ltl-accent/10 text-ltl-accent"
                  >
                    {article.category}
                  </Badge>
                  <CardTitle className="font-heading text-xl text-ltl-text-primary">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-ltl-text-secondary">
                    {article.excerpt}
                  </CardDescription>
                  <p className="flex items-center gap-1.5 font-label text-xs text-ltl-text-secondary">
                    <Clock className="size-3.5" aria-hidden />
                    {article.readTime}
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
