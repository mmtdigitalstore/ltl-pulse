"use client";

import { problemsFor, problemsForExpert, type Audience, type ExpertId, type Problem } from "@/data/problems.config";
import { AUDIENCE_LABELS } from "@/lib/concierge/intake";
import { cn } from "@/lib/utils";

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

interface CadenceIntakeChoicesProps {
  phase: "audience" | "problem";
  audience?: Audience;
  expertId?: ExpertId;
  disabled?: boolean;
  onChooseAudience: (audience: Audience) => void;
  onChooseProblem: (problem: Problem) => void;
}

export function CadenceIntakeChoices({
  phase,
  audience,
  expertId,
  disabled = false,
  onChooseAudience,
  onChooseProblem,
}: CadenceIntakeChoicesProps) {
  const problemChoices =
    audience == null
      ? []
      : expertId
        ? problemsForExpert(audience, expertId)
        : problemsFor(audience);

  return (
    <div className="flex gap-2">
      <div className="size-8 shrink-0" aria-hidden />
      <div className="flex max-w-[85%] flex-col gap-1.5">
        {phase === "audience" ? (
          <>
            <ChoiceButton
              disabled={disabled}
              onClick={() => onChooseAudience("smb")}
            >
              {AUDIENCE_LABELS.smb}
            </ChoiceButton>
            <ChoiceButton
              disabled={disabled}
              onClick={() => onChooseAudience("coach")}
            >
              {AUDIENCE_LABELS.coach}
            </ChoiceButton>
          </>
        ) : (
          problemChoices.map((problem) => (
            <ChoiceButton
              key={problem.id}
              disabled={disabled}
              onClick={() => onChooseProblem(problem)}
            >
              {problem.cadenceChip}
            </ChoiceButton>
          ))
        )}
      </div>
    </div>
  );
}
