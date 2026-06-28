import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | LTL Pulse",
  description: "How LTL Pulse collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <StaticPageContent
      title="Privacy Policy"
      subtitle="How we handle your information on LTL Pulse."
    >
      <p>
        LTL Pulse (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
        your privacy. This policy describes how we collect and use information
        when you use our website, create an account, subscribe, or chat with
        Cadence.
      </p>

      <section aria-labelledby="privacy-collect-heading">
        <h2
          id="privacy-collect-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Information we collect
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Account information such as your name and email when you register
          </li>
          <li>
            Subscription and payment-related data processed through our payment
            provider
          </li>
          <li>
            Messages you send to Cadence while signed in
          </li>
          <li>
            Standard usage and device data collected by our hosting and analytics
            tools
          </li>
        </ul>
      </section>

      <section aria-labelledby="privacy-use-heading">
        <h2
          id="privacy-use-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          How we use information
        </h2>
        <p className="mt-3">
          We use your information to provide the service, personalize your
          experience, process subscriptions, improve Cadence, communicate with
          you about your account, and maintain platform security.
        </p>
      </section>

      <section aria-labelledby="privacy-sharing-heading">
        <h2
          id="privacy-sharing-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Sharing
        </h2>
        <p className="mt-3">
          We use trusted service providers for authentication, hosting, payments,
          and AI features. We do not sell your personal information.
        </p>
      </section>

      <section aria-labelledby="privacy-rights-heading">
        <h2
          id="privacy-rights-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Your choices
        </h2>
        <p className="mt-3">
          You may update account details, request deletion of your account, or
          contact us with privacy questions through our Contact page.
        </p>
      </section>

      <p className="text-sm text-ltl-text-secondary">
        This policy may be updated from time to time. Last updated: June 2026
      </p>
    </StaticPageContent>
  );
}
