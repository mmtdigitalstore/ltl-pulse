"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href">;

/** Home logo/brand link — scrolls to top when already on the homepage. */
export function HomeLink({ onClick, ...props }: HomeLinkProps) {
  return (
    <Link
      href="/"
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        const onHome =
          window.location.pathname === "/" || window.location.pathname === "";

        if (!onHome) {
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
