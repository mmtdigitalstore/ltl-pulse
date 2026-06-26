import Link from "next/link";

import { SubscribeCheckoutButton } from "@/components/subscribe/SubscribeCheckoutButton";
import { buttonVariants } from "@/components/ui/button";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

interface SubscribePageProps {
  searchParams: Promise<{ success?: string; canceled?: string; from?: string }>;
}

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);
  const params = await searchParams;
  const fromConcierge = params.from === "concierge";

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-ltl-bg px-4 py-16">
      <div className="max-w-xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-ltl-accent md:text-5xl">
          Subscribe to LTL Pulse
        </h1>

        {isSubscriber ? (
          <div className="mt-8 space-y-4">
            <p className="font-sans text-lg text-ltl-text-primary">
              You&apos;re an active subscriber. Premium AI Concierge, premium
              vlogs, and exclusive content are unlocked.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/concierge?upgraded=1"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-md bg-ltl-accent px-6 font-bold text-ltl-bg hover:bg-ltl-accent-hover",
                )}
              >
                Open Premium AI Concierge
              </Link>
              <Link
                href="/vlogs"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-md border-ltl-border px-6 text-ltl-text-primary hover:bg-ltl-surface",
                )}
              >
                Watch vlogs
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-6 font-sans text-lg leading-relaxed text-ltl-text-secondary">
              {fromConcierge
                ? "Unlock Premium AI Concierge for deeper conversations, plus premium vlogs, full magazine access, and an ad-free experience."
                : "Unlock premium vlogs, full magazine access, Premium AI Concierge, and an ad-free experience."}{" "}
              $9/month — cancel anytime.
            </p>

            {params.success === "true" && (
              <p className="mt-6 rounded-md border border-ltl-accent/30 bg-ltl-accent/10 px-4 py-3 text-sm text-ltl-text-primary">
                Payment received. Your subscription will activate shortly.
                {fromConcierge && (
                  <>
                    {" "}
                    <Link href="/concierge?upgraded=1" className="font-medium text-ltl-accent hover:underline">
                      Continue to Premium AI Concierge
                    </Link>
                  </>
                )}
              </p>
            )}

            {params.canceled === "true" && (
              <p className="mt-6 rounded-md border border-ltl-border bg-ltl-surface px-4 py-3 text-sm text-ltl-text-secondary">
                Checkout canceled.{" "}
                {fromConcierge ? (
                  <Link href="/concierge" className="font-medium text-ltl-accent hover:underline">
                    Return to AI Concierge
                  </Link>
                ) : (
                  "You can subscribe whenever you're ready."
                )}
              </p>
            )}

            <div className="mt-10">
              <SubscribeCheckoutButton
                isLoggedIn={Boolean(user)}
                fromConcierge={fromConcierge}
              />
            </div>

            {fromConcierge && (
              <p className="mt-6 text-sm text-ltl-text-secondary">
                <Link href="/concierge" className="text-ltl-accent hover:underline">
                  Back to AI Concierge
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
