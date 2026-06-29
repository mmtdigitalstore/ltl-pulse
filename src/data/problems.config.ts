// =============================================================================
// LTL Pulse — Problems map (single source of truth)
// Powers: homepage band, content library tags, Cadence routing.
// =============================================================================

export type Audience = "smb" | "coach";
export type ExpertId = "dawn" | "jackie" | "lashley" | "joshua";

export const experts: Record<
  ExpertId,
  {
    name: string;
    /** Short line under the name on About (e.g. "Team Lead · LTL Pulse"). */
    title: string;
    /** One-line specialty — shown on homepage, Contact, and under credentials on About. */
    tagline: string;
    bestFor: string;
    contactBio: string;
  }
> = {
  dawn: {
    name: "Dawn Kirk",
    title: "Team Lead · LTL Pulse",
    tagline:
      "People, culture, leader development & client-flow systems.",
    bestFor:
      "Turnover, culture, new leaders & feast-or-famine pipelines (start with WebScore)",
    contactBio:
      "Dawn helps when people or pipeline chaos is costing you — retention, culture, developing leaders, and client-flow systems that start with a WebScore diagnostic, then build the backend for repeat clients.",
  },
  jackie: {
    name: "Jackie John",
    title: "Leadership & DISC Coach · LTL Pulse",
    tagline:
      "Customer experience, team communication & DISC — fixing friction where your people and customers actually interact.",
    bestFor:
      "Team misalignment, communication breakdowns & losing customers at the front line",
    contactBio:
      "Jackie helps when teams talk past each other, communication is costing you results, or one bad customer moment becomes a pattern.",
  },
  lashley: {
    name: "Dr. Sylvan Lashley",
    title: "Strategic Scaling Expert · LTL Pulse",
    tagline:
      "Organizational structure, accountability & financial durability — when growth has outrun your systems and everything bottlenecks at you.",
    bestFor:
      "Scaling chaos, unclear roles, governance & financial sustainability under growth",
    contactBio:
      "Dr. Lashley helps when you're growing but running on chaos — roles, decision rights, accountability, and financial durability need to catch up with demand.",
  },
  joshua: {
    name: "Joshua Ogbonnia",
    title: "Growth & Innovation Expert · LTL Pulse",
    tagline:
      "Venture growth, market repositioning & innovation strategy — when you've plateaued and need a new market play or digital offer, not a client-flow operating system.",
    bestFor:
      "Plateaued ventures, market repositioning, edtech/innovation & strategic AI adoption",
    contactBio:
      "Joshua helps when growth has stalled at the market level — new ventures, repositioning, edtech and innovation strategy, and practical AI for competing in a shifting market.",
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
    id: "losing-customers",
    audience: ["smb"],
    owner: "jackie",
    secondary: "dawn",
    hook: "You're losing customers to one bad interaction — and you can't be everywhere at once.",
    podcast: "Why one bad moment loses a customer — and how great teams prevent it",
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
    hook: "Your revenue is feast-or-famine — winning clients lives in your head, not in a system.",
    podcast: "From feast-or-famine to a full pipeline: building a client-flow system",
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
    podcast: "Why your best people quit — and the conversations that keep them",
    magazine: "The Real Cost of Turnover — and a retention system that works",
    vlog: "The 'stay conversation', on camera",
    cadenceChip: "People keep leaving",
    cadenceReply:
      "Turnover is expensive and usually preventable. Dawn's work on culture and retention gets to the why. Start with this free conversation — then I can point you to the deeper playbook.",
    tier: "pro",
  },
  {
    id: "new-to-leading",
    audience: ["smb", "coach"],
    owner: "dawn",
    secondary: "lashley",
    hook: "You were great at the work, got promoted — and nobody taught you to lead.",
    podcast: "Suddenly the boss: leading well when you were never trained to",
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
    podcast: "Growing without the chaos: building structure that scales",
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
    hook: "Business has plateaued — you need to modernize and actually get noticed.",
    podcast: "Stuck and unseen: modernizing a business that's plateaued",
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
    podcast: "When your team talks past each other (and what DISC fixes)",
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
    podcast: "Leading through change you didn't ask for",
    magazine: "Future-Ready: leading your business through the next decade",
    vlog: "Leading when everything's shifting",
    cadenceChip: "Keeping up with change / AI",
    cadenceReply:
      "When AI, tech, and market expectations shift faster than your strategy, you need a practical lens — not hype. Joshua leads this conversation on LTL Pulse. Start free here; deeper work spans Pro and Executive.",
    tier: "member",
  },
];

/** Vlog titles that stay ungated as tasters. */
export const FREE_VLOG_PROBLEM_IDS = new Set(["losing-customers", "feast-or-famine"]);

export function problemsFor(audience: Audience): Problem[] {
  return problems.filter((p) => p.audience.includes(audience));
}

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getFeaturedProblems(count = 3): Problem[] {
  return problems.slice(0, count);
}

/** Problems surfaced on the homepage "Sound familiar?" band. */
export const HOMEPAGE_PROBLEM_COUNT = 4;

export function getHomepageProblems(count = HOMEPAGE_PROBLEM_COUNT): Problem[] {
  return problems.slice(0, count);
}

export function getPodcastHref(problemId: string): string {
  return `/podcast#${problemId}`;
}

export function getExpertHref(expertId: ExpertId): string {
  return `/about#${expertId}`;
}

export const EXPERT_IDS: ExpertId[] = ["dawn", "jackie", "lashley", "joshua"];
