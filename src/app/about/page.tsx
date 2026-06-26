import type { Metadata } from "next";

import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About | LTL Pulse",
  description:
    "Where leadership meets culture. Meet the team behind LTL Pulse — podcasts, magazine, vlogs, and Cadence for ambitious leaders.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
