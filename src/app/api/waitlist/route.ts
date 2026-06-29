import { NextResponse } from "next/server";

import { waitlistPlanIds } from "@/app/waitlist/waitlist.config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, name, plan } = await request.json();

    const cleanEmail = String(email ?? "")
      .trim()
      .toLowerCase();
    const cleanPlan = String(plan ?? "").trim() || undefined;
    const cleanName = String(name ?? "").trim() || undefined;

    if (!EMAIL_PATTERN.test(cleanEmail)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    if (cleanPlan && !waitlistPlanIds.includes(cleanPlan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const lead = {
      email: cleanEmail,
      name: cleanName,
      plan: cleanPlan,
      source: "waitlist",
      tag: "founding",
      createdAt: new Date().toISOString(),
    };

    // TODO: persist lead in the database (e.g. Supabase `waitlist_leads` table).
    // Dedupe on email + plan so repeat clicks don't create duplicates:
    // await supabase.from("waitlist_leads").upsert(lead, { onConflict: "email,plan" });

    // TODO: add to your email provider (Mailchimp, ConvertKit, Resend audience, etc.)
    // tagged with the plan + "founding".
    // await mailProvider.addContact(cleanEmail, { tags: [lead.plan ?? "general", "founding"] });

    // TODO: when a tier opens, email that segment: "Your founding rate is ready."

    void lead;

    return NextResponse.json({ ok: true, plan: cleanPlan ?? null });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
