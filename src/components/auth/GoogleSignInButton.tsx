"use client";

import { createClient } from "@/lib/supabase/client";
import { buildAuthRedirectCookie } from "@/lib/auth/redirect-cookie";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { getSiteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";

interface GoogleSignInButtonProps {
  next?: string;
}

export function GoogleSignInButton({ next = "/" }: GoogleSignInButtonProps) {
  async function handleGoogleSignIn() {
    const supabase = createClient();
    const redirectPath = getSafeRedirectPath(next);

    if (redirectPath !== "/") {
      document.cookie = buildAuthRedirectCookie(redirectPath);
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(redirectPath)}`,
      },
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      className="h-11 w-full border-ltl-border bg-ltl-bg text-ltl-text-primary hover:bg-ltl-surface"
    >
      Continue with Google
    </Button>
  );
}
