"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageAlt: string;
}

const featuredArticles: Article[] = [
  {
    id: "1",
    category: "Leadership",
    title: "Building Culture That Outlasts the Quarter",
    excerpt:
      "How top operators align teams around values that scale beyond short-term targets.",
    readTime: "8 min read",
    imageAlt: "Leadership culture article cover",
  },
  {
    id: "2",
    category: "Strategy",
    title: "The New Playbook for Ambitious Founders",
    excerpt:
      "Lessons from leaders who turned conviction into durable competitive advantage.",
    readTime: "6 min read",
    imageAlt: "Strategy article cover",
  },
  {
    id: "3",
    category: "Culture",
    title: "Why Great Leaders Invest in Storytelling",
    excerpt:
      "Narrative isn't soft skill — it's how modern organizations earn trust and momentum.",
    readTime: "5 min read",
    imageAlt: "Culture article cover",
  },
];

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="w-[min(85vw,22rem)] shrink-0 border-ltl-border bg-ltl-surface ring-ltl-border/50 md:w-auto">
        <div
          className="aspect-[16/10] w-full bg-gradient-to-br from-ltl-surface via-ltl-border/40 to-ltl-bg"
          role="img"
          aria-label={article.imageAlt}
        />
      <CardHeader className="gap-3">
        <Badge
          variant="outline"
          className="font-label border-ltl-accent/40 bg-ltl-accent/10 text-ltl-accent"
        >
          {article.category}
        </Badge>
        <CardTitle className="font-heading text-xl leading-snug text-ltl-text-primary">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-ltl-text-secondary">
          {article.excerpt}
        </CardDescription>
        <p className="font-label text-xs text-ltl-text-secondary">
          {article.readTime}
        </p>
      </CardContent>
    </Card>
  );
}

export function FeaturedArticles() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="border-b border-ltl-border bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
          Featured
        </h2>
        <div className="mt-8 flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
