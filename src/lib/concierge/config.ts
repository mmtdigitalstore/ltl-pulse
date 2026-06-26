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
    label: "Basic AI Concierge",
    maxUserMessages: 8,
    maxTokens: 400,
    contextMessages: 8,
  },
  premium: {
    label: "Premium AI Concierge",
    maxUserMessages: 24,
    maxTokens: 1024,
    contextMessages: 16,
  },
};

export function getConciergeTier(isSubscriber: boolean): ConciergeTier {
  return isSubscriber ? "premium" : "free";
}
