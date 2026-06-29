import Link from "next/link";
import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "Challenges | LTL Pulse",
  description:
    "Structured leadership challenges from LTL Pulse — 3, 5, and 7-day experiences coming soon.",
};

export default function ChallengePage() {
  return (
    <StaticPageContent
      title="Leadership Challenges"
      subtitle="Structured experiences that turn insight into action."
    >
      <p>
        LTL Pulse is building automated 3, 5, and 7-day leadership challenges
        designed to help you practice future-ready leadership, reflect on your
        results, and decide which membership tier fits your next step.
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
