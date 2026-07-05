import { Resend } from "resend";

import { PROMO_VIDEOS } from "@/data/promo.config";
import { getSiteUrl } from "@/lib/site";

function getFromAddress(): string {
  return (
    process.env.LEAD_MAGNET_FROM_EMAIL?.trim() ||
    "LTL Pulse <onboarding@resend.dev>"
  );
}

function buildEmailText(): string {
  const episode = PROMO_VIDEOS.episode01;
  const siteUrl = getSiteUrl();

  return [
    "Hi there,",
    "",
    "You're on the LTL Pulse Season 1 alert list.",
    "",
    `We'll email you when ${episode.title} goes live (${episode.description}).`,
    "",
    `Season schedule: ${siteUrl}/podcast`,
    "",
    "— The LTL Pulse team",
    siteUrl,
  ].join("\n");
}

function buildEmailHtml(): string {
  const episode = PROMO_VIDEOS.episode01;
  const siteUrl = getSiteUrl();

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; line-height: 1.6; max-width: 560px;">
      <p style="margin: 0 0 16px;">Hi there,</p>
      <p style="margin: 0 0 16px;">
        You're on the <strong>LTL Pulse Season 1</strong> alert list.
      </p>
      <p style="margin: 0 0 24px;">
        We'll email you when <strong>${episode.title}</strong> goes live —
        ${episode.description}.
      </p>
      <p style="margin: 0 0 24px;">
        <a href="${siteUrl}/podcast" style="display: inline-block; background: #ffb400; color: #151518; text-decoration: none; font-weight: 700; padding: 12px 20px; border-radius: 6px;">
          View the season schedule
        </a>
      </p>
      <p style="margin: 24px 0 0; font-size: 14px; color: #555;">
        — The LTL Pulse team<br />
        <a href="${siteUrl}" style="color: #8a6d12;">${siteUrl.replace(/^https?:\/\//, "")}</a>
      </p>
    </div>
  `.trim();
}

export async function sendPodcastAlertEmail(
  email: string,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return { sent: false, error: "Missing RESEND_API_KEY." };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: email,
    subject: "You're on the LTL Pulse Season 1 alert list",
    html: buildEmailHtml(),
    text: buildEmailText(),
  });

  if (error) {
    console.error("[podcast-alert] Resend error:", error);
    return { sent: false, error: error.message };
  }

  return { sent: true };
}
