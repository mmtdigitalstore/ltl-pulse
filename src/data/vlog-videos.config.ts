/**
 * Vlog media URLs — fill in when each batch is uploaded (MP4 path or embed URL).
 * Keys match problem ids in problems.config.ts.
 */
export const VLOG_VIDEO_SOURCES: Partial<Record<string, string>> = {
  // Example after upload:
  // "losing-customers": "/vlogs/losing-customers.mp4",
  // "feast-or-famine": "https://player.vimeo.com/video/…?autoplay=1",
};

export function getVlogVideoSrc(problemId: string): string | undefined {
  const src = VLOG_VIDEO_SOURCES[problemId]?.trim();
  return src || undefined;
}

export function isVlogEmbedUrl(src: string): boolean {
  return /vimeo\.com|youtube\.com|youtu\.be|player\./i.test(src);
}
