import Link from "next/link";

import { SubscribeCheckoutButton } from "@/components/subscribe/SubscribeCheckoutButton";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

interface SubscribePageProps {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);
  const params = await searchParams;

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-ltl-bg px-4 py-16">
      <div className="max-w-xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-ltl-accent md:text-5xl">
          Subscribe to LTL Pulse
        </h1>

        {isSubscriber ? (
          <div className="mt-8 space-y-4">
            <p className="font-sans text-lg text-ltl-text-primary">
              You&apos;re an active subscriber. Premium vlogs and exclusive
              content are unlocked.
            </p>
            <Link
              href="/vlogs"
              className="inline-flex h-11 items-center justify-center rounded-md bg-ltl-accent px-6 font-bold text-ltl-bg hover:bg-ltl-accent-hover"
            >
              Watch vlogs
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-6 font-sans text-lg leading-relaxed text-ltl-text-secondary">
              Unlock premium vlogs, full magazine access, and an ad-free
              experience. $9/month — cancel anytime.
            </p>

            {params.success === "true" && (
              <p className="mt-6 rounded-md border border-ltl-accent/30 bg-ltl-accent/10 px-4 py-3 text-sm text-ltl-text-primary">
                Payment received. Your subscription will activate shortly.
              </p>
            )}

            {params.canceled === "true" && (
              <p className="mt-6 rounded-md border border-ltl-border bg-ltl-surface px-4 py-3 text-sm text-ltl-text-secondary">
                Checkout canceled. You can subscribe whenever you&apos;re ready.
              </p>
            )}

            <div className="mt-10">
              <SubscribeCheckoutButton isLoggedIn={Boolean(user)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
