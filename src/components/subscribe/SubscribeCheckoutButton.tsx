"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscribeCheckoutButtonProps {
  isLoggedIn: boolean;
}

export function SubscribeCheckoutButton({ isLoggedIn }: SubscribeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/login"
          className={cn(
            "inline-flex h-12 items-center justify-center rounded-md bg-ltl-accent px-8 font-bold text-ltl-bg hover:bg-ltl-accent-hover",
          )}
        >
          Sign in to subscribe
        </Link>
        <Link
          href="/signup"
          className="inline-flex h-12 items-center justify-center rounded-md border border-ltl-border px-8 font-semibold text-ltl-text-primary hover:bg-ltl-surface"
        >
          Create account
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="h-12 rounded-md bg-ltl-accent px-8 font-bold text-ltl-bg hover:bg-ltl-accent-hover"
      >
        {loading ? "Redirecting…" : "Subscribe with Stripe"}
      </Button>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
