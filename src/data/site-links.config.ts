// =============================================================================
// LTL Pulse — External site links (footer, etc.)
// Set NEXT_PUBLIC_YOUTUBE_CHANNEL_URL when the channel is live.
// =============================================================================

export const siteLinks = {
  youtubeChannelUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL?.trim() || undefined,
} as const;
