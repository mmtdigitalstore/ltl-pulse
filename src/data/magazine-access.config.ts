/**
 * Magazine access messaging — Strategy A.
 * Podcasts are always free. Two magazine playbooks are free when their episodes drop.
 * Membership unlocks the full magazine library. Keep site copy in sync here.
 */
export const MAGAZINE_ACCESS_COPY = {
  pageSubtitle:
    "One playbook per LTL Conversation. Two are free when their episodes drop; membership unlocks the full library.",
  aboutDescription:
    "Weekly playbooks that go deeper than the podcast. Two are free with select episodes; membership includes the rest.",
  ladderDescription:
    "Weekly playbooks — two free with select episodes; membership unlocks the library.",
  freeTierFeature: "Two magazine playbooks (with select free episodes)",
  cadenceBlurb:
    "Magazine playbooks unlock with each weekly episode. Two are free with their episodes; membership covers the full library.",
  card: {
    freeSample: "Free with this episode",
    membersOnly: "Included with membership",
    membersOnlyCta: "See membership",
    upcoming: "Unlocks with episode",
  },
} as const;
