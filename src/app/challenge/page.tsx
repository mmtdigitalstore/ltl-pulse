import Link from "next/link";
import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "Challenges | LTL Pulse",
  description:
    "Free, guided leadership challenges — practice daily, reflect, find your next step.",
};

export default function ChallengePage() {
  return (
    <StaticPageContent
      title="Leadership Challenges"
      subtitle="Structured experiences that turn insight into action."
    >
      <p>
        LTL Pulse is building free, guided leadership challenges — pick the problem
        you&apos;re facing, practice a few minutes a day, reflect on what changes,
        and discover the membership tier that fits your next step.
      </p>
      <p>
        This experience is coming soon. In the meantime, explore our{" "}
        <Link
          href="/#community"
          className="font-medium text-ltl-accent underline-offset-2 hover:underline"
        >
          community testimonials
        </Link>
        , browse{" "}
        <Link
          href="/magazine"
          className="font-medium text-ltl-accent underline-offset-2 hover:underline"
        >
          the magazine
        </Link>
        , or talk with{" "}
        <Link
          href="/concierge"
          className="font-medium text-ltl-accent underline-offset-2 hover:underline"
        >
          Cadence
        </Link>{" "}
        for guidance on where to start.
      </p>
    </StaticPageContent>
  );
}
