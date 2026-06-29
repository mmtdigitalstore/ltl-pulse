import {
  experts,
  getExpertHref,
  getPodcastHref,
  type Audience,
  type ExpertId,
  type Problem,
} from "@/data/problems.config";

function expertShortName(expertId: ExpertId): string {
  return experts[expertId].name.replace(/^Dr\.\s+/i, "").split(" ")[0] ?? experts[expertId].name;
}

export function buildCadenceExpertGreeting(expertId: ExpertId): string {
  const expert = experts[expertId];
  const lane = expert.homepageLane ?? expert.tagline;

  return `👋 You wanted to connect with **${expert.name}** — ${lane}. I'll point you to free help in ${expertShortName(expertId)}'s lane first. Which sounds more like you?`;
}

export function buildCadenceExpertProblemPrompt(expertId: ExpertId): string {
  return `Great. What's weighing on you most in ${expertShortName(expertId)}'s lane right now?`;
}

export function buildCadenceIntakeReply(
  problem: Problem,
  options: { isSubscriber: boolean },
): string {
  const expert = experts[problem.owner];
  const podcastHref = getPodcastHref(problem.id);
  const lines = [
    problem.cadenceReply,
    "",
    `Free listen — ${problem.podcast}`,
    podcastHref,
  ];

  if (options.isSubscriber && problem.tier === "member") {
    lines.push(
      "",
      `Members get the full magazine deep-dive on this: ${problem.magazine}`,
      "/magazine",
    );
  } else if (problem.tier === "member") {
    lines.push("", "Members get the full magazine deep-dive on this — /pricing");
  } else if (problem.tier === "pro") {
    lines.push(
      "",
      "The complete framework lives in Pro — want me to show you? /pricing",
    );
  } else if (problem.tier === "executive") {
    lines.push(
      "",
      "Executive members get priority expert matching on topics like this.",
    );
  }

  lines.push(
    "",
    `Or I can connect you with ${expert.name} directly — no pressure.`,
    getExpertHref(problem.owner),
  );

  return lines.join("\n");
}

export const CADENCE_GREETING =
  "👋 Hi, I'm **Cadence**, your leadership concierge at LTL Pulse. Whether you're running a business or coaching others to grow theirs, I'll point you straight to what helps — no fluff, no hard sell. First, which sounds more like you?";

export const CADENCE_PROBLEM_PROMPT =
  "Love it. What's weighing on you most right now?";

export const AUDIENCE_LABELS: Record<Audience, string> = {
  smb: "I run or lead a business",
  coach: "I'm a coach or trainer",
};
