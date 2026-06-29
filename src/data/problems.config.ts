// =============================================================================
// LTL Pulse — Problems map (single source of truth)
// Powers: homepage band, content library tags, Cadence routing.
// =============================================================================

export type Audience = "smb" | "coach";
export type ExpertId = "dawn" | "jackie" | "lashley" | "joshua";

export const experts: Record<
  ExpertId,
  { name: string; role: string; bestFor: string }
> = {
  dawn: {
    name: "Dawn Kirk",
    role: "People, culture, brand & client-flow systems",
    bestFor: "Keeping people, building culture & client-flow systems",
  },
  jackie: {
    name: "Jackie John",
    role: "Customer experience, communication & team dynamics (DISC)",
    bestFor: "Customer experience, communication & team alignment",
  },
  lashley: {
    name: "Dr. Sylvan Lashley",
    role: "Scaling with structure, accountability & financial durability",
    bestFor: "Scaling with structure & financial durability",
  },
  joshua: {
    name: "Joshua Ogbonnia",
    role: "Entrepreneurship, growth & modernizing with tech/AI",
    bestFor: "Growth, modernizing & standing out",
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
    secondary: "joshua",
    hook: "Your revenue is feast-or-famine — winning clients lives in your head, not in a system.",
    podcast: "From feast-or-famine to a full pipeline: building a client-flow system",
    magazine: "Build Your Client-Flow System: CRM, social & reputation that compound",
    vlog: "The 15-minute client-flow audit",
    cadenceChip: "Inconsistent clients / income",
    cadenceReply:
      "Feast-or-famine almost always means there's no system yet — just hustle. Dawn's client-flow approach (CRM, social, reputation) turns that into something repeatable. Here's a free conversation to start; the full framework lives in Pro.",
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
      "Plateaus usually mean it's time to modernize how you reach people. Joshua builds and scales ventures and is our future-ready voice. Here's a free conversation to spark ideas; Pro goes further.",
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
    secondary: "dawn",
    hook: "The world's changing fast — AI, new expectations — and you're trying to keep up.",
    podcast: "Leading through change you didn't ask for",
    magazine: "Future-Ready: leading your business through the next decade",
    vlog: "Leading when everything's shifting",
    cadenceChip: "Keeping up with change / AI",
    cadenceReply:
      "Change is the one constant now, and leading through it is a skill you can build. This free conversation is a strong start; our team goes deeper across Pro and Executive.",
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

export function getPodcastHref(problemId: string): string {
  return `/podcast#${problemId}`;
}

export const EXPERT_IDS: ExpertId[] = ["dawn", "jackie", "lashley", "joshua"];
