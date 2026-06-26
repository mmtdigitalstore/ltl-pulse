export type ConciergeRole = "user" | "assistant";

export interface ConciergeMessage {
  role: ConciergeRole;
  content: string;
}

export type ConciergeTier = "free" | "premium";
