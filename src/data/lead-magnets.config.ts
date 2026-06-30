import { getSiteUrl } from "@/lib/site";

export type LeadMagnetId = "stop-the-turnover-guide";

export type LeadMagnetConfig = {
  id: LeadMagnetId;
  title: string;
  status: "live" | "waitlist";
  pdfPath: string;
};

export const TURNOVER_GUIDE_LEAD_MAGNET: LeadMagnetConfig = {
  id: "stop-the-turnover-guide",
  title: "Stop the Turnover: 5 conversations that keep your best people",
  status: "live",
  pdfPath: "/lead-magnets/stop-the-turnover-guide.pdf",
};

export const LEAD_MAGNETS_BY_ID: Record<LeadMagnetId, LeadMagnetConfig> = {
  [TURNOVER_GUIDE_LEAD_MAGNET.id]: TURNOVER_GUIDE_LEAD_MAGNET,
};

export function getLeadMagnetById(id: string): LeadMagnetConfig | null {
  return LEAD_MAGNETS_BY_ID[id as LeadMagnetId] ?? null;
}

export function getLeadMagnetDownloadUrl(magnet: LeadMagnetConfig): string {
  return `${getSiteUrl()}${magnet.pdfPath}`;
}
