import Link from "next/link";
import type { Metadata } from "next";

import { StaticPageContent } from "@/components/layout/StaticPageContent";

export const metadata: Metadata = {
  title: "Accessibility Statement | LTL Pulse",
  description:
    "LTL Pulse accessibility commitment, known limitations, and how to report barriers.",
};

export default function AccessibilityPage() {
  return (
    <StaticPageContent
      title="Accessibility Statement"
      subtitle="LTL Pulse is committed to making our platform usable for everyone."
    >
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
        Level AA. Our goal is to ensure that people with disabilities can access
        leadership content, media, and Cadence, our AI Concierge.
      </p>

      <section aria-labelledby="a11y-measures-heading">
        <h2
          id="a11y-measures-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Measures we take
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Semantic HTML structure and page landmarks</li>
          <li>Keyboard navigation and visible focus indicators</li>
          <li>Text alternatives for meaningful images</li>
          <li>Form labels and descriptive link text</li>
          <li>Ongoing accessibility reviews as the platform evolves</li>
        </ul>
      </section>

      <section aria-labelledby="a11y-limitations-heading">
        <h2
          id="a11y-limitations-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Known limitations
        </h2>
        <p className="mt-3">
          We are actively improving accessibility across the site. Some areas may
          still need work, including media captions and transcripts as new podcast
          and vlog content is published, and continued refinement of the Cadence
          chat experience for assistive technologies.
        </p>
      </section>

      <section aria-labelledby="a11y-feedback-heading">
        <h2
          id="a11y-feedback-heading"
          className="font-heading text-xl font-semibold text-ltl-text-primary md:text-2xl"
        >
          Feedback and assistance
        </h2>
        <p className="mt-3">
          If you encounter an accessibility barrier on LTL Pulse, please contact
          us through our{" "}
          <Link
            href="/contact"
            className="font-medium text-ltl-accent underline-offset-2 hover:underline"
          >
            Contact page
          </Link>
          . Include the page URL and a brief description of the issue so we can
          address it promptly.
        </p>
      </section>

      <p className="text-sm text-ltl-text-secondary">
        Last updated: June 2026
      </p>
    </StaticPageContent>
  );
}
