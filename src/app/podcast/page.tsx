import type { Metadata } from "next";

import { PodcastPageContent } from "@/components/pages/PodcastPageContent";

export const metadata: Metadata = {
  title: "LTL Conversations | LTL Pulse",
  description:
    "The flagship LTL Pulse podcast — conversations with leaders shaping culture.",
};

export default function PodcastPage() {
  return <PodcastPageContent />;
}
