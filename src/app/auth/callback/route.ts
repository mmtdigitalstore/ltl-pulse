import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_REDIRECT_COOKIE } from "@/lib/auth/redirect-cookie";
import { getPostAuthRedirect, getSafeRedirectPath } from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const cookieStore = await cookies();
  const cookieNext = cookieStore.get(AUTH_REDIRECT_COOKIE)?.value;
  const next = getSafeRedirectPath(searchParams.get("next") ?? cookieNext);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const response = NextResponse.redirect(
        `${origin}${getPostAuthRedirect(next)}`,
      );
      response.cookies.set(AUTH_REDIRECT_COOKIE, "", {
        maxAge: 0,
        path: "/",
      });
      return response;
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=auth_callback_failed&next=${encodeURIComponent(next)}`,
  );
}
