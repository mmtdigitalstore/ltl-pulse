"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";

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

interface VlogItem {
  id: string;
  title: string;
  duration: string;
  isPremium: boolean;
}

const vlogs: VlogItem[] = [
  {
    id: "1",
    title: "Inside the Room: Board-Level Decisions",
    duration: "12:40",
    isPremium: true,
  },
  {
    id: "2",
    title: "Founder Mindset Under Pressure",
    duration: "9:15",
    isPremium: false,
  },
  {
    id: "3",
    title: "Building Teams That Last",
    duration: "14:02",
    isPremium: true,
  },
  {
    id: "4",
    title: "Culture on the Ground Floor",
    duration: "11:28",
    isPremium: false,
  },
  {
    id: "5",
    title: "The Long Game of Leadership",
    duration: "16:55",
    isPremium: true,
  },
  {
    id: "6",
    title: "Storytelling for Operators",
    duration: "8:47",
    isPremium: false,
  },
];

interface VlogsPageContentProps {
  isSubscriber: boolean;
}

export function VlogsPageContent({ isSubscriber }: VlogsPageContentProps) {
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
          title="Vlogs"
          subtitle="Visual stories from the field."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {vlogs.map((vlog) => {
            const isLocked = vlog.isPremium && !isSubscriber;

            return (
              <motion.div key={vlog.id} variants={staggerItem}>
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
                      {vlog.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-lg text-ltl-text-primary">
                      {vlog.title}
                    </CardTitle>
                  </CardHeader>
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
