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
  lane,
  tagline,
  credentials,
  photo,
  children,
  className,
  compact = false,
  isFocused = false,
}: {
  id?: string;
  name: string;
  role?: string;
  lane?: string;
  tagline?: string;
  credentials?: string;
  photo?: { src: string; alt: string };
  children: ReactNode;
  className?: string;
  compact?: boolean;
  isFocused?: boolean;
}) {
  return (
    <article
      id={id}
      aria-current={isFocused ? "true" : undefined}
      className={cn(
        "flex h-full scroll-mt-24 flex-col space-y-4 rounded-xl border border-ltl-border bg-ltl-surface p-6 md:p-7 transition-[border-color,box-shadow,opacity] duration-300",
        className,
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          compact ? "flex-col" : "flex-col sm:flex-row sm:items-start",
        )}
      >
        {photo ? (
          <ExpertPhoto
            src={photo.src}
            alt={photo.alt}
            name={name}
            size={compact ? "sm" : "md"}
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "font-heading font-semibold text-ltl-text-primary",
              compact ? "text-lg md:text-xl" : "text-xl md:text-2xl",
            )}
          >
            {name}
          </h3>
          {role ? (
            <p className="mt-1 font-label text-xs uppercase tracking-wider text-ltl-accent">
              {role}
            </p>
          ) : null}
          {lane ? (
            <p className="mt-2 text-sm font-medium leading-snug text-ltl-text-primary">
              {lane}
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
  const focusedExpert = useHashExpertFocus();

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

        <Section title="Who LTL Pulse is for">
          <p>
            LTL Pulse is built for growing service businesses and the coaches who
            guide them. We help you keep your best people, win and keep loyal
            customers, build a client-flow that&apos;s steady instead of
            feast-or-famine, and lead a team that delivers — with practical content
            and on-demand access to real experts.
          </p>
        </Section>

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
            Four lanes — each maps to a problem owners and coaches actually face. Start
            with the expert whose &ldquo;can help you when&rdquo; list sounds like you.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8"
          >
            <motion.div
              variants={staggerItem}
              className={expertFocusWrapperClass("dawn", focusedExpert)}
            >
              <TeamMemberCard
                id="dawn"
                name="Dawn Kirk, M.Ed."
                role={experts.dawn.title}
                lane={experts.dawn.homepageLane}
                photo={EXPERT_PHOTOS.dawn}
                compact
                isFocused={focusedExpert === "dawn"}
                className={expertFocusCardClass("dawn", focusedExpert)}
              >
                <p className="font-medium text-ltl-text-primary">
                  Dawn helps owners and coaches keep their best people, get found and
                  chosen online, and turn feast-or-famine into a steady client-flow
                  system. She starts with a digital footprint diagnostic, then builds the
                  pipeline and people systems that make growth repeatable — not another
                  season of hustle.
                </p>
                <p className="text-xs italic leading-relaxed text-ltl-text-secondary md:text-sm">
                  Maxwell Leadership Certified at the Executive Director level ·
                  Cornell-certified in project leadership and systems design · Executive
                  MBA candidate · WebScore digital analyst · Contributing author,
                  Transforming Pain Into Purpose (Vol. 1) · Founder of Market My Training
                  Solutions · 30+ years across Bermuda and the Caribbean.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Dawn can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      Your revenue is feast-or-famine because winning clients lives in
                      your head, not a system
                    </li>
                    <li>
                      You&apos;re hard to find online — your listings, reviews, and social
                      presence aren&apos;t bringing clients
                    </li>
                    <li>
                      Your best people keep leaving — and you&apos;re not sure why
                    </li>
                    <li>
                      You were great at the work, got promoted, and were never taught to
                      lead people
                    </li>
                    <li>
                      You want your brand and client relationships to bring repeat
                      business, not just look good
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  WebScore digital audit · ClientFlow systems · Brand &amp; client
                  strategy · People &amp; culture · Talent retention · Leadership
                  development
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className={expertFocusWrapperClass("jackie", focusedExpert)}
            >
              <TeamMemberCard
                id="jackie"
                name="Jackie John, R.Eng., MSc"
                role={experts.jackie.title}
                lane={experts.jackie.homepageLane}
                photo={EXPERT_PHOTOS.jackie}
                compact
                isFocused={focusedExpert === "jackie"}
                className={expertFocusCardClass("jackie", focusedExpert)}
              >
                <p className="font-medium text-ltl-text-primary">
                  Jackie helps service businesses stop losing customers to inconsistent
                  service and turn teams that talk past each other into teams that
                  deliver. He works through the Maxwell DISC method and his own
                  framework,{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    Think. Lead. Influence. Deliver.
                  </span>
                </p>
                <p className="text-xs italic leading-relaxed text-ltl-text-secondary md:text-sm">
                  Maxwell Leadership Certified DISC Coach &amp; Consultant · Registered
                  Engineer (R.Eng.), MSc · Founder of New Version Coaching &amp;
                  Consulting · 30+ years blending technical rigor with deep human insight.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Jackie can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      You&apos;re losing customers to inconsistent frontline service
                    </li>
                    <li>
                      Your team talks past each other and it&apos;s costing you in errors
                      and friction
                    </li>
                    <li>
                      You&apos;re a technical owner who now has to lead people, not just
                      do the work
                    </li>
                    <li>
                      You want to understand what makes each team member tick (DISC) and
                      lead them well
                    </li>
                    <li>
                      You need to turn a group of individuals into a team that actually
                      delivers
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Customer experience · Communication &amp; team dynamics · Maxwell
                  DISC · Self-awareness &amp; influence · Coaching
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className={expertFocusWrapperClass("lashley", focusedExpert)}
            >
              <TeamMemberCard
                id="lashley"
                name="Sylvan A. Lashley, Ed.D., J.D., MBA"
                role={experts.lashley.title}
                lane={experts.lashley.homepageLane}
                photo={EXPERT_PHOTOS.lashley}
                compact
                isFocused={focusedExpert === "lashley"}
                className={expertFocusCardClass("lashley", focusedExpert)}
              >
                <p className="font-medium text-ltl-text-primary">
                  Sylvan helps owners scale without the chaos — building the structure,
                  accountability, and financial durability a growing business needs when
                  everything still runs through you. He brings institutional-grade
                  discipline to growing companies.
                </p>
                <p className="text-xs italic leading-relaxed text-ltl-text-secondary md:text-sm">
                  A three-time president of large, complex organizations with a track
                  record of turnaround and growth — including 300% organizational growth
                  and $1.75M secured — plus a Juris Doctor and Doctor of Education.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Sylvan can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      You&apos;re growing but it&apos;s chaos — everything still runs
                      through you
                    </li>
                    <li>
                      You need clear roles, decision rights, and accountability as the
                      team gets bigger
                    </li>
                    <li>
                      You want growth that&apos;s financially durable, not just busy
                    </li>
                    <li>
                      You&apos;re navigating a big change — expansion, restructure, a
                      turnaround — and need it to hold
                    </li>
                    <li>
                      You&apos;ve outgrown &quot;winging it&quot; and need real operating
                      structure
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Scaling with structure · Roles, decision rights &amp; accountability ·
                  Financial durability · Leading change &amp; turnarounds · Governance
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className={expertFocusWrapperClass("joshua", focusedExpert)}
            >
              <TeamMemberCard
                id="joshua"
                name="Joshua Ogbonnia, CVO"
                role={experts.joshua.title}
                lane={experts.joshua.homepageLane}
                photo={EXPERT_PHOTOS.joshua}
                compact
                isFocused={focusedExpert === "joshua"}
                className={expertFocusCardClass("joshua", focusedExpert)}
              >
                <p className="font-medium text-ltl-text-primary">
                  Joshua helps owners break through plateaus by reinventing the business
                  itself — adopting the right tech and AI, launching new offerings and
                  models, and scaling what works. A serial entrepreneur, he brings a
                  builder&apos;s playbook to businesses ready for their next stage. Dawn
                  focuses on getting found and chosen; Joshua on modernizing how the
                  business runs and grows.
                </p>
                <p className="text-xs italic leading-relaxed text-ltl-text-secondary md:text-sm">
                  Founder &amp; Chief Vision Officer of E Skool Now Group and founder/leader
                  of multiple ventures across technology, media, and education — an
                  award-winning innovator and future-ready voice.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Joshua can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      Your business has plateaued and you need fresh ideas and new ways to
                      grow
                    </li>
                    <li>
                      You know you should be using tech and AI but don&apos;t know where to
                      start
                    </li>
                    <li>
                      You want to launch a new offering, model, or revenue stream
                    </li>
                    <li>
                      You want to modernize how you operate without losing what makes you{" "}
                      <em>you</em>
                    </li>
                    <li>
                      You&apos;re an entrepreneur who wants a peer who&apos;s actually built
                      and scaled ventures
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Entrepreneurship &amp; venture building · Tech &amp; AI adoption · New
                  offerings &amp; business models · Business transformation · Future-ready
                  leadership
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
