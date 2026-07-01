import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/AuthForm";
import { getPostAuthRedirect, getSafeRedirectPath } from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/server";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const next = getSafeRedirectPath(params.next);

  if (user) {
    redirect(getPostAuthRedirect(next));
  }

  const callbackError =
    params.error === "auth_callback_failed"
      ? "Authentication failed. Please try signing in again."
      : undefined;

  return (
    <div className="ltl-theme-platform ltl-blackblue-atmosphere ltl-section-glow ltl-glow-editorial relative flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-16">
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl ltl-theme-magazine ltl-media-container rounded-2xl px-8 py-10 sm:px-12 sm:py-12">
        <AuthForm mode="login" callbackError={callbackError} next={next} />
      </div>
    </div>
  );
}
