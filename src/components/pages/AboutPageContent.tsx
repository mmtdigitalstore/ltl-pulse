"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
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

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Founder & Editor-in-Chief",
  },
  {
    id: "2",
    name: "Jordan Lee",
    role: "Head of Podcast",
  },
  {
    id: "3",
    name: "Sam Okonkwo",
    role: "Creative Director",
  },
];

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="mx-auto max-w-4xl"
      >
        <PageHeader
          title="About LTL Pulse"
          subtitle="Where leadership meets culture."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
          className="mt-12 space-y-4 text-base leading-relaxed text-ltl-text-secondary md:text-lg"
        >
          <p>
            LTL Pulse was founded on a simple belief: the best leaders don&apos;t
            just drive results — they shape culture. We publish the stories,
            conversations, and visual narratives that help ambitious operators
            think bigger, lead better, and build organizations that last.
          </p>
          <p>
            From long-form magazine features to candid podcast interviews and
            field vlogs, every piece of LTL Pulse content is designed to give
            you perspective you can act on.
          </p>
        </motion.div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold text-ltl-text-primary md:text-3xl">
            Our Team
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-8 grid gap-6 sm:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={staggerItem}>
                <Card className="border-ltl-border bg-ltl-surface text-center ring-ltl-border/50">
                  <CardHeader className="items-center gap-4">
                    <div className="flex size-16 items-center justify-center rounded-full border border-ltl-border bg-ltl-bg text-ltl-accent">
                      <User className="size-7" aria-hidden />
                    </div>
                    <CardTitle className="font-heading text-lg text-ltl-text-primary">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="font-label text-xs uppercase tracking-wider text-ltl-accent">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-ltl-text-secondary">
                      Building media for leaders who care about culture as much
                      as outcomes.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
          className="mt-16 rounded-xl border border-ltl-border bg-ltl-surface p-8 md:p-10"
        >
          <h2 className="font-heading text-2xl font-semibold text-ltl-accent md:text-3xl">
            Our Mission
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            To equip ambitious leaders with premium editorial, audio, and visual
            content that bridges leadership and culture — helping them make
            better decisions, build stronger teams, and leave a lasting impact.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
}
