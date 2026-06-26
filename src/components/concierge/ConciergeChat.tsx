"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONCIERGE_TIER_CONFIG } from "@/lib/concierge/config";
import type { ConciergeMessage } from "@/lib/concierge/types";
import { cn } from "@/lib/utils";

const STARTER_PROMPTS = [
  "How do I build trust with a new team?",
  "What makes a strong leadership culture?",
  "What does LTL Pulse offer subscribers?",
] as const;

interface ConciergeChatProps {
  isSubscriber: boolean;
}

export function ConciergeChat({ isSubscriber }: ConciergeChatProps) {
  const tier = isSubscriber ? "premium" : "free";
  const tierConfig = CONCIERGE_TIER_CONFIG[tier];
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userMessageCount = messages.filter((message) => message.role === "user").length;
  const atLimit = userMessageCount >= tierConfig.maxUserMessages;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || loading || atLimit) {
      return;
    }

    const nextMessages: ConciergeMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data: {
        message?: string;
        error?: string;
        limitReached?: boolean;
      } = await response.json();

      if (!response.ok || !data.message) {
        setError(data.error ?? "Unable to reach AI Concierge.");
        setMessages(messages);
        return;
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message! },
      ]);
    } catch {
      setError("Unable to reach AI Concierge. Please try again.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleNewChat() {
    setMessages([]);
    setError(null);
    setInput("");
  }

  return (
    <div className="mt-10 flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-label text-xs uppercase tracking-wider",
              isSubscriber
                ? "border-ltl-accent/40 bg-ltl-accent/10 text-ltl-accent"
                : "border-ltl-border bg-ltl-surface text-ltl-text-secondary",
            )}
          >
            <Bot className="size-3.5" aria-hidden />
            {tierConfig.label}
          </span>
          <span className="text-sm text-ltl-text-secondary">
            {userMessageCount}/{tierConfig.maxUserMessages} messages this chat
          </span>
        </div>

        {messages.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleNewChat}
            className="border-ltl-border text-ltl-text-primary hover:bg-ltl-surface"
          >
            New chat
          </Button>
        )}
      </div>

      {!isSubscriber && (
        <p className="mb-4 rounded-md border border-ltl-border bg-ltl-surface px-4 py-3 text-sm text-ltl-text-secondary">
          Basic AI Concierge answers general leadership questions.{" "}
          <Link href="/subscribe" className="font-medium text-ltl-accent hover:underline">
            Subscribe
          </Link>{" "}
          for Premium AI Concierge — deeper guidance and richer LTL content connections.
        </p>
      )}

      <div className="flex min-h-[24rem] flex-col rounded-lg border border-ltl-border bg-ltl-surface">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 && (
            <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-full border border-ltl-border bg-ltl-bg text-ltl-accent">
                <Bot className="size-7" aria-hidden />
              </div>
              <div className="max-w-md space-y-2">
                <p className="font-heading text-xl text-ltl-text-primary">
                  Ask your AI Concierge
                </p>
                <p className="text-sm text-ltl-text-secondary">
                  Leadership questions, platform guidance, and perspective from
                  AI Concierge — tuned to your membership level.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    disabled={loading}
                    className="rounded-full border border-ltl-border bg-ltl-bg px-3 py-1.5 text-left text-xs text-ltl-text-secondary transition-colors hover:border-ltl-accent/40 hover:text-ltl-text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                "max-w-[90%] rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                message.role === "user"
                  ? "ml-auto bg-ltl-accent text-ltl-bg"
                  : "mr-auto border border-ltl-border bg-ltl-bg text-ltl-text-primary",
              )}
            >
              {message.content}
            </div>
          ))}

          {loading && (
            <div className="mr-auto max-w-[90%] rounded-lg border border-ltl-border bg-ltl-bg px-4 py-3 text-sm text-ltl-text-secondary">
              Thinking…
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-ltl-border p-4"
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              atLimit
                ? "Message limit reached — start a new chat"
                : "Ask about leadership, culture, or LTL Pulse with AI Concierge…"
            }
            disabled={loading || atLimit}
            rows={2}
            className="min-h-11 flex-1 resize-none rounded-lg border border-ltl-border bg-ltl-bg px-3 py-2 text-sm text-ltl-text-primary placeholder:text-ltl-text-secondary outline-none focus-visible:border-ltl-accent focus-visible:ring-2 focus-visible:ring-ltl-accent/30 disabled:opacity-50"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void sendMessage(input);
              }
            }}
          />
          <Button
            type="submit"
            disabled={loading || atLimit || !input.trim()}
            className="h-auto shrink-0 rounded-md bg-ltl-accent px-4 text-ltl-bg hover:bg-ltl-accent-hover disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>

      {error && (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      )}

      {atLimit && !isSubscriber && (
        <p className="mt-3 text-center text-sm text-ltl-text-secondary">
          Want longer conversations and richer answers?{" "}
          <Link href="/subscribe" className="font-medium text-ltl-accent hover:underline">
            Upgrade to Premium AI Concierge
          </Link>
        </p>
      )}
    </div>
  );
}
