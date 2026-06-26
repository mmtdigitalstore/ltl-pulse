"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import { Button } from "@/components/ui/button";

interface ConciergeExperienceProps {
  isSubscriber: boolean;
  showWelcome: boolean;
  showUpgraded: boolean;
}

export function ConciergeExperience({
  isSubscriber,
  showWelcome,
  showUpgraded,
}: ConciergeExperienceProps) {
  const router = useRouter();
  const [welcomeVisible, setWelcomeVisible] = useState(showWelcome);
  const [upgradedVisible, setUpgradedVisible] = useState(showUpgraded);

  useEffect(() => {
    setWelcomeVisible(showWelcome);
  }, [showWelcome]);

  useEffect(() => {
    setUpgradedVisible(showUpgraded);
  }, [showUpgraded]);

  useEffect(() => {
    if (!showUpgraded) {
      return;
    }

    router.refresh();
    const timer = window.setTimeout(() => router.refresh(), 3000);
    return () => window.clearTimeout(timer);
  }, [showUpgraded, router]);

  function dismissParams() {
    setWelcomeVisible(false);
    setUpgradedVisible(false);
    router.replace("/concierge", { scroll: false });
  }

  return (
    <div className="mt-6">
      {upgradedVisible && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-ltl-accent/40 bg-ltl-accent/15 px-4 py-3">
          <div className="flex-1 text-sm text-ltl-text-primary">
            <p className="font-medium text-ltl-accent">
              Premium AI Concierge is active.
            </p>
            <p className="mt-1 text-ltl-text-secondary">
              Enjoy deeper conversations, richer answers, and more messages per
              chat. Ask anything below to get started.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={dismissParams}
            className="shrink-0 text-ltl-text-secondary hover:text-ltl-text-primary"
            aria-label="Dismiss upgrade message"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {welcomeVisible && !upgradedVisible && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-ltl-accent/30 bg-ltl-accent/10 px-4 py-3">
          <div className="flex-1 text-sm text-ltl-text-primary">
            <p className="font-medium">You&apos;re in — AI Concierge is ready.</p>
            <p className="mt-1 text-ltl-text-secondary">
              Tap a suggested question below or type in the message box to
              start your conversation.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={dismissParams}
            className="shrink-0 text-ltl-text-secondary hover:text-ltl-text-primary"
            aria-label="Dismiss welcome message"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      <ConciergeChat
        isSubscriber={isSubscriber}
        autoFocusInput={showWelcome || showUpgraded}
      />
    </div>
  );
}
