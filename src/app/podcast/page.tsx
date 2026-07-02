import type { Metadata } from "next";

import { PodcastPageContent } from "@/components/pages/PodcastPageContent";
import { canPreviewAllPodcasts } from "@/lib/auth/team-admin";

const podcastDescription =
  "LTL Conversations — free weekly podcast for growing service businesses and the coaches who guide them. Practical leadership on people, culture, client-flow, and teams.";

export const metadata: Metadata = {
  title: "LTL Conversations | LTL Pulse",
  description: podcastDescription,
  openGraph: {
    title: "LTL Conversations | LTL Pulse",
    description: podcastDescription,
  },
  twitter: {
    title: "LTL Conversations | LTL Pulse",
    description: podcastDescription,
  },
};

export default async function PodcastPage() {
  const canPreviewAll = await canPreviewAllPodcasts();

  return <PodcastPageContent canPreviewAll={canPreviewAll} />;
}
