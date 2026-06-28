import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, plan } = await request.json();

    const cleanEmail = String(email ?? "")
      .trim()
      .toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!emailOk) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const lead = {
      email: cleanEmail,
      name: String(name ?? "").trim() || undefined,
      plan: String(plan ?? "").trim() || undefined,
      source: "waitlist",
      createdAt: new Date().toISOString(),
    };

    // TODO: persist `lead` in the database (e.g. Supabase `waitlist_leads` table).
    // Dedupe on email + plan so repeat clicks don't create duplicates:
    // await supabase.from("waitlist_leads").upsert(lead, { onConflict: "email,plan" });

    // TODO: add to your email provider (Mailchimp, ConvertKit, Resend audience, etc.)
    // tagged with the plan + "founding".
    // await mailProvider.addContact(cleanEmail, { tags: [lead.plan, "founding"] });

    // TODO: when a tier opens, email that segment: "Your founding rate is ready."

    void lead;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
