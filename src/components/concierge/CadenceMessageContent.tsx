"use client";

import { formatCadenceReply } from "@/lib/concierge/format";
import { linkifyCadenceText } from "@/lib/concierge/linkify";
import { cn } from "@/lib/utils";

interface CadenceMessageContentProps {
  content: string;
  className?: string;
}

export function CadenceMessageContent({
  content,
  className,
}: CadenceMessageContentProps) {
  const text = formatCadenceReply(content);
  const paragraphs = text.split("\n");

  return (
    <div className={cn("space-y-2 text-sm leading-relaxed", className)}>
      {paragraphs.map((paragraph, index) => {
        if (!paragraph.trim()) {
          return <div key={`gap-${index}`} className="h-1" aria-hidden />;
        }

        return (
          <p key={`${index}-${paragraph.slice(0, 24)}`}>
            {linkifyCadenceText(paragraph)}
          </p>
        );
      })}
    </div>
  );
}
