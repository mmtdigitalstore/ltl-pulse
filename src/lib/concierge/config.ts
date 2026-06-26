import type { ConciergeTier } from "@/lib/concierge/types";

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
