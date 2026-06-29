"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
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

const teamPhotos = {
  dawn: {
    src: "/team/dawn-kirk-executive.jpg",
    alt: "Dawn Kirk, Team Lead of LTL Pulse",
  },
  lashley: {
    src: "/team/sylvan-lashley.jpg",
    alt: "Sylvan A. Lashley, Strategic Leadership Expert at LTL Pulse",
  },
  jackie: {
    src: "/team/jackie-john.jpg",
    alt: "Jackie John, Leadership and DISC Coach at LTL Pulse",
  },
  joshua: {
    src: "/team/joshua-ogbonnia.jpg",
    alt: "Joshua Ogbonnia, Entrepreneurship and Innovation Expert at LTL Pulse",
  },
} as const;

function getInitials(name: string): string {
  const primary = name.split(",")[0]?.trim() ?? name;
  return primary
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TeamMemberPhoto({ src, alt, name }: { src: string; alt: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex size-28 shrink-0 items-center justify-center rounded-xl border border-ltl-border bg-ltl-bg font-heading text-2xl font-semibold text-ltl-accent md:size-40"
        aria-hidden
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={160}
      className="size-28 shrink-0 rounded-xl border border-ltl-border object-cover object-top md:size-40"
      onError={() => setFailed(true)}
    />
  );
}

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
  credentials,
  photo,
  children,
  className,
}: {
  id?: string;
  name: string;
  role?: string;
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
        {photo ? <TeamMemberPhoto src={photo.src} alt={photo.alt} name={name} /> : null}
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
                role="Team Lead · LTL Pulse"
                photo={teamPhotos.dawn}
                credentials="Certified at the Executive Director level — the highest tier of the Maxwell Leadership Certified Team · Cornell-certified in project leadership and systems design · Executive MBA candidate · Contributing author, Transforming Pain Into Purpose (Volume 1) · Founder of Market My Training Solutions"
              >
                <p>
                  As Team Lead of LTL Pulse, Dawn Kirk believes leadership and culture
                  are inseparable — the conviction at the heart of everything the platform
                  publishes. Certified at the Executive Director level of the Maxwell
                  Leadership program, its highest tier, Cornell-certified in project
                  leadership and systems design, an Executive MBA candidate, a
                  contributing author of Transforming Pain Into Purpose, and founder of
                  Market My Training Solutions, she brings 30+ years across Bermuda and the
                  Caribbean and service on numerous boards to one purpose: helping leaders
                  develop people who perform and build cultures that endure.
                </p>
                <p>
                  That work is now a system. Through{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    THRIVE
                  </span>
                  , Dawn equips leaders to grow their people, strengthen their
                  institutions, and navigate change with confidence — the future-ready
                  lens LTL Pulse brings to every conversation. Her approach helps leaders{" "}
                  <span className="font-heading font-semibold text-ltl-accent">
                    E.A.R.N.
                  </span>{" "}
                  lasting results: empowering with strategy, amplifying their brand,
                  revolutionizing their leadership, and nurturing client relationships —
                  grounded in genuine integrity, relentless innovation, and tenacious
                  excellence. Leadership for what&apos;s coming, not just what&apos;s
                  been.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Dawn can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Your best people are leaving and you&apos;re not sure why</li>
                    <li>
                      You&apos;re leading through change — restructure, growth, new
                      strategy — and need the culture to hold
                    </li>
                    <li>
                      Your leadership team is technically strong but isn&apos;t truly
                      leading
                    </li>
                    <li>
                      You&apos;re building a brand that should mean something to clients,
                      not just look good
                    </li>
                    <li>
                      You need to develop the next bench, not just manage the current one
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Leadership development · Culture &amp; change · Talent retention · Brand
                  &amp; client strategy · People-development systems · Curriculum design
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem} className="md:col-span-2">
              <TeamMemberCard
                id="lashley"
                name="Sylvan A. Lashley, Ed.D., J.D."
                role="Strategic Leadership Expert · LTL Pulse"
                photo={teamPhotos.lashley}
                credentials="Three-time university president (Northern Caribbean University, University of the Southern Caribbean, Atlantic Union College) · Juris Doctor (J.D.) · Doctor of Education (Ed.D.) · Master of Education Law (M.E.L.), MBA, M.A. (History), B.Ed. · Faculty in Education Law & Special Education Law"
              >
                <p>
                  Sylvan A. Lashley brings more than 30 years of guiding K–12
                  systems, universities, and institutions through transformation — the
                  future-ready leadership at the heart of everything LTL Pulse publishes.
                  A three-time university president — Northern Caribbean University, the
                  University of the Southern Caribbean, and Atlantic Union College — as well
                  as a K–12 superintendent and principal, he has led institutions through
                  change in enrollment, academic quality, governance, accreditation, and
                  financial sustainability.
                </p>
                <p>
                  A legal scholar as much as an executive, he holds a Juris Doctor, Doctor
                  of Education, Master of Education Law, MBA, M.A. in History, and B.Ed.,
                  and teaches Education Law and Special Education Law. His leadership
                  translates into measurable impact: 300% organizational and programmatic
                  growth, 69% growth in student achievement, and $1.75 million in grant
                  funding secured. Leadership for what&apos;s coming, not just what&apos;s
                  been.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Sylvan can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      Your institution is navigating transformation — enrollment shifts,
                      accreditation, governance, or financial pressure
                    </li>
                    <li>
                      You need to raise academic quality and student achievement, with
                      measurable results
                    </li>
                    <li>
                      You&apos;re facing education law, compliance, or special education
                      law questions
                    </li>
                    <li>
                      Your board or governance structure needs strengthening to lead well
                    </li>
                    <li>
                      You&apos;re pursuing grant funding or a path to financial
                      sustainability
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Educational leadership · Institutional transformation · Governance
                  &amp; accreditation · Education &amp; special education law · Academic
                  quality &amp; student achievement · Financial sustainability &amp; grant
                  funding
                </p>
              </TeamMemberCard>
            </motion.div>

            <motion.div variants={staggerItem} className="md:col-span-2">
              <TeamMemberCard
                id="jackie"
                name="Jackie John, R.Eng., MSc"
                role="Leadership & DISC Coach · LTL Pulse"
                photo={teamPhotos.jackie}
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
                role="Entrepreneurship & Innovation Expert · LTL Pulse"
                photo={teamPhotos.joshua}
                credentials="Founder & Chief Vision Officer, E Skool Now Group · Founder & President, Global Educators Tribe (GET) · Chancellor, Tech Skool Educational Institution · CEO, Agric Shift"
              >
                <p>
                  Joshua Ogbonnia is a Nigerian serial entrepreneur and Pan-African visionary
                  leader building the future of education, technology, and community
                  development across the continent — exactly the future-ready leadership at
                  the heart of everything LTL Pulse publishes.
                </p>
                <p>
                  As Founder and Chief Vision Officer of E Skool Now Group, he delivers
                  award-winning tech solutions, digital innovation, media, and business
                  transformation across Africa. He is also Founder and President of the
                  Global Educators Tribe (GET) Organization, a global network for educators,
                  policymakers, and education changemakers; Chancellor of Tech Skool
                  Educational Institution, an institute of technology and entrepreneurship;
                  and CEO of Agric Shift, a venture in post-harvest operations and
                  agricultural education. Leadership for what&apos;s coming, not just
                  what&apos;s been.
                </p>
                <div>
                  <p className="font-medium text-ltl-text-primary">
                    Joshua can help you when:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      You&apos;re building or scaling an education or technology venture,
                      especially across Africa
                    </li>
                    <li>
                      You need digital innovation, media, or business transformation for
                      your organization
                    </li>
                    <li>
                      You&apos;re an educator, policymaker, or changemaker seeking a global
                      network and platform
                    </li>
                    <li>
                      You want to bring entrepreneurship and technology into how you teach
                      and lead
                    </li>
                    <li>
                      You&apos;re developing solutions in agriculture, post-harvest, or
                      community development
                    </li>
                  </ul>
                </div>
                <p className="text-xs leading-relaxed text-ltl-text-secondary md:text-sm">
                  <span className="font-label uppercase tracking-wider text-ltl-accent">
                    Specialties:
                  </span>{" "}
                  Entrepreneurship &amp; venture building · EdTech &amp; digital innovation ·
                  Education leadership &amp; networks · Business transformation · Media
                  &amp; community development · Pan-African markets
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
