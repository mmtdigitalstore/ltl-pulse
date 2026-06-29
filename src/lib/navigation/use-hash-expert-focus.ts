"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { ExpertId } from "@/data/problems.config";
import { expertIdFromHash } from "@/lib/navigation/expert-focus";

/** Tracks which expert `#id` is active in the URL (e.g. /about#jackie). */
export function useHashExpertFocus(): ExpertId | null {
  const pathname = usePathname();
  const [focusedExpert, setFocusedExpert] = useState<ExpertId | null>(null);

  useEffect(() => {
    function readHash() {
      setFocusedExpert(expertIdFromHash(window.location.hash));
    }

    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [pathname]);

  return focusedExpert;
}
