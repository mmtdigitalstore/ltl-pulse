import { NextResponse } from "next/server";

const MAX_AUDIO_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

function normalizeCompanyUrl(raw: string): string | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const quote = String(form.get("quote") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const org = String(form.get("org") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const companyUrlRaw = String(form.get("companyUrl") ?? "").trim();
    const consent = form.get("consent") != null;
    const audio = form.get("audio");
    const video = form.get("video");

    if (!quote || !name || !role) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: "Consent is required." }, { status: 400 });
    }

    if (quote.length > 280) {
      return NextResponse.json({ error: "Quote too long." }, { status: 400 });
    }

    let companyUrl: string | undefined;
    if (companyUrlRaw) {
      companyUrl = normalizeCompanyUrl(companyUrlRaw);
      if (!companyUrl) {
        return NextResponse.json({ error: "Invalid company link." }, { status: 400 });
      }
    }

    let audioUrl: string | undefined;

    if (audio instanceof File && audio.size > 0) {
      if (!audio.type.startsWith("audio/") || audio.size > MAX_AUDIO_BYTES) {
        return NextResponse.json({ error: "Invalid audio file." }, { status: 400 });
      }

      // TODO: upload to storage (S3, Cloudflare R2, Supabase Storage, etc.)
      // const bytes = Buffer.from(await audio.arrayBuffer());
      // audioUrl = await uploadToStorage(bytes, audio.type, "audio");
    }

    let videoUrl: string | undefined;

    if (video instanceof File && video.size > 0) {
      if (!video.type.startsWith("video/") || video.size > MAX_VIDEO_BYTES) {
        return NextResponse.json({ error: "Invalid video file." }, { status: 400 });
      }

      // TODO: upload to storage (S3, Cloudflare R2, Supabase Storage, etc.)
      // const bytes = Buffer.from(await video.arrayBuffer());
      // videoUrl = await uploadToStorage(bytes, video.type, "video");
    }

    const submission = {
      quote,
      author: name,
      role,
      org: org || undefined,
      email: email || undefined,
      companyUrl,
      audioUrl,
      videoUrl,
      consent: true,
      status: "pending" as const,
      submittedAt: new Date().toISOString(),
    };

    // TODO: save `submission` to the database (e.g. Supabase `testimonials` table).
    // await supabase.from("testimonials").insert(submission);

    // TODO: notify the team when a submission arrives for moderation.
    // await notifyTeam(submission);

    // TODO: approving a row (status = "approved") should make it eligible for
    // TestimonialsSection — swap static config for a DB query when ready.

    void submission;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
