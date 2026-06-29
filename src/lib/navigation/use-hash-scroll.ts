"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashId(hash: string): boolean {
  const id = hash.replace(/^#/, "");

  if (!id) {
    return false;
  }

  const target = document.getElementById(id);

  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/** Scroll to `location.hash` after client navigation; retries until the target mounts. */
export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    let frame = 0;
    let attempts = 0;
    const maxAttempts = 40;

    const tick = () => {
      if (scrollToHashId(hash) || attempts >= maxAttempts) {
        return;
      }

      attempts += 1;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const onHashChange = () => {
      scrollToHashId(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);
}
