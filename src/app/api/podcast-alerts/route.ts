import { NextResponse } from "next/server";

import { PODCAST_SEASON_ALERT_ID } from "@/data/podcast-alerts.config";
import { sendPodcastAlertEmail } from "@/lib/email/send-podcast-alert-email";
import { createAdminClient } from "@/lib/supabase/admin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(["homepage", "podcast"]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const source = String(body.source ?? "podcast").trim();

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    if (!ALLOWED_SOURCES.has(source)) {
      return NextResponse.json({ error: "Invalid source." }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("leads").upsert(
      {
        email,
        lead_magnet: PODCAST_SEASON_ALERT_ID,
        tag: "podcast-alert",
        source,
      },
      { onConflict: "email,lead_magnet" },
    );

    if (error) {
      console.error("[podcast-alerts] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Unable to save your request right now. Please try again." },
        { status: 500 },
      );
    }

    const emailResult = await sendPodcastAlertEmail(email);

    if (!emailResult.sent) {
      console.error("[podcast-alerts] email delivery failed:", emailResult.error);
    }

    return NextResponse.json({
      ok: true,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    console.error("[podcast-alerts] handler error:", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
