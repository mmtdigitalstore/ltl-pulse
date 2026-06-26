import { Bot } from "lucide-react";

import { cn } from "@/lib/utils";

interface ConciergeAvatarProps {
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ConciergeAvatar({
  isActive = true,
  size = "lg",
  showLabel = true,
  className,
}: ConciergeAvatarProps) {
  const iconSize =
    size === "lg" ? "size-10" : size === "md" ? "size-7" : "size-5";
  const boxSize =
    size === "lg" ? "size-16" : size === "md" ? "size-12" : "size-9";
  const statusSize = size === "sm" ? "size-3" : "size-4";
  const dotSize = size === "sm" ? "size-1.5" : "size-2.5";

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative shrink-0">
        <div
          className={cn(
            "flex items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-ltl-bg via-ltl-surface to-ltl-bg",
            boxSize,
            isActive
              ? "border-ltl-accent/60 shadow-[0_0_28px_rgba(255,180,0,0.2)]"
              : "border-ltl-border opacity-80",
          )}
          aria-hidden
        >
          <Bot className={cn(iconSize, "text-ltl-accent")} />
        </div>
        <span
          className={cn(
            "absolute -right-1 -bottom-1 flex items-center justify-center rounded-full border-2 border-ltl-surface bg-ltl-bg",
            statusSize,
            !isActive && "opacity-0",
          )}
          aria-hidden
        >
          <span className={cn("animate-pulse rounded-full bg-emerald-500", dotSize)} />
        </span>
      </div>

      {showLabel && (
        <div className="text-left">
          <p className="font-heading text-base text-ltl-text-primary sm:text-lg">
            AI Concierge
          </p>
          <p
            className={cn(
              "text-xs sm:text-sm",
              isActive ? "text-emerald-400" : "text-ltl-text-secondary",
            )}
          >
            {isActive ? "Online · Ready to help" : "Sign in to activate"}
          </p>
        </div>
      )}
    </div>
  );
}
