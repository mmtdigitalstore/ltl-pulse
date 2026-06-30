import type { Metadata } from "next";

import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About | LTL Pulse",
  description:
    "Where leadership meets culture — practical, future-ready leadership for growing service businesses and the coaches who guide them. Meet the experts behind LTL Pulse.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
