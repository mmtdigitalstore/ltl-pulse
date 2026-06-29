// =============================================================================
// LTL Pulse — Testimonials configuration (single source of truth)
// -----------------------------------------------------------------------------

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  org?: string;
  /** Optional link to the sharer's company or public profile. */
  companyUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  /** Only `approved` entries render on the homepage wall. */
  status: "approved" | "pending";
}

export interface Spotlight {
  id: string;
  name: string;
  role: string;
  org?: string;
  work: string;
  shift: string;
  href?: string;
  avatarUrl?: string;
  status: "approved" | "pending";
}

export const testimonialsCopy = {
  kicker: "From the Pulse community",
  heading: "Leaders on what shifted",
  subhead:
    "Not reviews — real changes in how our community leads. Borrow whatever’s useful to you.",
  cta: { label: "Add your voice", href: "/share" },
  ctaNote: "Share one thing you lead differently now — help the next leader.",
  emptyWall:
    "Leaders are sharing what shifted for them. Add your voice and help the next owner or coach lead differently.",
};

/** Approved member spotlights — add rows with status: "approved" only. */
export const spotlights: Spotlight[] = [];

/**
 * Approved shift-quotes for the homepage wall.
 * Do not add sample or placeholder entries. Each row needs explicit consent.
 */
export const testimonials: Testimonial[] = [];

export function approvedSpotlights(): Spotlight[] {
  return spotlights.filter((spotlight) => spotlight.status === "approved");
}

export function approvedTestimonials(): Testimonial[] {
  return testimonials.filter((testimonial) => testimonial.status === "approved");
}
