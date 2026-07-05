import {
  CADENCE_BOUNDARIES,
  CADENCE_EXPERT_ROUTING,
  CADENCE_GUIDE_BEHAVIOR,
  CADENCE_RECEPTIONIST_BEHAVIOR,
  CADENCE_ROLE,
} from "@/lib/concierge/guardrails";
import { buildPodcastPipelineContext } from "@/lib/concierge/podcast-pipeline";
import { buildSiteServicesContext } from "@/lib/concierge/site-services";
import { buildSiteSpotlightContext } from "@/lib/concierge/site-spotlight";
import { getCadenceKnowledge } from "@/lib/concierge/knowledge";
import { buildAdvisoryKnowledgeSection } from "@/lib/concierge/advisory";
import { problems, getExpertHref, getPodcastHref } from "@/data/problems.config";
import { isPodcastReleased } from "@/lib/content/podcast-release";
import type { ConciergeTier } from "@/lib/concierge/types";

function buildCadenceKnowledgeContext(now: Date = new Date()): string {
  const podcastPipeline = buildPodcastPipelineContext(now);
  const siteSpotlight = buildSiteSpotlightContext(now);
  const siteServices = buildSiteServicesContext();

  const releasedProblems = `Released conversations (recommend when they match the user's need):
${problems
  .filter((p) => isPodcastReleased(p.id, now))
  .map(
    (p) =>
      `- ${p.id}: ${p.cadenceChip} → podcast ${getPodcastHref(p.id)}, expert ${getExpertHref(p.owner)}`,
  )
  .join("\n") || "(None live yet — cite Podcast pipeline and Site spotlight for upcoming episodes.)"}`;

  return `Background knowledge (internal only — never dump wholesale; reference naturally when relevant):

${getCadenceKnowledge()}

${buildAdvisoryKnowledgeSection()}

${siteSpotlight}

${siteServices}

${podcastPipeline}

${releasedProblems}`;
}

const BASE_PROMPT_STATIC = `${CADENCE_ROLE}

${CADENCE_BOUNDARIES}

${CADENCE_GUIDE_BEHAVIOR}

${CADENCE_RECEPTIONIST_BEHAVIOR}

${CADENCE_EXPERT_ROUTING}`;

const FREE_PROMPT_STATIC = `Tier: Cadence Basic (free member).
- Orient users to the platform: Magazine (/magazine), Podcast (/podcast), Vlogs (/vlogs), and membership (/subscribe).
- Podcast pipeline, homepage promo, and featured episode details are in your Site spotlight and Podcast pipeline sections — use them; never claim you lack this information.
- Answer factual questions about LTL, LTL Pulse, the team, and how to navigate the site using your knowledge base.
- For brand- and platform-fit questions, give a useful short answer (2–4 sentences), then invite Cadence Premium and /subscribe for deeper plans, scripts, templates, and follow-up. Vary the wording.
- For questions that need judgment, strategy, or personalized counsel, clarify intent and route to the matching consultant's bio (/about#dawn, /about#jackie, /about#lashley, /about#joshua) — do not play the consultant yourself.
- When users ask about advisory bundles, coaching packages, consulting, or enterprise engagements, share the Advisory & Enterprise offerings and price ranges from your knowledge base, then route to the best-fit consultant and /contact for follow-up.
- When routing to a human, link to their /about# bio first; use /contact only when they want to reach out directly.`;

const PREMIUM_PROMPT_STATIC = `Tier: Cadence Premium (active subscriber).
- Provide richer platform navigation: help them find the right content area, theme, consultant, or experience track for their need.
- Connect requests to LTL Pulse content types: Magazine (/magazine), Podcast (/podcast), Vlogs (/vlogs).
- Podcast pipeline, homepage promo, and featured episode details are in your Site spotlight and Podcast pipeline sections — cite episode titles and unlock dates from those sections.
- Prioritize human consultant handoff for any question that requires judgment, strategy, or personalized counsel — link to the consultant's /about# bio; use /contact when they want to reach out.
- When users ask about advisory bundles, coaching, consulting, or enterprise engagements, share the Advisory & Enterprise offerings and price ranges from your knowledge base, then route to the best-fit consultant.
- Subscribers expect thoughtful facilitation; take an extra sentence to clarify intent before routing.`;

export function getConciergeSystemPrompt(
  tier: ConciergeTier,
  now: Date = new Date(),
): string {
  const knowledge = buildCadenceKnowledgeContext(now);
  const tierPrompt = tier === "premium" ? PREMIUM_PROMPT_STATIC : FREE_PROMPT_STATIC;

  return `${BASE_PROMPT_STATIC}

${knowledge}

${tierPrompt}`;
}
