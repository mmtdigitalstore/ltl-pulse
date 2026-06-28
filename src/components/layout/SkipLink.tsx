import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ltl-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-ltl-bg focus:outline-none focus:ring-2 focus:ring-ltl-text-primary"
    >
      Skip to main content
    </Link>
  );
}
