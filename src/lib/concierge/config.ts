import type { ConciergeTier } from "@/lib/concierge/types";

/** Display name for the AI assistant in chat UI and prompts. */
export const CADENCE_NAME = "Cadence";

/** Feature label used in navigation and marketing copy. */
export const CONCIERGE_FEATURE_NAME = "AI Concierge";

export const CONCIERGE_TIER_CONFIG: Record<
  ConciergeTier,
  {
    label: string;
    maxUserMessages: number;
    maxTokens: number;
    contextMessages: number;
  }
> = {
  free: {
    label: "Cadence Basic",
    maxUserMessages: 8,
    maxTokens: 400,
    contextMessages: 8,
  },
  premium: {
    label: "Cadence Premium",
    maxUserMessages: 24,
    maxTokens: 1024,
    contextMessages: 16,
  },
};

export function getConciergeTier(isSubscriber: boolean): ConciergeTier {
  return isSubscriber ? "premium" : "free";
}
