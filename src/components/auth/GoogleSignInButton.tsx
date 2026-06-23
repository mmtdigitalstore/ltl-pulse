"use client";

import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  async function handleGoogleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getSiteUrl()}/auth/callback`,
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
