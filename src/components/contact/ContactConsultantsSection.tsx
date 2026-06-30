"use client";

import Link from "next/link";

import {
  expertFocusCardClass,
  expertFocusWrapperClass,
} from "@/lib/navigation/expert-focus";
import { useHashExpertFocus } from "@/lib/navigation/use-hash-expert-focus";
import { useHashScroll } from "@/lib/navigation/use-hash-scroll";
import { cn } from "@/lib/utils";
import { EXPERT_IDS, experts, getConciergeHref, getExpertHref } from "@/data/problems.config";

export function ContactConsultantsSection() {
  useHashScroll();
  const focusedExpert = useHashExpertFocus();

  return (
    <section aria-labelledby="contact-consultants-heading">
      <h2
        id="contact-consultants-heading"
        className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
      >
        Work with our consultants
      </h2>
      <p className="mt-3">
        Each consultant has a lane on LTL Pulse — the same framing you&apos;ll see on
        the homepage. Read a bio, then ask Cadence to connect you when you&apos;re
        ready.
      </p>

      <ul className="mt-6 space-y-4">
        {EXPERT_IDS.map((id) => {
          const expert = experts[id];

          return (
            <li
              key={id}
              id={id}
              aria-current={focusedExpert === id ? "true" : undefined}
              className={cn(
                "scroll-mt-24 rounded-lg border border-ltl-border bg-ltl-surface p-5 transition-[border-color,box-shadow,opacity] duration-300",
                expertFocusWrapperClass(id, focusedExpert),
                expertFocusCardClass(id, focusedExpert),
              )}
            >
              <h3 className="font-heading text-lg font-semibold text-ltl-text-primary">
                <Link
                  href={getExpertHref(id)}
                  className="hover:text-ltl-accent hover:underline underline-offset-2"
                >
                  {expert.name}
                </Link>
              </h3>
              <p className="mt-1 font-label text-[0.65rem] uppercase tracking-widest text-ltl-accent">
                {expert.title}
              </p>
              {expert.contactCredential ? (
                <p className="mt-2 text-xs italic leading-relaxed text-ltl-text-secondary md:text-sm">
                  {expert.contactCredential}
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-ltl-text-secondary">
                {expert.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ltl-text-secondary md:text-base">
                {expert.contactBio}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={getExpertHref(id)}
                  className="text-sm font-medium text-ltl-accent hover:underline"
                >
                  Read full bio
                </Link>
                <Link
                  href={getConciergeHref(id)}
                  className="text-sm font-medium text-ltl-text-secondary hover:text-ltl-text-primary"
                >
                  Connect via Cadence
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <Link
        href="/about"
        className="mt-4 inline-block text-sm font-medium text-ltl-accent underline-offset-2 hover:underline"
      >
        Meet the full team on About
      </Link>
    </section>
  );
}
