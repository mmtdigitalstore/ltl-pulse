"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

interface CadenceIconProps {
  className?: string;
  title?: string;
}

export function CadenceIcon({
  className,
  title = "Cadence - LTL Pulse AI Concierge",
}: CadenceIconProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D3018" />
          <stop offset="1" stopColor="#100F0B" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#F0B43C" opacity="0.05" />
      <circle cx="60" cy="60" r="48" fill="#F0B43C" opacity="0.07" />
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="#F0B43C"
        strokeWidth="1"
        opacity="0.18"
      />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#F0B43C"
        strokeWidth="1"
        opacity="0.4"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill={`url(#${gradientId})`}
        stroke="#F0B43C"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <rect x="30" y="54" width="4" height="12" rx="2" fill="#F2B33C" />
      <rect x="37" y="49" width="4" height="22" rx="2" fill="#F2B33C" />
      <rect x="44" y="44" width="4" height="32" rx="2" fill="#F5C24E" />
      <rect x="51" y="51" width="4" height="18" rx="2" fill="#F2B33C" />
      <rect x="58" y="40" width="4" height="40" rx="2" fill="#FBD98A" />
      <rect x="65" y="51" width="4" height="18" rx="2" fill="#F2B33C" />
      <rect x="72" y="44" width="4" height="32" rx="2" fill="#F5C24E" />
      <rect x="79" y="49" width="4" height="22" rx="2" fill="#F2B33C" />
      <rect x="86" y="54" width="4" height="12" rx="2" fill="#F2B33C" />
    </svg>
  );
}
