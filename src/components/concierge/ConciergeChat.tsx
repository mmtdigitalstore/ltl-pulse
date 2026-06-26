"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import { ConciergeAvatar } from "@/components/concierge/ConciergeAvatar";
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
  autoFocusInput?: boolean;
}

export function ConciergeChat({
  isSubscriber,
  autoFocusInput = false,
}: ConciergeChatProps) {
  const tier = isSubscriber ? "premium" : "free";
  const tierConfig = CONCIERGE_TIER_CONFIG[tier];
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userMessageCount = messages.filter((message) => message.role === "user").length;
  const atLimit = userMessageCount >= tierConfig.maxUserMessages;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (autoFocusInput) {
      inputRef.current?.focus();
    }
  }, [autoFocusInput]);

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
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col">
      {!isSubscriber && (
        <p className="mb-3 rounded-md border border-ltl-accent/40 bg-ltl-accent/15 px-3 py-2 text-xs text-ltl-accent">
          Basic AI Concierge ·{" "}
          <Link
            href="/subscribe?from=concierge"
            className="font-semibold underline-offset-2 hover:underline"
          >
            Subscribe for Premium AI Concierge
          </Link>
        </p>
      )}

      <div className="flex max-h-[min(32rem,70vh)] flex-col overflow-hidden rounded-lg border border-ltl-border bg-ltl-surface">
        <div className="flex items-center justify-between gap-3 border-b border-ltl-border bg-ltl-bg/80 px-3 py-2.5 sm:px-4">
          <ConciergeAvatar isActive={!loading} size="sm" />
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-ltl-text-secondary sm:inline">
              {userMessageCount}/{tierConfig.maxUserMessages} messages
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 font-label text-[0.65rem] uppercase tracking-wider",
                isSubscriber
                  ? "border-ltl-accent/50 bg-ltl-accent/20 text-ltl-accent"
                  : "border-ltl-accent/45 bg-ltl-accent/15 text-ltl-accent",
              )}
            >
              {tierConfig.label}
            </span>
            {messages.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleNewChat}
                className="border-ltl-border text-ltl-text-primary hover:bg-ltl-bg"
              >
                New chat
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
          {messages.length === 0 && (
            <div className="space-y-3 py-2">
              <p className="text-sm font-medium text-ltl-text-primary">
                Choose a question to get started:
              </p>
              <div className="flex flex-col gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    disabled={loading}
                    className="rounded-md border border-ltl-border bg-ltl-bg px-3 py-2 text-left text-sm text-ltl-text-secondary transition-colors hover:border-ltl-accent/40 hover:text-ltl-text-primary"
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
                "flex gap-2",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <ConciergeAvatar
                  isActive
                  size="sm"
                  showLabel={false}
                  className="shrink-0"
                />
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  message.role === "user"
                    ? "bg-ltl-accent text-ltl-bg"
                    : "border border-ltl-border bg-ltl-bg text-ltl-text-primary",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2">
              <ConciergeAvatar
                isActive
                size="sm"
                showLabel={false}
                className="shrink-0"
              />
              <div className="rounded-lg border border-ltl-border bg-ltl-bg px-3 py-2 text-sm text-ltl-text-secondary">
                Thinking…
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-ltl-border p-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              atLimit
                ? "Message limit reached — start a new chat"
                : "Type your question here…"
            }
            disabled={loading || atLimit}
            rows={1}
            className="min-h-10 flex-1 resize-none rounded-lg border border-ltl-border bg-ltl-bg px-3 py-2 text-sm text-ltl-text-primary placeholder:text-ltl-text-secondary outline-none focus-visible:border-ltl-accent focus-visible:ring-2 focus-visible:ring-ltl-accent/30 disabled:opacity-50"
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
            className="h-10 shrink-0 rounded-md bg-ltl-accent px-3 text-ltl-bg hover:bg-ltl-accent-hover disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>

      <p className="mt-2 text-center text-xs text-ltl-text-secondary sm:hidden">
        {userMessageCount}/{tierConfig.maxUserMessages} messages this chat
      </p>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      {atLimit && !isSubscriber && (
        <p className="mt-2 text-center text-xs text-ltl-text-secondary">
          <Link
            href="/subscribe?from=concierge"
            className="font-semibold text-ltl-accent underline-offset-2 hover:underline"
          >
            Upgrade to Premium AI Concierge
          </Link>{" "}
          for longer conversations.
        </p>
      )}
    </div>
  );
}
