import Link from "next/link";
import type { SVGProps } from "react";

import { HomeLink } from "@/components/layout/HomeLink";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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

const socialLinks = [
  { href: "https://twitter.com", label: "X", icon: XIcon },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://youtube.com", label: "YouTube", icon: YouTubeIcon },
] as const;

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
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="text-ltl-text-secondary transition-colors hover:text-ltl-accent"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
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
