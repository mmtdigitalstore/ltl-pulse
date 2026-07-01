import Link from "next/link";
import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "Careers | LTL Pulse",
  description: "Career opportunities at LTL Pulse and Let's Talk Leadership.",
};

export default function CareersPage() {
  return (
    <StaticPageContent
      title="Careers"
      subtitle="Join the team shaping future-ready leadership."
    >
      <p>
        LTL Pulse is growing. We are building a media and intelligence platform
        for leaders who care about culture as much as results.
      </p>
      <p>
        There are no open roles listed at this time. If you would like to express
        interest in working with LTL Pulse, please reach out through our{" "}
        <Link
          href="/contact#get-in-touch"
          className="font-medium text-ltl-accent underline-offset-2 hover:underline"
        >
          Contact page
        </Link>
        .
      </p>
    </StaticPageContent>
  );
}
