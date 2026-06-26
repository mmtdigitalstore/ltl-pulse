"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import { Button } from "@/components/ui/button";

interface ConciergeExperienceProps {
  isSubscriber: boolean;
  showWelcome: boolean;
}

export function ConciergeExperience({
  isSubscriber,
  showWelcome,
}: ConciergeExperienceProps) {
  const router = useRouter();
  const [welcomeVisible, setWelcomeVisible] = useState(showWelcome);

  useEffect(() => {
    setWelcomeVisible(showWelcome);
  }, [showWelcome]);

  function dismissWelcome() {
    setWelcomeVisible(false);
    router.replace("/concierge", { scroll: false });
  }

  return (
    <div className="mt-6">
      {welcomeVisible && (
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
            onClick={dismissWelcome}
            className="shrink-0 text-ltl-text-secondary hover:text-ltl-text-primary"
            aria-label="Dismiss welcome message"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      <ConciergeChat
        isSubscriber={isSubscriber}
        autoFocusInput={showWelcome}
      />
    </div>
  );
}
