import { NextResponse } from "next/server";

import { TURNOVER_GUIDE_LEAD_MAGNET } from "@/data/lead-magnets.config";
import { sendLeadMagnetEmail } from "@/lib/email/send-lead-magnet";
import { createAdminClient } from "@/lib/supabase/admin";

function isAuthorized(request: Request): boolean {
  const secret = process.env.LEAD_MAGNET_DISPATCH_SECRET?.trim();

  if (!secret) {
    return false;
  }

  const header = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  return header === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("email")
      .eq("lead_magnet", TURNOVER_GUIDE_LEAD_MAGNET.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[leads/backfill] Supabase query error:", error);
      return NextResponse.json(
        { error: "Unable to load saved leads." },
        { status: 500 },
      );
    }

    const emails = [...new Set((leads ?? []).map((row) => row.email.trim().toLowerCase()))];
    const results: { email: string; sent: boolean; error?: string }[] = [];

    for (const email of emails) {
      const result = await sendLeadMagnetEmail({
        email,
        leadMagnetId: TURNOVER_GUIDE_LEAD_MAGNET.id,
      });

      results.push({
        email,
        sent: result.sent,
        error: result.error,
      });
    }

    const sent = results.filter((row) => row.sent).length;
    const failed = results.filter((row) => !row.sent);

    return NextResponse.json({
      ok: true,
      total: emails.length,
      sent,
      failed: failed.length,
      failures: failed,
    });
  } catch (error) {
    console.error("[leads/backfill] handler error:", error);
    return NextResponse.json({ error: "Backfill failed." }, { status: 500 });
  }
}
