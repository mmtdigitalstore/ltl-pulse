import type { Audience } from "@/data/problems.config";
import { AUDIENCE_LABELS } from "@/lib/concierge/intake";
import type { ConciergeMessage } from "@/lib/concierge/types";

export type IntakePhase = "idle" | "audience" | "problem" | "complete";

export function audienceFromLabel(label: string): Audience | null {
  if (label === AUDIENCE_LABELS.smb) {
    return "smb";
  }
  if (label === AUDIENCE_LABELS.coach) {
    return "coach";
  }
  return null;
}

export function deriveIntakeState(messages: ConciergeMessage[]): {
  phase: IntakePhase;
  audience: Audience | null;
  complete: boolean;
} {
  if (messages.length === 0) {
    return { phase: "idle", audience: null, complete: false };
  }

  const firstUser = messages.find((message) => message.role === "user");
  const audience = firstUser ? audienceFromLabel(firstUser.content) : null;
  const userMessages = messages.filter((message) => message.role === "user");

  if (userMessages.length >= 2) {
    return { phase: "complete", audience, complete: true };
  }

  if (userMessages.length === 1 && audience) {
    return { phase: "problem", audience, complete: false };
  }

  if (messages.length >= 1 && messages[0].role === "assistant") {
    return { phase: "audience", audience: null, complete: false };
  }

  return { phase: "complete", audience, complete: true };
}
