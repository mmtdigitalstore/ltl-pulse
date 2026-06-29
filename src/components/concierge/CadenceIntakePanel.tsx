"use client";

import { useState } from "react";

import {
  problemsFor,
  type Audience,
  type Problem,
} from "@/data/problems.config";
import {
  AUDIENCE_LABELS,
  buildCadenceIntakeReply,
  CADENCE_GREETING,
  CADENCE_PROBLEM_PROMPT,
} from "@/lib/concierge/intake";
import type { ConciergeMessage } from "@/lib/concierge/types";
import { cn } from "@/lib/utils";

import { ConciergeAvatar } from "./ConciergeAvatar";

type IntakeStep = "audience" | "problem" | "done";

interface CadenceIntakePanelProps {
  isSubscriber: boolean;
  onComplete: (messages: ConciergeMessage[]) => void;
}

function IntakeBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <ConciergeAvatar isActive size="sm" showLabel={false} className="shrink-0" />
      <div className="max-w-[85%] rounded-lg bg-ltl-bg/60 px-2.5 py-1.5 text-sm leading-relaxed text-ltl-text-primary">
        {children}
      </div>
    </div>
  );
}

function ChoiceButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-md border border-ltl-border bg-ltl-bg px-2.5 py-1.5 text-left text-sm text-ltl-text-secondary transition-colors",
        "hover:border-ltl-accent/40 hover:text-ltl-text-primary disabled:opacity-50",
      )}
    >
      {children}
    </button>
  );
}

export function CadenceIntakePanel({
  isSubscriber,
  onComplete,
}: CadenceIntakePanelProps) {
  const [step, setStep] = useState<IntakeStep>("audience");
  const [audience, setAudience] = useState<Audience | null>(null);

  function chooseAudience(next: Audience) {
    setAudience(next);
    setStep("problem");
  }

  function chooseProblem(problem: Problem) {
    const audienceLabel = audience ? AUDIENCE_LABELS[audience] : "Guest";

    onComplete([
      { role: "user", content: audienceLabel },
      { role: "user", content: problem.cadenceChip },
      {
        role: "assistant",
        content: buildCadenceIntakeReply(problem, { isSubscriber }),
      },
    ]);
    setStep("done");
  }

  if (step === "done") {
    return null;
  }

  return (
    <div className="space-y-3 py-1">
      <IntakeBubble>
        <p>{CADENCE_GREETING}</p>
        {step === "audience" && (
          <div className="mt-3 flex flex-col gap-1.5">
            <ChoiceButton onClick={() => chooseAudience("smb")}>
              {AUDIENCE_LABELS.smb}
            </ChoiceButton>
            <ChoiceButton onClick={() => chooseAudience("coach")}>
              {AUDIENCE_LABELS.coach}
            </ChoiceButton>
          </div>
        )}
      </IntakeBubble>

      {step === "problem" && audience && (
        <>
          <IntakeBubble>
            <p>{CADENCE_PROBLEM_PROMPT}</p>
            <div className="mt-3 flex flex-col gap-1.5">
              {problemsFor(audience).map((problem) => (
                <ChoiceButton
                  key={problem.id}
                  onClick={() => chooseProblem(problem)}
                >
                  {problem.cadenceChip}
                </ChoiceButton>
              ))}
            </div>
          </IntakeBubble>
        </>
      )}
    </div>
  );
}
