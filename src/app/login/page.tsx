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
    <div className="ltl-auth-atmosphere relative flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-ltl-bg px-4 py-16">
      <div className="relative z-10">
        <AuthForm mode="login" callbackError={callbackError} next={next} />
      </div>
    </div>
  );
}
