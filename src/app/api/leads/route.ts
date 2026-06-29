import { NextResponse } from "next/server";

import { TURNOVER_GUIDE_LEAD_MAGNET } from "@/data/lead-magnets.config";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_LEAD_MAGNETS = new Set([TURNOVER_GUIDE_LEAD_MAGNET.id]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      leadMagnet?: string;
    };

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const leadMagnet = String(body.leadMagnet ?? TURNOVER_GUIDE_LEAD_MAGNET.id).trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    if (!ALLOWED_LEAD_MAGNETS.has(leadMagnet)) {
      return NextResponse.json({ error: "Unknown lead magnet." }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("leads").upsert(
      {
        email,
        lead_magnet: leadMagnet,
        tag: "waitlist",
        source: "homepage",
      },
      { onConflict: "email,lead_magnet" },
    );

    if (error) {
      console.error("[leads] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Unable to save your request right now. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      status: "waitlist",
      leadMagnet,
    });
  } catch (error) {
    console.error("[leads] handler error:", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
