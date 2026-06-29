import type { Metadata } from "next";

import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About | LTL Pulse",
  description:
    "Where leadership meets culture. Practical help for growing service businesses and coaches — meet the experts behind LTL Pulse.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
