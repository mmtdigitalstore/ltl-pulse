import Link from "next/link";
import type { Metadata } from "next";

import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Concierge | LTL Pulse",
  description:
    "Ask leadership questions and explore LTL Pulse with your AI Concierge.",
};

export default async function ConciergePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);

  return (
    <div className="min-h-screen bg-ltl-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="AI Concierge"
          subtitle="Your guide to leadership insight, powered by AI Concierge."
        />

        {user ? (
          <ConciergeChat isSubscriber={isSubscriber} />
        ) : (
          <div className="mt-10 rounded-lg border border-ltl-border bg-ltl-surface px-6 py-10 text-center">
            <p className="font-sans text-lg text-ltl-text-primary">
              Sign in to chat with AI Concierge.
            </p>
            <p className="mt-3 text-sm text-ltl-text-secondary">
              Free members get Basic AI Concierge. Subscribers unlock Premium
              AI Concierge with deeper guidance.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-md bg-ltl-accent px-8 font-bold text-ltl-bg hover:bg-ltl-accent-hover",
                )}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-md border-ltl-border px-8 text-ltl-text-primary hover:bg-ltl-bg",
                )}
              >
                Create account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
