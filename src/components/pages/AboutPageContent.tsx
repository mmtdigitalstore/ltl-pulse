"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Mic, Sparkles, Video } from "lucide-react";

import { CadenceIcon } from "@/components/concierge/CadenceIcon";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const whatsInside = [
  {
    icon: Mic,
    title: "Podcasts",
    description:
      "Candid conversations with leaders on culture, strategy, and growth.",
  },
  {
    icon: BookOpen,
    title: "Magazine",
    description: "Deep-dive articles for operators who think long-term.",
  },
  {
    icon: Video,
    title: "Vlogs",
    description: "Premium video for leaders who want to go deeper.",
  },
  {
    cadence: true,
    title: "AI Concierge",
    description:
      "Practical, in-the-moment leadership guidance, on demand.",
  },
] as const;

const experienceTracks = [
  {
    title: "Leadership Core",
    description:
      "Leading people and institutions: retreats for growing businesses, leadership days for school and college leaders, and executive off-sites.",
  },
  {
    title: "Systems & Execution",
    description:
      "Turning leadership into execution and operational excellence, especially in technical and regulated environments.",
  },
  {
    title: "Future Talent & Digital",
    description:
      "Preparing the next generation and today's workforce for the future of work, from school leaders to early-career hires.",
  },
] as const;

function Section({
  title,
  children,
  className,
  accentTitle = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  accentTitle?: boolean;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className={cn("mt-16 md:mt-20", className)}
    >
      <h2
        className={cn(
          "font-heading text-2xl font-semibold md:text-3xl",
          accentTitle ? "text-ltl-accent" : "text-ltl-text-primary",
        )}
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
        {children}
      </div>
    </motion.section>
  );
}

function TeamMemberCard({
  name,
  role,
  children,
  className,
}: {
  name: string;
  role?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col space-y-4 rounded-xl border border-ltl-border bg-ltl-surface p-6 md:p-7",
        className,
      )}
    >
      <div>
        <h3 className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl">
          {name}
        </h3>
        {role ? (
          <p className="mt-1 font-label text-xs uppercase tracking-wider text-ltl-accent">
            {role}
          </p>
        ) : null}
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
        {children}
      </div>
    </article>
  );
}

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
        >
          <PageHeader
            title="About LTL Pulse"
            subtitle="Where leadership meets culture."
          />
          <p className="mt-8 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            LTL Pulse is the media and intelligence hub of Let&apos;s Talk Leadership
            — premium podcasts, magazine articles, vlogs, and an AI concierge built
            for ambitious leaders. We exist to help you grow people, strengthen your
            organization, and navigate change with confidence.
          </p>
        </motion.div>

        <Section title="Our vision" accentTitle>
          <p>Future-ready leadership, everywhere Let&apos;s Talk Leadership goes.</p>
        </Section>

        <Section title="Our mission">
          <p>
            We create conversations, content, and experiences that help leaders grow
            people, strengthen institutions, and navigate change with confidence.
          </p>
        </Section>

        <Section title="What makes us different: future-ready leadership">
          <p>
            Most leadership content prepares you for yesterday. We prepare you for
            the next decade. Every conversation, article, and tool at LTL Pulse
            carries a future-ready lens — grounded in timeless leadership
            principles, sharpened by the realities of AI and the changing world of
            work. It&apos;s leadership for what&apos;s coming, not just what&apos;s
            been.
          </p>
        </Section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
          className="mt-16 rounded-xl border border-ltl-border bg-ltl-surface p-8 md:mt-20 md:p-10"
        >
          <h2 className="font-heading text-2xl font-semibold text-ltl-text-primary md:text-3xl">
            What&apos;s inside
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-8 grid gap-8 sm:grid-cols-2"
          >
            {whatsInside.map((item) => {
              const Icon = "icon" in item ? item.icon : null;

              return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="flex gap-4"
              >
                {"cadence" in item && item.cadence ? (
                  <CadenceIcon className="size-10 shrink-0" />
                ) : Icon ? (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ltl-border bg-ltl-bg text-ltl-accent">
                    <Icon className="size-5" aria-hidden />
                  </div>
                ) : null}
                <div>
                  <h3 className="font-heading text-lg font-medium text-ltl-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <Section title="The voices behind LTL">
          <p>
            A team of seasoned leaders across coaching, higher education, industry,
            and technology — each bringing real-world depth to how we think about
            leadership.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8"
          >
            <motion.div variants={staggerItem}>
              <TeamMemberCard name="Dawn Kirk, M.Ed., EMBA" role="Lead of the LTL Team">
                <p>
                  Founder &amp; CEO of MMTS and MMTI, and a Maxwell Certified Independent
                  Executive Director, Trainer and Coach. A Cornell-educated education leader
                  with 41 years across Bermuda and the Caribbean, Dawn blends
                  entrepreneurship, digital strategy, and curriculum design to help leaders
                  develop people who perform — and cultures that endure. She serves on the
                  QUEST Board of Governors (Bermuda) and the Atlantic Union Conference
                  Curriculum Committee (seven U.S. states and Bermuda).
                </p>
                <div className="rounded-lg border border-ltl-border/80 bg-ltl-bg/60 p-4 md:p-5 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
                  <p>
                    Dawn promotes a{" "}
                    <span className="font-heading font-semibold text-ltl-accent">
                      THRIVE
                    </span>{" "}
                    system of development backed by a vision that is{" "}
                    <span className="font-heading font-semibold text-ltl-accent">
                      L.I.T.
                    </span>{" "}
                    — Lead with vision, Inspire innovation, and Transform the market. Her
                    mission is to help leaders{" "}
                    <span className="font-heading font-semibold text-ltl-accent">
                      E.A.R.N.
                    </span>{" "}
                    — Empower with strategy, Amplify their brand, Revolutionize their
                    leadership, and Nurture lasting client relationships — through values
                    that build{" "}
                    <span className="font-heading font-semibold text-ltl-accent">
                      G.R.I.T.
                    </span>{" "}
                    (Genuine integrity, Relentless innovation, Inspired empowerment, and
                    Tenacious excellence). A practical system for leading change, building
                    brand, and developing people who deliver.
                  </p>
                </div>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem}>
              <TeamMemberCard name="Dr. Sylvan A. Lashley, Ed.D., J.D.">
                <p>
                  A senior educational executive, legal scholar, and organizational
                  leader with over 30 years guiding K–12 systems, universities, and
                  institutions through transformation. A former college and university
                  president (West Indies College, Caribbean Union College, and Atlantic
                  Union College), K–12 superintendent, and principal, he has led
                  institutions through change in enrollment, academic quality,
                  governance, accreditation, and financial sustainability. He holds a
                  Juris Doctor (J.D.), Doctor of Education (Ed.D.), Master of Education
                  Law (M.E.L.), MBA, M.A. in History, and B.Ed., and teaches Education
                  Law and Special Education Law. His leadership has produced measurable
                  impact — including 300% organizational and programmatic growth, 69%
                  growth in student achievement, and $1.75 million in grant funding
                  secured.
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem}>
              <TeamMemberCard name="Jackie John, R.Eng., MSc">
                <p>
                  A Maxwell Leadership Certified DISC Coach and Consultant with a passion
                  for developing leaders who think clearly, lead boldly, and deliver
                  results that matter. With over 30 years of experience across
                  engineering, project management, and organizational leadership in
                  Trinidad and Tobago and the wider Caribbean, Jackie blends technical
                  rigor with deep human insight. Through New Version Coaching &amp;
                  Consulting (NVCC), he helps individuals, teams, and organizations
                  unlock their behavioral strengths, bridge communication gaps, and build
                  the self-awareness sustained leadership demands — guided by the Maxwell
                  DISC Method and his own framework,{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    Think. Lead. Influence. Deliver.
                  </span>{" "}
                  A Registered Engineer (R.Eng., MSc, BSc, MAPETT) and entrepreneur, he
                  also leads Jameri Consultants Limited, BuildSafe Caribbean, and
                  Sargassum Solutions Limited.
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem}>
              <TeamMemberCard name="Joshua Ogbonnia, CVO">
                <p>
                  A Nigerian serial entrepreneur and Pan-African visionary leader focused
                  on education, technology, and community development. Joshua is Founder
                  and Chief Vision Officer of E Skool Now Group, delivering
                  award-winning tech solutions, digital innovation, media, and business
                  transformation across Africa. He is Founder and President of the Global
                  Educators Tribe (GET) Organization, a global network for educators,
                  policymakers, and education changemakers; Chancellor of Tech Skool
                  Educational Institution, an institute of technology and entrepreneurship;
                  and CEO of Agric Shift, a venture in post-harvest operations and
                  agricultural education.
                </p>
              </TeamMemberCard>
            </motion.div>
          </motion.div>
        </Section>

        <Section title="Experiences & programs">
          <p>
            Leadership isn&apos;t only something you watch or read — it&apos;s
            something you practice. Our experience tracks bring LTL&apos;s expertise
            into the room with you:
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
            {experienceTracks.map((track) => (
              <li
                key={track.title}
                className="rounded-lg border border-ltl-border bg-ltl-surface p-5 md:p-6"
              >
                <h3 className="font-heading text-lg font-medium text-ltl-accent">
                  {track.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
                  {track.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
          className="mt-16 rounded-xl border border-ltl-accent/30 bg-ltl-surface p-8 text-center md:mt-20 md:p-12"
        >
          <Sparkles className="mx-auto size-8 text-ltl-accent" aria-hidden />
          <h2 className="mt-4 font-heading text-2xl font-semibold text-ltl-text-primary md:text-3xl">
            Join the Pulse
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            Get leadership insights, new episodes, and exclusive content built for
            leaders who refuse to lead like it&apos;s still yesterday.
          </p>
          <Link
            href="/subscribe"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex h-12 min-w-[12rem] rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
            )}
          >
            Subscribe
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
