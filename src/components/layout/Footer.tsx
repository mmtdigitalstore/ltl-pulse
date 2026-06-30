import Link from "next/link";
import type { SVGProps } from "react";

import { HomeLink } from "@/components/layout/HomeLink";
import { siteLinks } from "@/data/site-links.config";

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const contentLinks = [
  { href: "/magazine", label: "Magazine" },
  { href: "/podcast", label: "Podcast" },
  { href: "/vlogs", label: "Vlogs" },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

const youtubeChannelUrl = siteLinks.youtubeChannelUrl;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="font-label text-xs uppercase tracking-widest text-ltl-text-secondary">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ltl-text-secondary transition-colors hover:text-ltl-text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="ltl-footer-glow relative border-t border-ltl-border bg-ltl-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <HomeLink className="inline-block font-heading text-xl font-semibold text-ltl-accent">
              LTL Pulse
            </HomeLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ltl-text-secondary">
              Where leadership meets culture. Premium media for ambitious
              leaders.
            </p>
            <p className="mt-4 max-w-xs border-l-2 border-ltl-brand/35 pl-3 text-sm leading-relaxed text-ltl-text-secondary">
              Part of{" "}
              <a
                href="https://lead.mmti.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ltl-text-primary underline decoration-ltl-brand/40 underline-offset-2 hover:decoration-ltl-accent"
              >
                Let&apos;s Talk Leadership with MMTI
              </a>
            </p>
            {youtubeChannelUrl ? (
              <div className="mt-6 flex gap-4">
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube (opens in new tab)"
                  className="text-ltl-text-secondary transition-colors hover:text-ltl-accent"
                >
                  <YouTubeIcon className="size-5" />
                </a>
              </div>
            ) : null}
          </div>

          <FooterColumn title="Content" links={contentLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <p className="mt-12 border-t border-ltl-border pt-8 text-center text-sm text-ltl-text-secondary">
          © {new Date().getFullYear()} LTL Pulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
