import Link from "next/link";
import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "For Coaches & Trainers | LTL Pulse",
  description:
    "Frameworks, community, and visibility for coaches and trainers who guide growing leaders.",
};

export default function CoachesPage() {
  return (
    <StaticPageContent
      title="For coaches & trainers"
      subtitle="Use LTL Pulse frameworks with your clients — and grow your practice."
    >
      <p>
        LTL Pulse is building a dedicated path for coaches and trainers: practical
        frameworks you can use in client work, a community of practitioners, and
        opportunities to be featured when you&apos;re ready to reach new clients.
      </p>
      <p>
        This section is coming soon. In the meantime, explore our free{" "}
        <Link
          href="/podcast"
          className="font-medium text-ltl-accent underline-offset-2 hover:underline"
        >
          LTL Conversations
        </Link>{" "}
        episodes or talk with{" "}
        <Link
          href="/concierge"
          className="font-medium text-ltl-accent underline-offset-2 hover:underline"
        >
          Cadence
        </Link>{" "}
        to find content that fits your clients.
      </p>
    </StaticPageContent>
  );
}
