"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import { ExpertLaneBanner } from "@/components/concierge/ExpertLaneBanner";
import { Button } from "@/components/ui/button";
import type { ExpertId } from "@/data/problems.config";
import { experts } from "@/data/problems.config";

interface ConciergeExperienceProps {
  userId: string;
  isSubscriber: boolean;
  expertId?: ExpertId | null;
  advisoryTopic?: boolean;
  showWelcome: boolean;
  showUpgraded: boolean;
}

export function ConciergeExperience({
  userId,
  isSubscriber,
  expertId = null,
  advisoryTopic = false,
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
    router.replace(
      expertId
        ? `/concierge?expert=${expertId}`
        : advisoryTopic
          ? "/concierge?topic=advisory"
          : "/concierge",
      { scroll: false },
    );
  }

  return (
    <div className="ltl-theme-magazine ltl-media-container mt-6 rounded-xl p-4 sm:p-5">
      {upgradedVisible && (
        <div className="ltl-concierge-banner-glow mb-3 flex items-start gap-2 rounded-md border border-ltl-border/80 px-3 py-2">
          <div className="flex-1 text-sm text-ltl-text-primary">
            <p className="font-medium text-ltl-accent">
              Cadence Premium is active.
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
        <div className="ltl-concierge-banner-glow mb-3 flex items-start gap-2 rounded-md border border-ltl-border/80 px-3 py-2">
          <div className="flex-1 text-sm text-ltl-text-primary">
            <p className="font-medium">You&apos;re in — Cadence is ready to chat.</p>
            <p className="mt-1 text-ltl-text-secondary">
              {expertId
                ? `Cadence will route you to ${experts[expertId].name}'s lane — pick what sounds like you below.`
                : advisoryTopic
                  ? "Cadence will walk you through Advisory & Enterprise options — pricing and routing to the right consultant."
                  : "Tap a suggested question below or type in the message box to start your conversation."}
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

      {expertId ? <ExpertLaneBanner expertId={expertId} /> : null}

      <ConciergeChat
        userId={userId}
        isSubscriber={isSubscriber}
        expertId={expertId}
        advisoryTopic={advisoryTopic}
        autoFocusInput={showWelcome || showUpgraded}
        onChatStart={() => {
          setWelcomeVisible(false);
          setUpgradedVisible(false);
        }}
      />
    </div>
  );
}
