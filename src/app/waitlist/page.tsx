import type { Metadata } from "next";

import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "Reserve founding rate | LTL Pulse",
  description:
    "Reserve your founding member rate for Pulse Pro or Executive — no charge until the tier opens.",
};

interface WaitlistPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const params = await searchParams;

  return <WaitlistForm plan={params.plan} />;
}
