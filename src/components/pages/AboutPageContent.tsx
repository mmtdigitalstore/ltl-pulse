"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Mic, Video } from "lucide-react";

import { AboutExpertCard } from "@/components/about/AboutExpertCard";
import { HearFromLeadersSection } from "@/components/about/HearFromLeadersSection";
import { CadenceIcon } from "@/components/concierge/CadenceIcon";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { EXPERT_PHOTOS } from "@/data/expert-photos.config";
import { experts, type ExpertId } from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import {
  expertFocusCardClass,
  expertFocusWrapperClass,
} from "@/lib/navigation/expert-focus";
import { useHashExpertFocus } from "@/lib/navigation/use-hash-expert-focus";
import { useHashScroll } from "@/lib/navigation/use-hash-scroll";
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
    title: "Lead & Keep Your People",
    description:
      "Workshops and retreats for owners on leading, developing, and retaining a team that performs — so your best people stay and grow.",
  },
  {
    title: "Systems That Scale",
    description:
      "Turning your business into repeatable systems — client-flow, operations, and accountability — so growth doesn't all run through you.",
  },
  {
    title: "Future-Ready & Digital",
    description:
      "Modernizing with tech and AI, and preparing your team for the changing world of work.",
  },
] as const;

const aboutPanelClass =
  "ltl-theme-magazine ltl-media-container rounded-xl p-8 md:p-10";

const trustBadges =
  "Maxwell Leadership Certified team · Cornell-certified · Google certified · 3 published authors · 100+ years of combined leadership experience";

const aboutExpertOrder: ExpertId[] = ["dawn", "jackie", "lashley", "joshua"];

const aboutExpertDetails: Record<
  ExpertId,
  {
    displayName: string;
    credentials: string;
    canHelpWhen: string[];
    specialties: ReactNode;
    positioning: ReactNode;
  }
> = {
  dawn: {
    displayName: "Dawn Kirk, M.Ed.",
    credentials:
      "Maxwell Leadership Certified Independent Executive Director · Cornell-certified in project leadership and systems design · Executive MBA candidate · WebScore digital analyst · Contributing author, Transforming Pain Into Purpose (Vol. 1) · Founder of Market My Training Solutions · 30+ years across Bermuda and the Caribbean.",
    canHelpWhen: [
      "Revenue spikes and stalls — you win clients from hustle, not a system",
      "You're invisible online — listings, reviews, and social aren't filling your pipeline",
      "Good people keep walking out — and you can't pin down why",
      "You were promoted for doing the work — nobody taught you to lead the team",
      "You want your brand and client relationships to bring repeat business, not just look good",
    ],
    specialties:
      "WebScore digital audit · ClientFlow systems · Brand & client strategy · People & culture · Talent retention · Leadership development",
    positioning: (
      <>
        Dawn helps owners and coaches keep their best people, get found and chosen online, and
        turn feast-or-famine into a steady client-flow system. She starts with a digital
        footprint diagnostic, then builds the pipeline and people systems that make growth
        repeatable — not another season of hustle.
      </>
    ),
  },
  jackie: {
    displayName: "Jackie John, R.Eng., MSc",
    credentials:
      "Maxwell Leadership Certified DISC Coach & Consultant · Registered Engineer (R.Eng.), MSc · Founder of New Version Coaching & Consulting · Contributing author, Transforming Pain Into Purpose (Vol. 3) · 30+ years blending technical rigor with deep human insight.",
    canHelpWhen: [
      "You're losing customers to inconsistent frontline service",
      "Your team talks past each other and it's costing you in errors and friction",
      "You're a technical owner who now has to lead people, not just do the work",
      "You want to understand what makes each team member tick (DISC) and lead them well",
      "You need to turn a group of individuals into a team that actually delivers",
    ],
    specialties:
      "Customer experience · Communication & team dynamics · Maxwell DISC · Self-awareness & influence · Coaching",
    positioning: (
      <>
        Jackie helps service businesses stop losing customers to inconsistent service and turn
        teams that talk past each other into teams that deliver. He works through the Maxwell
        DISC method and his own framework,{" "}
        <span className="font-heading font-semibold text-ltl-accent">
          Think. Lead. Influence. Deliver.
        </span>
      </>
    ),
  },
  lashley: {
    displayName: "Sylvan A. Lashley, Ed.D., J.D., MBA",
    credentials:
      "A three-time president of large, complex organizations with a track record of turnaround and growth — including 300% organizational growth and $1.75M secured — plus a Juris Doctor and Doctor of Education · Contributing author, Steps to Good Governance · 30+ years guiding K–12 systems, universities, and institutions.",
    canHelpWhen: [
      "You're growing but it's chaos — everything still runs through you",
      "You need clear roles, decision rights, and accountability as the team gets bigger",
      "You want growth that's financially durable, not just busy",
      "You're navigating a big change — expansion, restructure, a turnaround — and need it to hold",
      "You've outgrown \"winging it\" and need real operating structure",
    ],
    specialties:
      "Scaling with structure · Roles, decision rights & accountability · Financial durability · Leading change & turnarounds · Governance",
    positioning: (
      <>
        Sylvan helps owners scale without the chaos — building the structure, accountability,
        and financial durability a growing business needs when everything still runs through
        you. He brings institutional-grade discipline to growing companies.
      </>
    ),
  },
  joshua: {
    displayName: "Joshua Ogbonnia, CVO",
    credentials:
      "Google certified · Founder & Chief Vision Officer of E Skool Now Group and founder/leader of multiple ventures across technology, media, and education — an award-winning innovator and future-ready voice.",
    canHelpWhen: [
      "Your business has plateaued and you need fresh ideas and new ways to grow",
      "You know you should be using tech and AI but don't know where to start",
      "You want to launch a new offering, model, or revenue stream",
      "You want to modernize how you operate without losing what makes you you",
      "You're an entrepreneur who wants a peer who's actually built and scaled ventures",
    ],
    specialties:
      "Entrepreneurship & venture building · Tech & AI adoption · New offerings & business models · Business transformation · Future-ready leadership",
    positioning: (
      <>
        Joshua helps owners break through plateaus by reinventing the business itself — adopting
        the right tech and AI, launching new offerings and models, and scaling what works. A
        serial entrepreneur, he brings a builder&apos;s playbook to businesses ready for their
        next stage. Dawn focuses on getting found and chosen; Joshua on modernizing how the
        business runs and grows.
      </>
    ),
  },
};

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

export function AboutPageContent() {
  useHashScroll();
  const focusedExpert = useHashExpertFocus();

  return (
    <div className="ltl-theme-platform ltl-blackblue-atmosphere ltl-section-glow ltl-glow-editorial min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
          className={cn("relative max-w-3xl", aboutPanelClass)}
        >
          <p className="font-label text-xs uppercase tracking-[0.2em] text-ltl-accent">
            About
          </p>
          <PageHeader
            title="LTL Pulse"
            subtitle="Where leadership meets culture."
          />
          <p className="relative mt-8 border-l border-ltl-border pl-6 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            LTL Pulse is the media and intelligence hub of{" "}
            <a
              href="https://lead.mmti.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ltl-text-primary underline decoration-ltl-brand/30 underline-offset-2 hover:text-ltl-text-primary"
            >
              Let&apos;s Talk Leadership with MMTI
            </a>{" "}
            — premium podcasts, magazine articles, vlogs, and an AI concierge built
            for ambitious leaders. We exist to help you grow people, strengthen your
            organization, and navigate change with confidence.
          </p>
        </motion.div>

        <Section title="Who LTL Pulse is for" className={aboutPanelClass}>
          <p>
            LTL Pulse is built for growing service businesses and the coaches who
            guide them. We help you keep your best people, win and keep loyal
            customers, build a client-flow that&apos;s steady instead of
            feast-or-famine, and lead a team that delivers — with practical content
            and on-demand access to real experts.
          </p>
        </Section>

        <Section title="Our vision" accentTitle className={aboutPanelClass}>
          <p>Future-ready leadership, everywhere Let&apos;s Talk Leadership goes.</p>
        </Section>

        <Section title="Our mission" className={aboutPanelClass}>
          <p>
            We create conversations, content, and experiences that help leaders grow
            people, strengthen institutions, and navigate change with confidence.
          </p>
        </Section>

        <Section
          title="What makes us different: future-ready leadership"
          className={aboutPanelClass}
        >
          <p>
            Most leadership content prepares you for yesterday. We prepare you for
            the next decade. Every conversation, article, and tool at LTL Pulse
            carries a future-ready lens — grounded in timeless leadership
            principles, sharpened by the realities of AI and the changing world of
            work. It&apos;s leadership for what&apos;s coming, not just what&apos;s
            been.
          </p>
        </Section>

        <Section title="Our story" className={aboutPanelClass}>
          <p>
            LTL Pulse didn&apos;t start as a platform — it started as a conversation. During the
            pandemic, Dawn Kirk found her way onto Clubhouse and did what good leaders do first:
            she listened. She learned the terrain, made genuine friends, and found her voice — and
            only then noticed what was missing: nowhere for leaders to gather. So she created it,
            convening with Dr. Sylvan Lashley and a founding partner who has since stepped away
            for personal reasons, and later joined by Jackie John and Joshua Ogbonnia. Together
            they launched <em>Let&apos;s Talk Leadership</em>, a twice-weekly room where curious
            visitors became guests, co-hosts, and friends. When the world reopened, the live rooms
            quieted, but the mission didn&apos;t: the Let&apos;s Talk Leadership website still
            runs today. LTL Pulse is its media and intelligence hub — those same conversations,
            now always on: premium content, candid dialogue, and real experts, for leaders who
            refuse to lead like it&apos;s still yesterday.
          </p>
        </Section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFadeUp}
          className={cn("mt-16 md:mt-20", aboutPanelClass)}
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
            Four lanes — each maps to a problem owners and coaches actually face. Start
            with the expert best suited to what you&apos;re facing.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={sectionFadeUp}
            className="ltl-theme-magazine ltl-media-container mt-8 rounded-xl px-5 py-5 md:px-6 md:py-6"
          >
            <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
              The credibility behind LTL Pulse
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-ltl-text-primary md:text-base">
              {trustBadges}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8"
          >
            {aboutExpertOrder.map((id) => {
              const detail = aboutExpertDetails[id];

              return (
                <motion.div
                  key={id}
                  variants={staggerItem}
                  className={expertFocusWrapperClass(id, focusedExpert)}
                >
                  <AboutExpertCard
                    id={id}
                    displayName={detail.displayName}
                    role={experts[id].title}
                    lane={experts[id].homepageLane ?? experts[id].tagline}
                    positioning={detail.positioning}
                    credentials={detail.credentials}
                    canHelpWhen={detail.canHelpWhen}
                    specialties={detail.specialties}
                    photo={EXPERT_PHOTOS[id]}
                    isFocused={focusedExpert === id}
                    className={expertFocusCardClass(id, focusedExpert)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </Section>

        <HearFromLeadersSection onPlatform />

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
                className="ltl-theme-magazine ltl-media-container rounded-lg p-5 md:p-6"
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
          className="ltl-theme-magazine ltl-media-container mt-16 rounded-xl p-8 text-center md:mt-20 md:p-12"
        >
          <CadenceIcon className="mx-auto size-10" />
          <h2 className="mt-4 font-heading text-2xl font-semibold text-ltl-text-primary md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ltl-text-secondary md:text-lg">
            Tell Cadence what&apos;s costing you most — she&apos;ll point you to the right
            expert and the right next step.
          </p>
          <Link
            href="/concierge"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex h-12 min-w-[12rem] rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
            )}
          >
            Talk to Cadence
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
