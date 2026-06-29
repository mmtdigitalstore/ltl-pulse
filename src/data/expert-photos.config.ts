import type { ExpertId } from "@/data/problems.config";

export const EXPERT_PHOTOS: Record<ExpertId, { src: string; alt: string }> = {
  dawn: {
    src: "/team/dawn-kirk-executive.jpg",
    alt: "Dawn Kirk, Team Lead of LTL Pulse",
  },
  lashley: {
    src: "/team/sylvan-lashley.jpg",
    alt: "Dr. Sylvan Lashley, Strategic Leadership Expert at LTL Pulse",
  },
  jackie: {
    src: "/team/jackie-john.jpg",
    alt: "Jackie John, Leadership and DISC Coach at LTL Pulse",
  },
  joshua: {
    src: "/team/joshua-ogbonnia.jpg",
    alt: "Joshua Ogbonnia, Entrepreneurship and Innovation Expert at LTL Pulse",
  },
};
