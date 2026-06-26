import { NextResponse } from "next/server";

import {
  CONCIERGE_TIER_CONFIG,
  getConciergeTier,
} from "@/lib/concierge/config";
import { getConciergeSystemPrompt } from "@/lib/concierge/prompts";
import type { ConciergeMessage } from "@/lib/concierge/types";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

const OPENAI_MODEL = "gpt-4o-mini";

function parseMessages(body: unknown): ConciergeMessage[] | null {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    return null;
  }

  const { messages } = body as { messages: unknown };

  if (!Array.isArray(messages)) {
    return null;
  }

  const parsed: ConciergeMessage[] = [];

  for (const message of messages) {
    if (
      !message ||
      typeof message !== "object" ||
      !("role" in message) ||
      !("content" in message)
    ) {
      return null;
    }

    const { role, content } = message as { role: unknown; content: unknown };

    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return null;
    }

    parsed.push({ role, content: content.trim() });
  }

  return parsed;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI Concierge is not configured yet." },
      { status: 500 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Sign in to use AI Concierge." },
      { status: 401 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = parseMessages(body);

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (messages.at(-1)?.role !== "user") {
    return NextResponse.json(
      { error: "The latest message must be from the user." },
      { status: 400 },
    );
  }

  const isSubscriber = await getIsSubscriber(user.id);
  const tier = getConciergeTier(isSubscriber);
  const config = CONCIERGE_TIER_CONFIG[tier];
  const userMessageCount = messages.filter((message) => message.role === "user").length;

  if (userMessageCount > config.maxUserMessages) {
    return NextResponse.json(
      {
        error:
          tier === "premium"
            ? "Conversation limit reached. Start a new chat to continue."
            : "Basic AI Concierge limit reached for this chat. Subscribe for Premium AI Concierge with longer conversations.",
        tier,
        limitReached: true,
      },
      { status: 429 },
    );
  }

  const context = messages.slice(-config.contextMessages);
  const openAiMessages = [
    { role: "system" as const, content: getConciergeSystemPrompt(tier) },
    ...context,
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_tokens: config.maxTokens,
        messages: openAiMessages,
      }),
    });

    const data = (await response.json()) as {
      error?: { message?: string };
      choices?: { message?: { content?: string } }[];
    };

    if (!response.ok) {
      console.error("OpenAI concierge error:", data);
      return NextResponse.json(
        { error: data.error?.message ?? "AI Concierge is temporarily unavailable." },
        { status: 500 },
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "No response from AI Concierge." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: reply,
      tier,
      tierLabel: config.label,
      remainingMessages: config.maxUserMessages - userMessageCount,
    });
  } catch (error) {
    console.error("Concierge request failed:", error);
    return NextResponse.json(
      { error: "AI Concierge is temporarily unavailable." },
      { status: 500 },
    );
  }
}
