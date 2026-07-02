import { createClient } from "@/lib/supabase/server";

function parseTeamAdminEmails(): Set<string> {
  const raw = process.env.TEAM_ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isTeamAdminEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  return parseTeamAdminEmails().has(email.trim().toLowerCase());
}

/** True when the signed-in user may preview unreleased season episodes on-site. */
export async function canPreviewAllPodcasts(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return false;
  }

  if (isTeamAdminEmail(user.email)) {
    return true;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_team_admin")
    .eq("id", user.id)
    .maybeSingle();

  return profile?.is_team_admin === true;
}
