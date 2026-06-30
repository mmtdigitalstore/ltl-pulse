import { Resend } from "resend";

import {
  getLeadMagnetById,
  getLeadMagnetDownloadUrl,
  type LeadMagnetConfig,
} from "@/data/lead-magnets.config";

function getFromAddress(): string {
  return (
    process.env.LEAD_MAGNET_FROM_EMAIL?.trim() ||
    "LTL Pulse <onboarding@resend.dev>"
  );
}

function buildEmailText(magnet: LeadMagnetConfig, downloadUrl: string): string {
  return [
    "Hi there,",
    "",
    `Thanks for grabbing "${magnet.title}" from LTL Pulse.`,
    "",
    "Download your guide:",
    downloadUrl,
    "",
    "You'll also find practical podcasts, magazine reads, and Cadence — our AI concierge — on the site when you're ready for your next step.",
    "",
    "— The LTL Pulse team",
    "https://ltl-pulse.vercel.app",
  ].join("\n");
}

function buildEmailHtml(magnet: LeadMagnetConfig, downloadUrl: string): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; line-height: 1.6; max-width: 560px;">
      <p style="margin: 0 0 16px;">Hi there,</p>
      <p style="margin: 0 0 16px;">
        Thanks for grabbing <strong>${magnet.title}</strong> from LTL Pulse.
      </p>
      <p style="margin: 0 0 24px;">
        <a href="${downloadUrl}" style="display: inline-block; background: #c9a227; color: #0f0f0f; text-decoration: none; font-weight: 700; padding: 12px 20px; border-radius: 6px;">
          Download your guide (PDF)
        </a>
      </p>
      <p style="margin: 0 0 16px; font-size: 14px; color: #555;">
        Or copy this link:<br />
        <a href="${downloadUrl}" style="color: #8a6d12; word-break: break-all;">${downloadUrl}</a>
      </p>
      <p style="margin: 24px 0 0; font-size: 14px; color: #555;">
        — The LTL Pulse team<br />
        <a href="https://ltl-pulse.vercel.app" style="color: #8a6d12;">ltl-pulse.vercel.app</a>
      </p>
    </div>
  `.trim();
}

export async function sendLeadMagnetEmail({
  email,
  leadMagnetId,
}: {
  email: string;
  leadMagnetId: string;
}): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return { sent: false, error: "Missing RESEND_API_KEY." };
  }

  const magnet = getLeadMagnetById(leadMagnetId);

  if (!magnet || magnet.status !== "live") {
    return { sent: false, error: "Lead magnet is not available." };
  }

  const downloadUrl = getLeadMagnetDownloadUrl(magnet);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: email,
    subject: `Your free guide: ${magnet.title}`,
    html: buildEmailHtml(magnet, downloadUrl),
    text: buildEmailText(magnet, downloadUrl),
  });

  if (error) {
    console.error("[lead-magnet] Resend error:", error);
    return { sent: false, error: error.message };
  }

  return { sent: true };
}
