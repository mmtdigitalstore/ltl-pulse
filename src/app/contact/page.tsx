import Link from "next/link";
import type { Metadata } from "next";

import { ContactConsultantsSection } from "@/components/contact/ContactConsultantsSection";
import { StaticPageContent } from "@/components/layout/StaticPageContent";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | LTL Pulse",
  description:
    "Connect with the LTL Pulse team — Cadence, our consultants, and member support.",
};

export default function ContactPage() {
  return (
    <StaticPageContent
      title="Contact"
      subtitle="We're here to help you find the right content, consultant, or next step."
    >
      <p>
        LTL Pulse connects ambitious leaders with practical content and human
        expertise. Choose the path that fits your need.
      </p>

      <section aria-labelledby="contact-cadence-heading">
        <h2
          id="contact-cadence-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Chat with Cadence
        </h2>
        <p className="mt-3">
          Signed-in members can talk with Cadence, our AI Concierge. She can
          orient you on the platform and connect you with the right LTL consultant.
        </p>
        <Link
          href="/concierge"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-4 inline-flex h-11 rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
          )}
        >
          Go to Cadence
        </Link>
      </section>

      <ContactConsultantsSection />

      <section aria-labelledby="contact-accessibility-heading">
        <h2
          id="contact-accessibility-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Accessibility support
        </h2>
        <p className="mt-3">
          If you experience a barrier using this site, please tell us so we can
          improve. See our{" "}
          <Link
            href="/accessibility"
            className="font-medium text-ltl-accent underline-offset-2 hover:underline"
          >
            Accessibility Statement
          </Link>
          .
        </p>
      </section>
    </StaticPageContent>
  );
}
