import {
  CADENCE_BOUNDARIES,
  CADENCE_EXPERT_ROUTING,
  CADENCE_GUIDE_BEHAVIOR,
  CADENCE_RECEPTIONIST_BEHAVIOR,
  CADENCE_ROLE,
} from "@/lib/concierge/guardrails";
import { getCadenceKnowledge } from "@/lib/concierge/knowledge";
import { buildAdvisoryKnowledgeSection } from "@/lib/concierge/advisory";
import { problems, getExpertHref, getPodcastHref } from "@/data/problems.config";
import type { ConciergeTier } from "@/lib/concierge/types";

const PROBLEMS_CONTEXT = `Problem routing (use for content recommendations — titles only, from this list):
${problems
  .map(
    (p) =>
      `- ${p.id}: ${p.cadenceChip} → free podcast ${getPodcastHref(p.id)}, expert bio ${getExpertHref(p.owner)}`,
  )
  .join("\n")}`;

const CADENCE_KNOWLEDGE_CONTEXT = `Background knowledge (internal only — never dump wholesale; reference naturally when relevant):

${getCadenceKnowledge()}

${buildAdvisoryKnowledgeSection()}

${PROBLEMS_CONTEXT}`;

const BASE_PROMPT = `${CADENCE_ROLE}

${CADENCE_BOUNDARIES}

${CADENCE_GUIDE_BEHAVIOR}

${CADENCE_RECEPTIONIST_BEHAVIOR}

${CADENCE_EXPERT_ROUTING}

${CADENCE_KNOWLEDGE_CONTEXT}`;

const FREE_PROMPT = `${BASE_PROMPT}

Tier: Cadence Basic (free member).
- Orient users to the platform: Magazine (/magazine), Podcast (/podcast), Vlogs (/vlogs), and membership (/subscribe).
- Answer factual questions about LTL, LTL Pulse, the team, and how to navigate the site using your knowledge base.
- For brand- and platform-fit questions, give a useful short answer (2–4 sentences), then invite Cadence Premium and /subscribe for deeper plans, scripts, templates, and follow-up. Vary the wording.
- For questions that need judgment, strategy, or personalized counsel, clarify intent and route to the matching consultant's bio (/about#dawn, /about#jackie, /about#lashley, /about#joshua) — do not play the consultant yourself.
- When users ask about advisory bundles, coaching packages, consulting, or enterprise engagements, share the Advisory & Enterprise offerings and price ranges from your knowledge base, then route to the best-fit consultant and /contact for follow-up.
- When routing to a human, link to their /about# bio first; use /contact only when they want to reach out directly.`;

const PREMIUM_PROMPT = `${BASE_PROMPT}

Tier: Cadence Premium (active subscriber).
- Provide richer platform navigation: help them find the right content area, theme, consultant, or experience track for their need.
- Connect requests to LTL Pulse content types: Magazine (/magazine), Podcast (/podcast), Vlogs (/vlogs).
- You may reference themes and consultants from your knowledge base but do not fabricate specific article or episode titles unless provided in the conversation.
- Prioritize human consultant handoff for any question that requires judgment, strategy, or personalized counsel — link to the consultant's /about# bio; use /contact when they want to reach out.
- When users ask about advisory bundles, coaching, consulting, or enterprise engagements, share the Advisory & Enterprise offerings and price ranges from your knowledge base, then route to the best-fit consultant.
- Subscribers expect thoughtful facilitation; take an extra sentence to clarify intent before routing.`;

export function getConciergeSystemPrompt(tier: ConciergeTier): string {
  return tier === "premium" ? PREMIUM_PROMPT : FREE_PROMPT;
}
