import Link from "next/link";
import type { Metadata } from "next";

import { ConciergeAvatar } from "@/components/concierge/ConciergeAvatar";
import { ConciergeExperience } from "@/components/concierge/ConciergeExperience";
import { buttonVariants } from "@/components/ui/button";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cadence — AI Concierge | LTL Pulse",
  description:
    "Chat with Cadence, your AI Concierge — get oriented, find the right content, and connect with human experts when you need them.",
};

interface ConciergePageProps {
  searchParams: Promise<{ welcome?: string; upgraded?: string }>;
}

export default async function ConciergePage({ searchParams }: ConciergePageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);
  const params = await searchParams;

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-ltl-bg px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center sm:text-left">
          <h1 className="font-heading text-3xl font-semibold text-ltl-text-primary sm:text-4xl">
            Cadence
          </h1>
          <p className="mt-2 text-sm text-ltl-text-secondary sm:text-base">
            Your AI Concierge — here to guide you and connect you with the right content and people.
          </p>
        </div>

        {user ? (
          <ConciergeExperience
            isSubscriber={isSubscriber}
            showWelcome={params.welcome === "1"}
            showUpgraded={params.upgraded === "1"}
          />
        ) : (
          <div className="mt-6 rounded-lg border border-ltl-border bg-ltl-surface p-5 sm:p-6">
            <ConciergeAvatar isActive={false} size="md" className="justify-center sm:justify-start" />
            <p className="mt-4 text-center text-sm text-ltl-text-secondary sm:text-left">
              Sign in once — you&apos;ll come right back here to chat. No need
              to find Cadence in the menu again.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                href="/login?next=/concierge"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
                )}
              >
                Sign in to start chatting
              </Link>
              <Link
                href="/signup?next=/concierge"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-10 w-full rounded-md border-ltl-border text-sm text-ltl-text-primary hover:bg-ltl-bg",
                )}
              >
                Create a free account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
