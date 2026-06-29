import {
  experts,
  getPodcastHref,
  type Audience,
  type Problem,
} from "@/data/problems.config";

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
    "",
    `${expert.name} is our go-to expert for this.`,
  ];

  if (options.isSubscriber && problem.tier === "member") {
    lines.push(
      "",
      `Members also get the magazine deep-dive on this: /magazine`,
    );
  } else if (problem.tier === "member") {
    lines.push("", "Members get the full magazine deep-dive on this — /pricing");
  } else if (problem.tier === "pro") {
    lines.push(
      "",
      "The complete framework lives in Pro — see /pricing when you're ready.",
    );
  } else if (problem.tier === "executive") {
    lines.push(
      "",
      "Executive members get priority expert matching on topics like this.",
    );
  }

  lines.push(
    "",
    `Or connect with ${expert.name} directly — no pressure: /contact`,
  );

  return lines.join("\n");
}

export const CADENCE_GREETING =
  "Hi, I'm Cadence, your leadership concierge at LTL Pulse. Whether you're running a business or coaching others to grow theirs, I'll point you straight to what helps — no fluff, no hard sell. First, which sounds more like you?";

export const CADENCE_PROBLEM_PROMPT =
  "Love it. What's weighing on you most right now?";

export const AUDIENCE_LABELS: Record<Audience, string> = {
  smb: "I run or lead a business",
  coach: "I'm a coach or trainer",
};
