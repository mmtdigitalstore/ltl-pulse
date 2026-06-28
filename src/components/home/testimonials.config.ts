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
}

export const testimonialsCopy = {
  kicker: "From the Pulse community",
  heading: "Leaders on what shifted",
  subhead:
    "Not reviews — real changes in how our community leads. Borrow whatever’s useful to you.",
  cta: { label: "Add your voice", href: "/share" },
  ctaNote: "Share one thing you lead differently now — help the next leader.",
};

// Add spotlights here when you have approved, permissioned member stories.
export const spotlights: Spotlight[] = [];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I stopped solving my team’s problems for them. Now I ask one good question and wait — and they lead themselves.",
    author: "Jordan",
    role: "Director of Operations",
  },
  {
    id: "t2",
    quote:
      "We rebuilt our meeting rhythm around values instead of status updates. Retention is the highest it has ever been.",
    author: "Alicia",
    role: "People & Culture Lead",
  },
  {
    id: "t3",
    quote:
      "DISC didn’t just label my team — it changed how I hand off work. Fewer dropped balls, far less friction.",
    author: "David",
    role: "Engineering Manager",
  },
];
