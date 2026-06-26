import { formatCadenceReply } from "@/lib/concierge/format";
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

  return (
    <p className={cn("whitespace-pre-wrap text-sm leading-relaxed", className)}>
      {text}
    </p>
  );
}
