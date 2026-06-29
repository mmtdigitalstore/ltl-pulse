import type { IntakePhase } from "@/lib/concierge/intake-state";
import type { ConciergeMessage } from "@/lib/concierge/types";
import type { Audience } from "@/data/problems.config";

export interface CadenceChatSession {
  messages: ConciergeMessage[];
  showStarters: boolean;
  isMinimized: boolean;
  intakePhase?: IntakePhase;
  intakeAudience?: Audience | null;
  intakeComplete?: boolean;
}

const STORAGE_PREFIX = "cadence-chat:";

export function getCadenceChatStorageKey(userId: string): string {
  return `${STORAGE_PREFIX}${userId}`;
}

function isValidMessage(value: unknown): value is ConciergeMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const { role, content } = value as ConciergeMessage;
  return (role === "user" || role === "assistant") && typeof content === "string";
}

export function loadCadenceChatSession(userId: string): CadenceChatSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(getCadenceChatStorageKey(userId));

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<CadenceChatSession>;

    if (!Array.isArray(parsed.messages) || !parsed.messages.every(isValidMessage)) {
      return null;
    }

    return {
      messages: parsed.messages,
      showStarters: parsed.showStarters ?? false,
      isMinimized: parsed.isMinimized ?? false,
      intakePhase: parsed.intakePhase,
      intakeAudience: parsed.intakeAudience ?? null,
      intakeComplete: parsed.intakeComplete ?? false,
    };
  } catch {
    return null;
  }
}

export function saveCadenceChatSession(
  userId: string,
  session: CadenceChatSession,
): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(getCadenceChatStorageKey(userId), JSON.stringify(session));
}

export function clearCadenceChatSession(userId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(getCadenceChatStorageKey(userId));
}
