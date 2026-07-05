// =============================================================================
// LTL Pulse — Problems map (single source of truth)
// Powers: homepage band, content library tags, Cadence routing.
// =============================================================================

import {
  isPodcastReleased,
  PODCAST_RELEASE_ORDER,
  PODCAST_SEASON_EPISODE_COUNT,
  type PodcastReleaseOptions,
} from "@/lib/content/podcast-release";

export type Audience = "smb" | "coach";
export type ExpertId = "dawn" | "jackie" | "lashley" | "joshua";

export const experts: Record<
  ExpertId,
  {
    name: string;
    /** Short line under the name on About (e.g. "Team Lead · LTL Pulse"). */
    title: string;
    /** One-line specialty — shown on Contact and under credentials on About. */
    tagline: string;
    /** Optional richer copy for the homepage Meet the Experts card. */
    homepageTagline?: string;
    bestFor: string;
    /** Optional richer best-for line for the homepage Meet the Experts card. */
    homepageBestFor?: string;
    /** Problem-framed lane line for the homepage Meet the Experts card. */
    homepageLane?: string;
    contactBio: string;
    /** LinkedIn or other public profile — hide social link when blank. */
    socialUrl?: string;
  }
> = {
  dawn: {
    name: "Dawn Kirk",
    title: "Team Lead · LTL Pulse",
    tagline:
      "People, culture, leader development & client-flow systems.",
    homepageTagline:
      "People, culture, leader development & client-flow systems — where retention slips, revenue stays feast-or-famine, and new leaders need more than good intentions.",
    bestFor:
      "Turnover, culture, new leaders & feast-or-famine pipelines (start with WebScore)",
    homepageBestFor:
      "Turnover & retention, feast-or-famine revenue, doer-to-leader transitions & culture under growth pressure",
    homepageLane:
      "Keeping people, building culture & client-flow systems",
    contactBio:
      "Dawn helps when people or pipeline chaos is costing you — retention, culture, developing leaders, and client-flow systems that start with a WebScore diagnostic, then build the backend for repeat clients.",
    socialUrl: "https://www.linkedin.com/in/dawn-kirk-training",
  },
  jackie: {
    name: "Jackie John",
    title: "Leadership & DISC Coach · LTL Pulse",
    tagline:
      "Customer experience, team communication & DISC — fixing friction where your people and customers actually interact.",
    bestFor:
      "Team misalignment, communication breakdowns & losing customers at the front line",
    homepageLane:
      "Customer experience, communication & team alignment",
    contactBio:
      "Jackie helps when teams talk past each other, communication is costing you results, or one bad customer moment becomes a pattern.",
    socialUrl: "https://www.linkedin.com/in/jamerijohn",
  },
  lashley: {
    name: "Dr. Sylvan Lashley",
    title: "Strategic Scaling Expert · LTL Pulse",
    tagline:
      "Organizational structure, accountability & financial durability — when growth has outrun your systems and everything bottlenecks at you.",
    bestFor:
      "Scaling chaos, unclear roles, governance & financial sustainability under growth",
    homepageLane: "Scaling with structure & financial durability",
    contactBio:
      "Dr. Lashley helps when you're growing but running on chaos — roles, decision rights, accountability, and financial durability need to catch up with demand.",
    socialUrl: "https://www.linkedin.com/in/sylvan-lashley-95257649",
  },
  joshua: {
    name: "Joshua Ogbonnia",
    title: "Growth & Innovation Expert · LTL Pulse",
    tagline:
      "Venture growth, market repositioning & innovation strategy — when you've plateaued and need a new market play or digital offer, not a client-flow operating system.",
    bestFor:
      "Plateaued ventures, market repositioning, edtech/innovation & strategic AI adoption",
    homepageLane: "Growth, modernizing & standing out",
    contactBio:
      "Joshua helps when growth has stalled at the market level — new ventures, repositioning, edtech and innovation strategy, and practical AI for competing in a shifting market.",
    socialUrl: "https://www.linkedin.com/in/joshuamogbonnia",
  },
};

export interface Problem {
  id: string;
  audience: Audience[];
  owner: ExpertId;
  secondary?: ExpertId;
  hook: string;
  podcast: string;
  magazine: string;
  vlog: string;
  cadenceChip: string;
  cadenceReply: string;
  tier: "free" | "member" | "pro" | "executive";
}

export const problems: Problem[] = [
  {
    id: "where-leadership-meets-culture",
    audience: ["smb", "coach"],
    owner: "dawn",
    secondary: "lashley",
    hook: "You're building a business — but leadership and culture are the engine that makes it last.",
    podcast: "Where leadership meets culture",
    magazine: "The Culture Engine: how leadership and culture compound over time",
    vlog: "Three culture signals your team sends before anyone quits",
    cadenceChip: "Culture & leadership foundation",
    cadenceReply:
      "Culture isn't a poster on the wall — it's what happens when you're not in the room. This Full Table conversation opens Season 1 with the whole LTL team. Start here when you want the big picture before the deep dives.",
    tier: "member",
  },
  {
    id: "losing-customers",
    audience: ["smb"],
    owner: "jackie",
    secondary: "dawn",
    hook: "You're losing customers to one bad interaction — and you can't be everywhere at once.",
    podcast: "Why one bad moment loses a customer",
    magazine: "The Frontline Playbook: turning every interaction into loyalty",
    vlog: "3 phrases that save a customer",
    cadenceChip: "Losing customers",
    cadenceReply:
      "That usually traces back to frontline moments your team handles without you. Start with this free conversation with Jackie, our communication coach — it'll give you something to use today. When you're ready, I can go deeper.",
    tier: "member",
  },
  {
    id: "feast-or-famine",
    audience: ["smb", "coach"],
    owner: "dawn",
    secondary: "jackie",
    hook: "Your revenue is feast-or-famine — how you win clients lives in your head, not in a system.",
    podcast: "From feast-or-famine to a full pipeline",
    magazine: "Build Your Client-Flow System: CRM, social & reputation that compound",
    vlog: "The 15-minute client-flow audit",
    cadenceChip: "Inconsistent clients / income",
    cadenceReply:
      "Feast-or-famine almost always means there's no client-flow system yet — just hustle. Dawn starts with WebScore to measure your digital footprint, then builds the pipeline backend inside her THRIVE framework (CRM, reputation, follow-up, AI-enabled management). Here's a free conversation to start; the full system lives in Pro.",
    tier: "pro",
  },
  {
    id: "turnover",
    audience: ["smb"],
    owner: "dawn",
    secondary: "lashley",
    hook: "Your best people keep leaving — and you're not sure why.",
    podcast: "Why your best people leave",
    magazine: "The Real Cost of Turnover — and a retention system that works",
    vlog: "The 'stay conversation', on camera",
    cadenceChip: "People keep leaving",
    cadenceReply:
      "Turnover is expensive and usually preventable. Dawn's work on culture and retention gets to the why. Start with this Full Table conversation — then I can point you to the deeper playbook.",
    tier: "pro",
  },
  {
    id: "new-to-leading",
    audience: ["smb", "coach"],
    owner: "dawn",
    secondary: "lashley",
    hook: "You were great at the work, got promoted — and nobody taught you to lead.",
    podcast: "The leadership no one trained you for",
    magazine: "From Doer to Leader: the first 90 days of leading people",
    vlog: "Your first week leading people",
    cadenceChip: "New to leading people",
    cadenceReply:
      "Almost every leader starts here — strong at the craft, unsure with people. Dawn's THRIVE approach is built for exactly this. Have a listen, free; the full system is in Pro.",
    tier: "pro",
  },
  {
    id: "scaling-chaos",
    audience: ["smb"],
    owner: "lashley",
    secondary: "dawn",
    hook: "You're growing — but it's chaos, and everything still runs through you.",
    podcast: "Growing without the chaos",
    magazine: "Scaling with Structure: roles, decision rights & accountability",
    vlog: "Draw your whole org on one page",
    cadenceChip: "Growth feels chaotic",
    cadenceReply:
      "When growth outruns your structure, everything bottlenecks at you. Dr. Lashley has scaled large organizations and translates that to growing businesses. Start free here; deeper work happens in Pro or an advisory session.",
    tier: "pro",
  },
  {
    id: "stalled-growth",
    audience: ["smb", "coach"],
    owner: "joshua",
    secondary: "jackie",
    hook: "Business has plateaued — you need a new offer or model, not just more hustle.",
    podcast: "New offer, new model",
    magazine: "The Modernization Checklist: tech, brand & AI for small business",
    vlog: "A founder's AI starter kit",
    cadenceChip: "Stuck / need to grow",
    cadenceReply:
      "Plateaus at the market level often call for repositioning or a new digital offer — not just more activity. Joshua is our venture and innovation voice for that shift. Here's a free conversation to spark ideas; Pro goes further. (If the issue is feast-or-famine pipeline chaos, Dawn's THRIVE and WebScore lane is the better fit.)",
    tier: "pro",
  },
  {
    id: "team-misaligned",
    audience: ["smb"],
    owner: "jackie",
    hook: "Your team talks past each other — and it's costing you in errors and friction.",
    podcast: "From talking past each other to a team that delivers",
    magazine: "Reading the Room: DISC for teams that actually align",
    vlog: "Spot your team's DISC styles in 5 minutes",
    cadenceChip: "Team's not aligned",
    cadenceReply:
      "Most 'people problems' are really communication-style mismatches. Jackie uses the Maxwell DISC method to fix exactly this. Start with this free conversation; team mapping is available through Pro or advisory.",
    tier: "pro",
  },
  {
    id: "leading-change",
    audience: ["smb", "coach"],
    owner: "joshua",
    secondary: "jackie",
    hook: "The world's changing fast — AI, new expectations — and you're trying to keep up.",
    podcast: "Keeping a modern edge with AI",
    magazine: "Future-Ready: leading your business through the next decade",
    vlog: "Leading when everything's shifting",
    cadenceChip: "Keeping up with change / AI",
    cadenceReply:
      "When AI, tech, and market expectations shift faster than your strategy, you need a practical lens — not hype. Joshua leads this conversation on LTL Pulse. Start free here; deeper work spans Pro and Executive.",
    tier: "member",
  },
  {
    id: "leadership-life-plan",
    audience: ["smb", "coach"],
    owner: "lashley",
    secondary: "dawn",
    hook: "You're successful on paper — but without a life plan, burnout and drift are inevitable.",
    podcast: "Get a Leadership Life Plan",
    magazine: "The Leadership Life Plan: designing a career that lasts",
    vlog: "Three questions for your next five years",
    cadenceChip: "No life plan / burnout risk",
    cadenceReply:
      "Success without a life plan eventually catches up. Dr. Lashley leads this Full Table conversation on building a leadership life plan that outlasts the next quarter. Start free here; deeper advisory work is available when you're ready.",
    tier: "pro",
  },
  {
    id: "webscore-found-online",
    audience: ["smb", "coach"],
    owner: "dawn",
    hook: "Great work doesn't show up online — prospects can't find you or choose you.",
    podcast: "Getting found & chosen online (WebScore)",
    magazine: "WebScore to Pipeline: getting found and chosen online",
    vlog: "Your 15-minute WebScore walkthrough",
    cadenceChip: "Not getting found online",
    cadenceReply:
      "If prospects can't find you or understand why to choose you, pipeline stays feast-or-famine. Dawn starts with WebScore to measure your digital footprint, then maps the gaps. Here's a free conversation to start; the full client-flow system lives in Pro.",
    tier: "pro",
  },
  {
    id: "planning-backwards",
    audience: ["smb", "coach"],
    owner: "lashley",
    secondary: "joshua",
    hook: "Big goals feel overwhelming until you plan backwards from the outcome you want.",
    podcast: "Planning Backwards",
    magazine: "Planning Backwards: from vision to weekly moves",
    vlog: "Start at the finish line",
    cadenceChip: "Big goals feel overwhelming",
    cadenceReply:
      "When the goal is big and the path is fuzzy, planning backwards turns vision into weekly moves. Dr. Lashley closes Season 1 with this Full Table conversation. Start free here; we can go deeper in Pro or advisory.",
    tier: "pro",
  },
];

/** Magazine articles that stay ungated as tasters (subscribers get full access). */
export const FREE_MAGAZINE_PROBLEM_IDS = new Set([
  "losing-customers",
  "feast-or-famine",
]);

export function problemsFor(audience: Audience): Problem[] {
  return problems.filter((p) => p.audience.includes(audience));
}

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export const FEATURED_PODCAST_IDS = [
  "losing-customers",
  "feast-or-famine",
  "turnover",
] as const;

/** Problems surfaced on the homepage "Sound familiar?" band (~5 cards). */
export const FEATURED_PROBLEM_IDS = [
  "losing-customers",
  "feast-or-famine",
  "turnover",
  "new-to-leading",
  "scaling-chaos",
] as const;

export function featuredProblems(): Problem[] {
  return FEATURED_PROBLEM_IDS.map((id) => getProblemById(id)).filter(
    (p): p is Problem => p != null,
  );
}

export function getFeaturedProblems(count = 3): Problem[] {
  return problems.slice(0, count);
}

/** Top three problem-led podcasts for the homepage featured band (released only). */
export function getFeaturedPodcastProblems(): Problem[] {
  return FEATURED_PODCAST_IDS.map((id) => getProblemById(id))
    .filter((p): p is Problem => p != null)
    .filter((p) => isPodcastReleased(p.id));
}

/** Season order — released and upcoming conversations for the podcast page. */
export function getPodcastSeasonProblems(): Problem[] {
  return PODCAST_RELEASE_ORDER.map((id) => getProblemById(id)).filter(
    (p): p is Problem => p != null,
  );
}

export function getReleasedPodcastProblems(
  now: Date = new Date(),
  options?: PodcastReleaseOptions,
): Problem[] {
  return getPodcastSeasonProblems().filter((problem) =>
    isPodcastReleased(problem.id, now, options),
  );
}

export { PODCAST_SEASON_EPISODE_COUNT };

export function getPodcastHref(problemId: string): string {
  return `/podcast#${problemId}`;
}

export function getExpertHref(expertId: ExpertId): string {
  return `/about#${expertId}`;
}

export function getConciergeHref(expertId?: ExpertId): string {
  return expertId ? `/concierge?expert=${expertId}` : "/concierge";
}

/** First name for copy — "Dr. Lashley" for titled names, otherwise the given name. */
export function getExpertShortName(expertId: ExpertId): string {
  const parts = experts[expertId].name.split(/\s+/);
  if (parts[0] === "Dr." && parts.length >= 2) {
    return `Dr. ${parts[parts.length - 1]}`;
  }
  return parts[0] ?? experts[expertId].name;
}

export function parseExpertId(value: string | undefined | null): ExpertId | null {
  if (value && value in experts) {
    return value as ExpertId;
  }
  return null;
}

export function problemsForExpert(audience: Audience, expertId: ExpertId): Problem[] {
  return problemsFor(audience).filter((problem) => problem.owner === expertId);
}

export const EXPERT_IDS: ExpertId[] = ["dawn", "jackie", "lashley", "joshua"];
