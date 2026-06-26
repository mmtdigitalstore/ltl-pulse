"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { logout } from "@/app/auth/actions";
import { buildAuthHref } from "@/lib/auth/redirect";
import { clearCadenceChatSession } from "@/lib/concierge/session";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/magazine", label: "Magazine" },
  { href: "/podcast", label: "Podcast" },
  { href: "/vlogs", label: "Vlogs" },
  { href: "/concierge", label: "Cadence" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

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

function NavLink({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-sans text-sm font-medium text-ltl-text-secondary transition-colors duration-200 hover:text-ltl-text-primary",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar({ user }: { user: User | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const loginHref = buildAuthHref("login", pathname, "");
  const signupHref = buildAuthHref("signup", pathname, "");

  const closeMobile = () => setMobileOpen(false);

  const displayName =
    (user?.user_metadata?.full_name as string | undefined)?.trim() ||
    user?.email ||
    "";

  function handleLogout() {
    if (user) {
      clearCadenceChatSession(user.id);
    }
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
        <NavLink href={loginHref} label="Login" />
        <Link
          href={signupHref}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-surface",
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
          className="font-heading text-xl font-semibold tracking-tight text-ltl-accent transition-opacity hover:opacity-90"
        >
          LTL Pulse
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <AuthActions />
          <Link
            href="/subscribe"
            className={cn(
              buttonVariants({ size: "default" }),
              "rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
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
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={menuItemVariants}>
                    <NavLink
                      href={link.href}
                      label={link.label}
                      onClick={closeMobile}
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
                      className="text-base"
                    />
                    <Link
                      href={signupHref}
                      onClick={closeMobile}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-11 w-full rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-surface",
                      )}
                    >
                      Sign up
                    </Link>
                  </>
                )}
                <Link
                  href="/subscribe"
                  onClick={closeMobile}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
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
