/**
 * Vlog access messaging — all vlogs require membership.
 * Podcasts stay free; two magazine playbooks are the only free editorial samples.
 */
export const VLOG_ACCESS_COPY = {
  pageSubtitle:
    "Short tactical videos — included with membership. No free vlog samples.",
  aboutDescription: "Premium video for leaders who want to go deeper — membership required.",
  ladderDescription:
    "Short, tactical videos when you want to see it in action — membership required.",
  cadenceBlurb:
    "All vlogs at /vlogs require membership. There are no free vlog samples — podcasts stay free, and only two magazine playbooks are free when their episodes drop.",
  card: {
    membersOnly: "Included with membership",
    membersOnlyCta: "See membership",
    upcoming: "Unlocks with episode",
  },
} as const;
