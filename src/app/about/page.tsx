import type { Metadata } from "next";

import { AboutPageContent } from "@/components/pages/AboutPageContent";

const aboutDescription =
  "Where leadership meets culture — practical, future-ready leadership for growing service businesses and the coaches who guide them. Meet the experts behind LTL Pulse.";

export const metadata: Metadata = {
  title: "About | LTL Pulse",
  description: aboutDescription,
  openGraph: {
    title: "About | LTL Pulse",
    description: aboutDescription,
  },
  twitter: {
    title: "About | LTL Pulse",
    description: aboutDescription,
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
