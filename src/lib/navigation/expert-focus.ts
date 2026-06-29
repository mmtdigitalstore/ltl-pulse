import type { ExpertId } from "@/data/problems.config";
import { parseExpertId } from "@/data/problems.config";
import { cn } from "@/lib/utils";

export function expertIdFromHash(hash: string): ExpertId | null {
  return parseExpertId(hash.replace(/^#/, ""));
}

/** Grid/list wrapper — dims non-focused experts when a hash target is active. */
export function expertFocusWrapperClass(
  expertId: ExpertId,
  focusedExpert: ExpertId | null,
): string {
  if (!focusedExpert) {
    return "h-full";
  }

  return cn(
    "h-full transition-[opacity,transform,filter] duration-300 ease-out",
    focusedExpert === expertId
      ? "z-10"
      : "opacity-[0.26] saturate-[0.55] brightness-[0.88]",
  );
}

/** Card surface — accent ring on the expert Cadence linked to. */
export function expertFocusCardClass(
  expertId: ExpertId,
  focusedExpert: ExpertId | null,
): string | undefined {
  if (!focusedExpert) {
    return undefined;
  }

  if (focusedExpert === expertId) {
    return "border-ltl-accent/50 ring-1 ring-ltl-accent/30 shadow-[0_0_36px_rgba(255,180,0,0.09)]";
  }

  return "border-ltl-border/30 bg-ltl-surface/50";
}
