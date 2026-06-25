/** Project root only — never include /rest/v1 or /auth/v1 suffixes. */
export function getSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!raw) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Set it in .env.local and Vercel.",
    );
  }

  return raw.replace(/\/rest\/v1\/?$/, "").replace(/\/auth\/v1\/?$/, "").replace(/\/$/, "");
}

export function getSupabasePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Set it in .env.local and Vercel.",
    );
  }

  return key;
}
