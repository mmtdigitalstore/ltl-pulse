"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href">;

/** Home logo/brand link — scrolls to top when already on the homepage. */
export function HomeLink({ onClick, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || pathname !== "/") {
          return;
        }

        event.preventDefault();

        if (window.location.hash) {
          window.history.replaceState(null, "", "/");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
}
