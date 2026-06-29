"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Mic, Sparkles, Video } from "lucide-react";

import { CadenceIcon } from "@/components/concierge/CadenceIcon";
import { ExpertPhoto } from "@/components/team/ExpertPhoto";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { EXPERT_PHOTOS } from "@/data/expert-photos.config";
import { experts } from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useHashScroll } from "@/lib/navigation/use-hash-scroll";

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
    title: "Free conversations",
    description:
      "LTL Conversations — problem-led podcasts mapped to what owners and coaches face most. Start here, no paywall.",
  },
  {
    title: "Magazine & vlogs",
    description:
      "Deeper playbooks and tactical video when a 10-minute listen surfaces a problem worth solving properly.",
  },
  {
    title: "Cadence + expert routing",
    description:
      "Your AI concierge points you to the right consultant and content — then you choose how personal to go.",
  },
  {
    title: "Challenges & advisory",
    description:
      "Structured 3, 5, and 7-day leadership challenges (coming soon) and live engagements when you're ready for hands-on work.",
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
  id,
  name,
  role,
  tagline,
  credentials,
  photo,
  children,
  className,
}: {
  id?: string;
  name: string;
  role?: string;
  tagline?: string;
  credentials?: string;
  photo?: { src: string; alt: string };
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      id={id}
      className={cn(
        "flex h-full scroll-mt-24 flex-col space-y-4 rounded-xl border border-ltl-border bg-ltl-surface p-6 md:p-7",
        className,
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {photo ? (
          <ExpertPhoto src={photo.src} alt={photo.alt} name={name} size="md" />
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl">
            {name}
          </h3>
          {role ? (
            <p className="mt-1 font-label text-xs uppercase tracking-wider text-ltl-accent">
              {role}
            </p>
          ) : null}
          {credentials ? (
            <p className="mt-3 text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
              {credentials}
            </p>
          ) : null}
          {tagline ? (
            <p className="mt-2 text-sm leading-relaxed text-ltl-text-secondary">
              {tagline}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
        {children}
      </div>
    </article>
  );
}

export function AboutPageContent() {
  useHashScroll();

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
            <motion.div variants={staggerItem} className="md:col-span-2">
              <TeamMemberCard
                id="dawn"
                name="Dawn Kirk, M.Ed."
                role={experts.dawn.title}
                tagline={experts.dawn.tagline}
                photo={EXPERT_PHOTOS.dawn}
                credentials="Maxwell Certified Independent Executive Director · WebScore Analyst · Cornell-certified in project leadership & systems design · Executive MBA candidate · Co-author, Transforming Pain Into Purpose (Volume 1) · Founder, Market My Training Solutions"
              >
                <p>
                  As Team Lead of LTL Pulse, Dawn Kirk believes leadership and culture
                  are inseparable — the conviction behind everything the platform publishes.
                  A Maxwell Certified Independent Executive Director, Cornell-trained in
                  systems design,
                  and founder of Market My Training Solutions, she brings 30+ years across
                  Bermuda and the Caribbean to one purpose: leaders who perform and cultures
                  that endure.
                </p>
                <p>
                  Her client-flow work starts with{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    WebScore
                  </span>
                  — a diagnostic that measures your digital footprint before prescribing
                  fixes. Inside the{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    THRIVE
                  </span>{" "}
                  framework, feast-or-famine becomes repeat business. Her{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    E.A.R.N.
                  </span>{" "}
                  model ties people, culture, and client relationships into one system.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Dawn can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Your best people are leaving and you&apos;re not sure why</li>
                    <li>
                      Revenue is feast-or-famine — start with a WebScore read, then build
                      the client-flow system behind it
                    </li>
                    <li>
                      You were promoted for doing the work, but nobody taught you to lead
                      people
                    </li>
                    <li>
                      Your leadership team is technically strong but isn&apos;t truly
                      leading
                    </li>
                    <li>
                      You need culture and retention to hold during restructure or growth
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Leadership development · Culture &amp; retention · WebScore diagnostics ·
                  THRIVE client-flow systems · AI-enabled pipeline ops · Doer-to-leader
                  transitions
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem} className="md:col-span-2">
              <TeamMemberCard
                id="lashley"
                name="Sylvan A. Lashley, Ed.D., J.D."
                role={experts.lashley.title}
                tagline={experts.lashley.tagline}
                photo={EXPERT_PHOTOS.lashley}
                credentials="Three-time university president (Northern Caribbean University, University of the Southern Caribbean, Atlantic Union College) · Former K–12 superintendent and principal · J.D., Ed.D., M.E.L., MBA · Faculty in Education Law & Special Education Law"
              >
                <p>
                  Dr. Sylvan Lashley helps owners who are growing but running on
                  chaos — when decisions, approvals, and firefighting still bottleneck
                  at you. A three-time university president and former K–12
                  superintendent, he translates large-scale structure, accountability,
                  and financial durability into growing service businesses and
                  institutions that need to scale without the mess.
                </p>
                <p>
                  A legal scholar as much as an executive, he has led through
                  enrollment shifts, accreditation, governance, and financial pressure
                  — with measurable results including 300% organizational growth, 69%
                  gains in student achievement, and $1.75 million in grant funding
                  secured. Structure and sustainability, without the jargon.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Dr. Lashley can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      You&apos;re growing but it&apos;s chaos — work still runs
                      through you
                    </li>
                    <li>
                      You need clear roles, decision rights, and accountability as
                      you scale
                    </li>
                    <li>
                      Financial durability, grants, or sustainability are on the
                      line
                    </li>
                    <li>
                      Your board or governance structure needs strengthening
                    </li>
                    <li>
                      You face education law, compliance, or institutional
                      transformation questions
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Scaling &amp; structure · Accountability systems · Financial
                  sustainability · Governance · Institutional transformation ·
                  Education law
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem} className="md:col-span-2">
              <TeamMemberCard
                id="jackie"
                name="Jackie John, R.Eng., MSc"
                role={experts.jackie.title}
                tagline={experts.jackie.tagline}
                photo={EXPERT_PHOTOS.jackie}
                credentials="Maxwell Leadership Certified DISC Coach & Consultant · Registered Engineer (R.Eng.), MSc, BSc, MAPETT · Founder of New Version Coaching & Consulting (NVCC) · Leads Jameri Consultants, BuildSafe Caribbean & Sargassum Solutions"
              >
                <p>
                  Jackie John develops leaders who think clearly, lead boldly, and deliver
                  results that matter — the future-ready leadership at the heart of everything
                  LTL Pulse publishes. A Maxwell Leadership Certified DISC Coach and
                  Consultant with more than 30 years across engineering, project management,
                  and organizational leadership in Trinidad and Tobago and the wider Caribbean,
                  he blends technical rigor with deep human insight.
                </p>
                <p>
                  Through New Version Coaching &amp; Consulting (NVCC), Jackie helps
                  individuals, teams, and organizations unlock their behavioral strengths,
                  bridge communication gaps, and build the self-awareness sustained
                  leadership demands — guided by the Maxwell DISC Method and his own
                  framework,{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    Think. Lead. Influence. Deliver.
                  </span>{" "}
                  A Registered Engineer and entrepreneur, he also leads Jameri Consultants
                  Limited, BuildSafe Caribbean, and Sargassum Solutions Limited. Leadership
                  for what&apos;s coming, not just what&apos;s been.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Jackie can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      Your team talks past each other and communication is costing you
                      results
                    </li>
                    <li>
                      Your leaders are technically strong but struggle with people,
                      influence, and self-awareness
                    </li>
                    <li>
                      You want to map behavioral strengths across a team and lead each
                      person well (DISC)
                    </li>
                    <li>
                      You&apos;re a technical professional stepping into leadership and need
                      to lead, not just manage
                    </li>
                    <li>
                      You need to turn individual talent into a team that actually delivers
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Leadership development · Maxwell DISC / behavioral coaching ·
                  Communication &amp; team dynamics · Self-awareness &amp; influence ·
                  Engineering &amp; project leadership · Coaching &amp; consulting
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem} className="md:col-span-2">
              <TeamMemberCard
                id="joshua"
                name="Joshua Ogbonnia, CVO"
                role={experts.joshua.title}
                tagline={experts.joshua.tagline}
                photo={EXPERT_PHOTOS.joshua}
                credentials="Founder & Chief Vision Officer, E Skool Now Group · Founder & President, Global Educators Tribe (GET) · Chancellor, Tech Skool Educational Institution · CEO, Agric Shift · Serial entrepreneur across education, media & AgTech"
              >
                <p>
                  Joshua Ogbonnia is LTL Pulse&apos;s voice for the{" "}
                  <span className="font-medium text-ltl-text-primary">
                    venture and innovation layer
                  </span>{" "}
                  — when growth has plateaued at the market level and you need
                  repositioning, a new digital offer, or an innovation strategy for what&apos;s
                  next. A serial entrepreneur, he builds and scales ventures across
                  education, media, and AgTech — focusing on market-level pivots, new
                  ventures, and strategic AI adoption when the game itself has changed.
                </p>
                <p>
                  Through E Skool Now Group, the Global Educators Tribe, Tech Skool, and
                  Agric Shift, he has delivered award-winning digital solutions and
                  venture-building across Africa and beyond — for founders and operators
                  who need a new market play, not just a better follow-up system.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Joshua can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      Your business has plateaued — you need market repositioning or a new
                      digital offer, not just more pipeline activity
                    </li>
                    <li>
                      You&apos;re launching or scaling a venture in education, media, edtech,
                      or AgTech
                    </li>
                    <li>
                      AI and tech shifts require an innovation strategy for your offer or
                      venture — not a CRM cleanup
                    </li>
                    <li>
                      You need entrepreneurial lenses for competing in a market that already
                      moved
                    </li>
                    <li>
                      You want practical innovation and AI adoption you can apply this
                      quarter — at the venture level
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Venture repositioning · Innovation strategy · EdTech &amp; product growth ·
                  Entrepreneurship · Strategic AI adoption · Market-level transformation
                </p>
              </TeamMemberCard>
            </motion.div>
          </motion.div>
        </Section>

        <Section title="Experiences & programs">
          <p>
            Leadership isn&apos;t only something you watch or read — it&apos;s
            something you practice. The path on LTL Pulse is simple: listen free,
            go deeper when it&apos;s useful, get routed to a human when it
            matters, and practice in structured experiences when you&apos;re
            ready.
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
