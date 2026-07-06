/**
 * Vlog card play interaction — thumbnail + play control, then video (or placeholder).
 * Uses LTL Pulse brand tokens (charcoal, gold accent, brand blue).
 *
 * Video files: add URLs in `vlog-videos.config.ts` when each batch is uploaded.
 */
export const VLOG_PLAYER_CONFIG = {
  placeholder: {
    title: "Video publishes with this episode",
    body: "Your membership includes this vlog — the file will appear here once the weekly package is live.",
  },
  thumbnail: {
    /** Poster gradient behind the play control */
    baseClass:
      "bg-gradient-to-br from-ltl-bg via-ltl-surface to-ltl-brand/35",
    /** Soft gold lift under the play button */
    glowClass:
      "bg-[radial-gradient(circle_at_50%_55%,rgba(255,180,0,0.18)_0%,transparent_62%)]",
  },
  play: {
    overlayClass:
      "bg-ltl-brand/20 transition-colors group-hover:bg-ltl-brand/10",
    buttonClass:
      "flex size-16 items-center justify-center rounded-full border border-ltl-accent/40 bg-ltl-accent text-ltl-bg shadow-[0_8px_28px_rgba(255,180,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-ltl-accent-hover sm:size-20",
    revealDurationMs: 300,
    revealShellClass: "bg-ltl-bg",
  },
  card: {
    playableHoverClass:
      "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-ltl-accent/35 hover:shadow-lg hover:shadow-[rgba(255,180,0,0.12)]",
  },
} as const;
