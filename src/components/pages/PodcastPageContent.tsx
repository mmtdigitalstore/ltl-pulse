"use client";

import { motion } from "framer-motion";
import { Clock, Play } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

interface PodcastEpisode {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

const episodes: PodcastEpisode[] = [
  {
    id: "1",
    number: 48,
    title: "Culture as a Competitive Moat",
    duration: "42 min",
    description:
      "How leaders build teams that move fast without sacrificing trust.",
  },
  {
    id: "2",
    number: 47,
    title: "The Founder’s Inner Game",
    duration: "38 min",
    description:
      "Mental models for staying clear-headed when the stakes are highest.",
  },
  {
    id: "3",
    number: 46,
    title: "Building Brands People Believe In",
    duration: "51 min",
    description:
      "Authenticity, consistency, and the long arc of reputation.",
  },
  {
    id: "4",
    number: 45,
    title: "Leading Remote Teams with Intention",
    duration: "36 min",
    description:
      "Proximity isn’t culture — rituals, communication, and clarity are.",
  },
  {
    id: "5",
    number: 44,
    title: "What High Performers Need from Leaders",
    duration: "44 min",
    description:
      "Ambitious talent stays where growth, feedback, and purpose converge.",
  },
];

export function PodcastPageContent() {
  return (
    <div className="min-h-screen bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-3xl"
      >
        <PageHeader
          title="LTL Conversations"
          subtitle="The flagship podcast — leaders shaping culture, one conversation at a time."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 space-y-4"
        >
          {episodes.map((episode) => (
            <motion.div key={episode.id} variants={staggerItem}>
              <Card className="border-ltl-border bg-ltl-surface ring-ltl-border/50">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
                      Episode {episode.number}
                    </p>
                    <CardTitle className="font-heading text-xl text-ltl-text-primary">
                      {episode.title}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-full bg-ltl-accent text-ltl-bg hover:bg-ltl-accent-hover hover:text-ltl-bg"
                    aria-label={`Play episode ${episode.number}`}
                  >
                    <Play className="size-4 fill-current" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-ltl-text-secondary">
                    {episode.description}
                  </CardDescription>
                  <p className="flex items-center gap-1.5 font-label text-xs text-ltl-text-secondary">
                    <Clock className="size-3.5" aria-hidden />
                    {episode.duration}
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
