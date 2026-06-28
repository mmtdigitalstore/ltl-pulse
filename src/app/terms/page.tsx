import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "Terms of Use | LTL Pulse",
  description: "Terms governing use of the LTL Pulse website and services.",
};

export default function TermsPage() {
  return (
    <StaticPageContent
      title="Terms of Use"
      subtitle="Please read these terms before using LTL Pulse."
    >
      <p>
        By accessing or using LTL Pulse, you agree to these Terms of Use. If you
        do not agree, please do not use the platform.
      </p>

      <section aria-labelledby="terms-service-heading">
        <h2
          id="terms-service-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          The service
        </h2>
        <p className="mt-3">
          LTL Pulse provides leadership media, membership content, and Cadence,
          an AI Concierge. Features may change as we improve the platform.
        </p>
      </section>

      <section aria-labelledby="terms-accounts-heading">
        <h2
          id="terms-accounts-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Accounts and subscriptions
        </h2>
        <p className="mt-3">
          You are responsible for your account credentials and activity. Paid
          subscriptions renew according to the plan selected at checkout unless
          canceled in accordance with applicable billing terms.
        </p>
      </section>

      <section aria-labelledby="terms-cadence-heading">
        <h2
          id="terms-cadence-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Cadence
        </h2>
        <p className="mt-3">
          Cadence is a guide and receptionist, not a substitute for professional,
          legal, medical, or strategic advice. Responses may be incomplete or
          inaccurate. For personalized counsel, connect with an LTL consultant.
        </p>
      </section>

      <section aria-labelledby="terms-conduct-heading">
        <h2
          id="terms-conduct-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Acceptable use
        </h2>
        <p className="mt-3">
          You may not misuse the platform, attempt unauthorized access, scrape
          content in violation of these terms, or use the service in ways that
          harm others or violate applicable law.
        </p>
      </section>

      <p className="text-sm text-ltl-text-secondary">
        Last updated: June 2026
      </p>
    </StaticPageContent>
  );
}
