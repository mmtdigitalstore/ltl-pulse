"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const primary = name.split(",")[0]?.trim() ?? name;

  return primary
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const sizeClasses = {
  sm: "size-20 text-lg md:size-24 md:text-xl",
  md: "size-28 text-2xl md:size-40",
} as const;

interface ExpertPhotoProps {
  src: string;
  alt: string;
  name: string;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function ExpertPhoto({
  src,
  alt,
  name,
  size = "md",
  className,
}: ExpertPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl border border-ltl-border bg-ltl-bg font-heading font-semibold text-ltl-accent",
          sizeClasses[size],
          className,
        )}
        aria-hidden
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={160}
      className={cn(
        "shrink-0 rounded-xl border border-ltl-border object-cover object-top",
        sizeClasses[size],
        className,
      )}
      onError={() => setFailed(true)}
    />
  );
}
