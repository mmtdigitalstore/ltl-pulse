import type { Metadata } from "next";

import PricingSection from "./PricingSection";

export const metadata: Metadata = {
  title: "Pricing | LTL Pulse",
  description:
    "Podcasts are free. Choose Member, Pro, or Executive for premium media, Cadence access, and expert services.",
};

export default function PricingPage() {
  return <PricingSection />;
}
