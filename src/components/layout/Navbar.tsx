"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { logout } from "@/app/auth/actions";
import { buildAuthHref } from "@/lib/auth/redirect";
import { clearCadenceChatSession } from "@/lib/concierge/session";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const COMMUNITY_HASH = "#community";
const COMMUNITY_HREF = `/${COMMUNITY_HASH}`;

const pulseLinks = [
  { href: "/magazine", label: "Magazine" },
  { href: "/podcast", label: "Conversations" },
  { href: "/vlogs", label: "Vlogs" },
] as const;

const communityLinks = [
  { href: COMMUNITY_HREF, label: "Testimonials", hashTarget: true },
  { href: "/challenge", label: "Challenges", hashTarget: false },
] as const;

const standaloneNavLinks = [
  { href: "/concierge", label: "Cadence" },
  { href: "/about", label: "About" },
] as const;

type NavDropdownItem = {
  href: string;
  label: string;
  hashTarget?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
};

function useCommunityNavActive() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(false);
      return;
    }

    const syncFromLocation = () => {
      setActive(window.location.hash === COMMUNITY_HASH);
    };

    syncFromLocation();
    const t1 = window.setTimeout(syncFromLocation, 0);
    const t2 = window.setTimeout(syncFromLocation, 150);

    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, [pathname]);

  function activateCommunity() {
    window.history.pushState(null, "", COMMUNITY_HREF);
    setActive(true);
    document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
  }

  function deactivateCommunity() {
    window.history.replaceState(null, "", "/");
    setActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return {
    isCommunityActive: pathname === "/" && active,
    activateCommunity,
    deactivateCommunity,
  };
}

function isPulseActive(pathname: string): boolean {
  return (
    pathname === "/magazine" ||
    pathname === "/podcast" ||
    pathname === "/vlogs"
  );
}

function isCommunityMenuActive(
  pathname: string,
  isTestimonialsActive: boolean,
): boolean {
  return (
    isTestimonialsActive ||
    pathname === "/challenge" ||
    pathname.startsWith("/challenge/")
  );
}

function isStandaloneNavActive(pathname: string, href: string): boolean {
  const path = href.split("#")[0];
  if (!path || path === "/") {
    return pathname === "/";
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

function isSubscribeActive(pathname: string): boolean {
  return (
    pathname === "/pricing" ||
    pathname === "/subscribe" ||
    pathname.startsWith("/waitlist")
  );
}

const menuContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function navTriggerClass(isActive: boolean, className?: string) {
  return cn(
    "inline-flex items-center gap-0.5 font-sans text-sm font-medium transition-colors duration-200 outline-none",
    isActive
      ? "text-ltl-accent"
      : "text-ltl-text-secondary hover:text-ltl-text-primary",
    className,
  );
}

function navDropdownItemClass(isActive: boolean) {
  return cn(
    "w-full cursor-pointer rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
    isActive
      ? "text-ltl-accent"
      : "text-ltl-text-secondary hover:bg-ltl-surface hover:text-ltl-text-primary",
  );
}

function NavLink({
  href,
  label,
  className,
  onClick,
  isActive = false,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={navTriggerClass(isActive, className)}
    >
      {label}
    </Link>
  );
}

function NavDropdown({
  label,
  isActive,
  items,
}: {
  label: string;
  isActive: boolean;
  items: NavDropdownItem[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={navTriggerClass(isActive)}>
        {label}
        <ChevronDown className="size-3.5 opacity-70" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="min-w-44 border border-ltl-border bg-ltl-bg p-1.5 text-ltl-text-primary shadow-lg ring-0"
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.href}
            render={
              <Link
                href={item.href}
                onClick={item.onClick}
                aria-current={item.isActive ? "page" : undefined}
                className={navDropdownItemClass(Boolean(item.isActive))}
              />
            }
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNavGroup({
  label,
  isActive,
  items,
  onItemClick,
  className,
}: {
  label: string;
  isActive: boolean;
  items: NavDropdownItem[];
  onItemClick?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavDropdownItem,
  ) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={cn(
          "font-label text-xs font-semibold uppercase tracking-wider",
          isActive ? "text-ltl-accent" : "text-ltl-text-secondary",
        )}
      >
        {label}
      </p>
      <div className="mt-3 flex flex-col gap-3 border-l border-ltl-border pl-4">
        {items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={item.isActive}
            onClick={(event) => onItemClick?.(event, item)}
            className="text-base"
          />
        ))}
      </div>
    </div>
  );
}

export function Navbar({ user }: { user: User | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isCommunityActive, activateCommunity, deactivateCommunity } =
    useCommunityNavActive();
  const loginHref = buildAuthHref("login", pathname, "");
  const signupHref = buildAuthHref("signup", pathname, "");

  const closeMobile = () => setMobileOpen(false);
  const subscribeActive = isSubscribeActive(pathname);
  const loginActive = pathname === "/login";
  const signupActive = pathname === "/signup";
  const pulseActive = isPulseActive(pathname);
  const communityMenuActive = isCommunityMenuActive(
    pathname,
    isCommunityActive,
  );

  const pulseItems: NavDropdownItem[] = pulseLinks.map((link) => ({
      ...link,
      isActive: pathname === link.href || pathname.startsWith(`${link.href}/`),
  }));

  const communityItems: NavDropdownItem[] = communityLinks.map((link) => ({
    ...link,
    isActive: link.hashTarget
      ? isCommunityActive
      : pathname === link.href || pathname.startsWith(`${link.href}/`),
  }));

  const displayName =
    (user?.user_metadata?.full_name as string | undefined)?.trim() ||
    user?.email ||
    "";

  function handleLogout() {
    if (user) {
      clearCadenceChatSession(user.id);
    }
  }

  function handleTestimonialsClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    closeMenu = false,
  ) {
    if (pathname === "/") {
      event.preventDefault();
      activateCommunity();
    }

    if (closeMenu) {
      closeMobile();
    }
  }

  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      event.preventDefault();
      deactivateCommunity();
    }
  }

  function withTestimonialsHandler(item: NavDropdownItem): NavDropdownItem {
    if (!item.hashTarget) {
      return item;
    }

    return {
      ...item,
      onClick: (event) => handleTestimonialsClick(event),
    };
  }

  function handleMobileDropdownItem(
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavDropdownItem,
  ) {
    if (item.hashTarget) {
      handleTestimonialsClick(event, true);
      return;
    }

    closeMobile();
  }

  function AuthActions({ className }: { className?: string }) {
    if (user) {
      return (
        <div className={cn("flex items-center gap-4", className)}>
          <span className="hidden max-w-[10rem] truncate text-sm text-ltl-text-secondary sm:inline">
            {displayName}
          </span>
          <form action={logout} onSubmit={handleLogout}>
            <Button
              type="submit"
              variant="ghost"
              className="text-ltl-text-secondary hover:bg-ltl-surface hover:text-ltl-text-primary"
            >
              Log out
            </Button>
          </form>
        </div>
      );
    }

    return (
      <div className={cn("flex items-center gap-4", className)}>
        <NavLink href={loginHref} label="Login" isActive={loginActive} />
        <Link
          href={signupHref}
          aria-current={signupActive ? "page" : undefined}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            signupActive
              ? "rounded-md border-ltl-accent bg-ltl-accent/15 font-medium text-ltl-accent hover:bg-ltl-accent/25"
              : "rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-surface",
          )}
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ltl-border bg-ltl-bg">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-heading text-xl font-semibold tracking-tight text-ltl-accent transition-opacity hover:opacity-90"
        >
          LTL Pulse
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <NavDropdown
            label="Pulse"
            isActive={pulseActive}
            items={pulseItems}
          />
          <NavDropdown
            label="Community"
            isActive={communityMenuActive}
            items={communityItems.map(withTestimonialsHandler)}
          />
          {standaloneNavLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={isStandaloneNavActive(pathname, link.href)}
            />
          ))}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <AuthActions />
          <Link
            href="/pricing"
            aria-current={subscribeActive ? "page" : undefined}
            className={cn(
              buttonVariants({ size: "default" }),
              subscribeActive
                ? "rounded-md border border-ltl-accent bg-ltl-accent/15 font-bold text-ltl-accent hover:bg-ltl-accent/25"
                : "rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
            )}
          >
            Subscribe
          </Link>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-ltl-text-primary hover:bg-ltl-surface hover:text-ltl-text-primary"
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full border-ltl-border bg-ltl-bg sm:max-w-xs"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>

            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="show"
              className="flex h-full flex-col gap-8 pt-10"
            >
              <div className="flex flex-col gap-8">
                <motion.div variants={menuItemVariants}>
                  <MobileNavGroup
                    label="Pulse"
                    isActive={pulseActive}
                    items={pulseItems}
                    onItemClick={(event) => {
                      closeMobile();
                    }}
                  />
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <MobileNavGroup
                    label="Community"
                    isActive={communityMenuActive}
                    items={communityItems.map(withTestimonialsHandler)}
                    onItemClick={handleMobileDropdownItem}
                  />
                </motion.div>
                {standaloneNavLinks.map((link) => (
                  <motion.div key={link.href} variants={menuItemVariants}>
                    <NavLink
                      href={link.href}
                      label={link.label}
                      onClick={closeMobile}
                      isActive={isStandaloneNavActive(pathname, link.href)}
                      className="text-lg"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={menuItemVariants}
                className="mt-auto flex flex-col gap-4 border-t border-ltl-border pt-6"
              >
                {user ? (
                  <>
                    <p className="truncate text-sm text-ltl-text-secondary">
                      {displayName}
                    </p>
                    <form action={logout} onSubmit={handleLogout}>
                      <Button
                        type="submit"
                        variant="outline"
                        className="h-11 w-full border-ltl-border text-ltl-text-primary hover:bg-ltl-surface"
                      >
                        Log out
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <NavLink
                      href={loginHref}
                      label="Login"
                      onClick={closeMobile}
                      isActive={loginActive}
                      className="text-base"
                    />
                    <Link
                      href={signupHref}
                      onClick={closeMobile}
                      aria-current={signupActive ? "page" : undefined}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        signupActive
                          ? "h-11 w-full rounded-md border-ltl-accent bg-ltl-accent/15 font-medium text-ltl-accent hover:bg-ltl-accent/25"
                          : "h-11 w-full rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-surface",
                      )}
                    >
                      Sign up
                    </Link>
                  </>
                )}
                <Link
                  href="/pricing"
                  onClick={closeMobile}
                  aria-current={subscribeActive ? "page" : undefined}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    subscribeActive
                      ? "h-11 w-full rounded-md border border-ltl-accent bg-ltl-accent/15 font-bold text-ltl-accent hover:bg-ltl-accent/25"
                      : "h-11 w-full rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
                  )}
                >
                  Subscribe
                </Link>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
