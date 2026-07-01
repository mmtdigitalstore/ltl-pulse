"use client";

import Link from "next/link";
import { useActionState } from "react";

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { AuthRedirectCapture } from "@/components/auth/AuthRedirectCapture";
import { login, signup, type AuthState } from "@/app/auth/actions";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState: AuthState = {};

interface AuthFormProps {
  mode: "login" | "signup";
  callbackError?: string;
  next?: string;
}

export function AuthForm({ mode, callbackError, next = "/" }: AuthFormProps) {
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState(action, initialState);
  const redirectPath = getSafeRedirectPath(next);
  const nextQuery =
    redirectPath !== "/" ? `?next=${encodeURIComponent(redirectPath)}` : "";

  const title = mode === "login" ? "Welcome back" : "Create your account";
  const description =
    mode === "login"
      ? redirectPath === "/concierge"
        ? "Sign in and you'll return to Cadence, your AI Concierge, to start chatting."
        : "Sign in to access LTL Pulse content."
      : redirectPath === "/concierge"
        ? "Create your account, then sign in to chat with Cadence, your AI Concierge."
        : "Join LTL Pulse for leadership insights and exclusive media.";
  const submitLabel = mode === "login" ? "Sign in" : "Create account";
  const alternateHref = mode === "login" ? `/signup${nextQuery}` : `/login${nextQuery}`;
  const alternateLabel =
    mode === "login" ? "Create an account" : "Already have an account? Sign in";

  return (
    <Card className="w-full border-transparent bg-transparent shadow-none ring-0">
      <CardHeader className="space-y-3 px-0 pt-0 text-center">
        <CardTitle className="font-heading text-3xl text-ltl-accent">
          {title}
        </CardTitle>
        <CardDescription className="text-ltl-text-secondary">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <AuthRedirectCapture redirectPath={redirectPath} />
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="next" value={redirectPath} />
          {mode === "signup" && (
            <div className="space-y-2">
              <label
                htmlFor="full_name"
                className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary"
              >
                Name
              </label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
                className="h-11 border-ltl-border bg-ltl-bg text-ltl-text-primary placeholder:text-ltl-text-secondary"
              />
            </div>
          )}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              className="h-11 border-ltl-border bg-ltl-bg text-ltl-text-primary placeholder:text-ltl-text-secondary"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              placeholder="••••••••"
              required
              minLength={6}
              className="h-11 border-ltl-border bg-ltl-bg text-ltl-text-primary placeholder:text-ltl-text-secondary"
            />
          </div>

          {(callbackError || state.error) && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {callbackError ?? state.error}
            </p>
          )}

          {state.success && (
            <div className="space-y-3">
              <p className="rounded-md border border-ltl-accent/30 bg-ltl-accent/10 px-3 py-2 text-sm text-ltl-text-primary">
                {redirectPath === "/concierge"
                  ? "Account created. Check your email to confirm, then sign in to chat with Cadence."
                  : state.success}
              </p>
              {redirectPath === "/concierge" && (
                <Link
                  href={`/login?next=${encodeURIComponent(redirectPath)}`}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "inline-flex h-10 w-full items-center justify-center rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
                  )}
                >
                  Continue to sign in
                </Link>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={pending}
            className={cn(
              "h-11 w-full rounded-md bg-ltl-accent font-bold text-ltl-bg hover:bg-ltl-accent-hover",
              pending && "opacity-70",
            )}
          >
            {pending ? "Please wait…" : submitLabel}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ltl-border" />
          <span className="font-label text-xs uppercase tracking-wider text-ltl-text-secondary">
            or
          </span>
          <div className="h-px flex-1 bg-ltl-border" />
        </div>

        <GoogleSignInButton next={redirectPath} />

        <p className="mt-6 text-center text-sm text-ltl-text-secondary">
          <Link
            href={alternateHref}
            className="font-medium text-ltl-accent transition-colors hover:text-ltl-accent-hover"
          >
            {alternateLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
