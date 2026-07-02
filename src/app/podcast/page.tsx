import type { Metadata } from "next";

import { PodcastPageContent } from "@/components/pages/PodcastPageContent";
import { canPreviewAllPodcasts } from "@/lib/auth/team-admin";

export const metadata: Metadata = {
  title: "LTL Conversations | LTL Pulse",
  description:
    "The flagship LTL Pulse podcast — conversations with leaders shaping culture.",
};

export default async function PodcastPage() {
  const canPreviewAll = await canPreviewAllPodcasts();

  return <PodcastPageContent canPreviewAll={canPreviewAll} />;
}
