"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";

import { CadenceIntakeChoices } from "@/components/concierge/CadenceIntakeChoices";
import { CadenceMessageContent } from "@/components/concierge/CadenceMessageContent";
import { ConciergeAvatar } from "@/components/concierge/ConciergeAvatar";
import { Button } from "@/components/ui/button";
import type { Audience, ExpertId, Problem } from "@/data/problems.config";
import { CADENCE_NAME, CONCIERGE_TIER_CONFIG } from "@/lib/concierge/config";
import {
  AUDIENCE_LABELS,
  buildCadenceExpertGreeting,
  buildCadenceExpertProblemPrompt,
  buildCadenceIntakeReply,
  CADENCE_GREETING,
  CADENCE_PROBLEM_PROMPT,
} from "@/lib/concierge/intake";
import { buildCadenceAdvisoryReply } from "@/lib/concierge/advisory";
import { deriveIntakeState, type IntakePhase } from "@/lib/concierge/intake-state";
import {
  clearCadenceChatSession,
  loadCadenceChatSession,
  saveCadenceChatSession,
} from "@/lib/concierge/session";
import type { ConciergeMessage } from "@/lib/concierge/types";
import { cn } from "@/lib/utils";

interface ConciergeChatProps {
  userId: string;
  isSubscriber: boolean;
  expertId?: ExpertId | null;
  advisoryTopic?: boolean;
  autoFocusInput?: boolean;
  onChatStart?: () => void;
}

export function ConciergeChat({
  userId,
  isSubscriber,
  expertId = null,
  advisoryTopic = false,
  autoFocusInput = false,
  onChatStart,
}: ConciergeChatProps) {
  const tier = isSubscriber ? "premium" : "free";
  const tierConfig = CONCIERGE_TIER_CONFIG[tier];
  const [showStarters, setShowStarters] = useState(true);
  const [intakePhase, setIntakePhase] = useState<IntakePhase>("idle");
  const [intakeAudience, setIntakeAudience] = useState<Audience | null>(null);
  const [intakeComplete, setIntakeComplete] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userMessageCount = messages.filter((message) => message.role === "user").length;
  const atLimit = userMessageCount >= tierConfig.maxUserMessages;

  useEffect(() => {
    if (expertId || advisoryTopic) {
      const existing = loadCadenceChatSession(userId);
      if (existing && !existing.intakeComplete) {
        clearCadenceChatSession(userId);
      }
    }

    const saved = loadCadenceChatSession(userId);

    if (saved) {
      setMessages(saved.messages);
      setShowStarters(saved.showStarters);
      setIsMinimized(saved.isMinimized);

      if (saved.intakePhase) {
        setIntakePhase(saved.intakePhase);
        setIntakeAudience(saved.intakeAudience ?? null);
        setIntakeComplete(saved.intakeComplete ?? false);
      } else {
        const derived = deriveIntakeState(saved.messages);
        setIntakePhase(derived.phase);
        setIntakeAudience(derived.audience);
        setIntakeComplete(derived.complete);
      }
    }

    setSessionReady(true);
  }, [userId, expertId, advisoryTopic]);

  useEffect(() => {
    if (!sessionReady) {
      return;
    }

    saveCadenceChatSession(userId, {
      messages,
      showStarters,
      isMinimized,
      intakePhase,
      intakeAudience,
      intakeComplete,
    });
  }, [
    userId,
    messages,
    showStarters,
    isMinimized,
    intakePhase,
    intakeAudience,
    intakeComplete,
    sessionReady,
  ]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    scrollRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (autoFocusInput && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [autoFocusInput, isMinimized]);

  useEffect(() => {
    if (!atLimit || loading || messages.length === 0) {
      return;
    }

    const timer = window.setTimeout(() => setIsMinimized(true), 1500);
    return () => window.clearTimeout(timer);
  }, [atLimit, loading, messages.length]);

  useEffect(() => {
    if (!sessionReady || !showStarters || intakeComplete || intakePhase !== "idle") {
      return;
    }

    if (messages.length === 0) {
      if (advisoryTopic) {
        setMessages([
          {
            role: "assistant",
            content: buildCadenceAdvisoryReply(isSubscriber),
          },
        ]);
        setIntakeComplete(true);
        setIntakePhase("complete");
        setShowStarters(false);
        return;
      }

      setMessages([
        {
          role: "assistant",
          content: expertId
            ? buildCadenceExpertGreeting(expertId)
            : CADENCE_GREETING,
        },
      ]);
      setIntakePhase("audience");
    }
  }, [
    sessionReady,
    showStarters,
    intakeComplete,
    intakePhase,
    messages.length,
    expertId,
    advisoryTopic,
    isSubscriber,
  ]);

  function expandChat() {
    setIsMinimized(false);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function minimizeChat() {
    if (loading) {
      return;
    }
    setIsMinimized(true);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || loading || atLimit) {
      return;
    }

    setShowStarters(false);
    onChatStart?.();

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
        setError(data.error ?? "Unable to reach Cadence.");
        return;
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message! },
      ]);
    } catch {
      setError("Unable to reach Cadence. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleNewChat() {
    clearCadenceChatSession(userId);
    setError(null);
    setInput("");
    setIsMinimized(false);

    if (advisoryTopic) {
      setMessages([
        {
          role: "assistant",
          content: buildCadenceAdvisoryReply(isSubscriber),
        },
      ]);
      setShowStarters(false);
      setIntakePhase("complete");
      setIntakeAudience(null);
      setIntakeComplete(true);
      inputRef.current?.focus();
      return;
    }

    setMessages([]);
    setShowStarters(true);
    setIntakePhase("idle");
    setIntakeAudience(null);
    setIntakeComplete(false);
    inputRef.current?.focus();
  }

  function handleChooseAudience(audience: Audience) {
    onChatStart?.();
    setIntakeAudience(audience);
    setIntakePhase("problem");
    setMessages((current) => [
      ...current,
      { role: "user", content: AUDIENCE_LABELS[audience] },
      {
        role: "assistant",
        content: expertId
          ? buildCadenceExpertProblemPrompt(expertId)
          : CADENCE_PROBLEM_PROMPT,
      },
    ]);
  }

  function handleChooseProblem(problem: Problem) {
    setShowStarters(false);
    setIntakePhase("complete");
    setIntakeComplete(true);
    setMessages((current) => [
      ...current,
      { role: "user", content: problem.cadenceChip },
      {
        role: "assistant",
        content: buildCadenceIntakeReply(problem, { isSubscriber }),
      },
    ]);
  }

  const showIntakeChoices =
    showStarters && !intakeComplete && (intakePhase === "audience" || intakePhase === "problem");

  const statusLabel = loading
    ? "Thinking…"
    : atLimit
      ? "Chat complete — expand to start a new conversation"
      : messages.length > 0
        ? "Pick up where you left off"
        : "Ready when you are";

  if (isMinimized) {
    return (
      <div className="flex flex-col">
        {!isSubscriber && (
          <p className="mb-3 rounded-md border border-ltl-accent/40 bg-ltl-accent/15 px-3 py-2 text-xs text-ltl-accent">
            Cadence Basic ·{" "}
            <Link
              href="/subscribe?from=concierge"
              className="font-semibold underline-offset-2 hover:underline"
            >
              Subscribe for Cadence Premium
            </Link>
          </p>
        )}

        <div className="rounded-lg border border-ltl-border bg-ltl-surface px-3 py-2.5">
          <div className="flex items-center gap-3">
            <ConciergeAvatar isActive={!loading} size="sm" showLabel={false} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ltl-text-primary">{CADENCE_NAME}</p>
              <p className="truncate text-xs text-ltl-text-secondary">{statusLabel}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={expandChat}
              className="h-8 shrink-0 border-ltl-border px-2.5 text-xs text-ltl-text-primary hover:bg-ltl-bg"
            >
              <ChevronUp className="mr-1 size-3.5" aria-hidden />
              Open chat
            </Button>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 border-t border-ltl-border pt-2.5 text-xs">
            <Link href="/magazine" className="text-ltl-accent hover:underline">
              Magazine
            </Link>
            <Link href="/podcast" className="text-ltl-accent hover:underline">
              Podcast
            </Link>
            <Link href="/vlogs" className="text-ltl-accent hover:underline">
              Vlogs
            </Link>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {!isSubscriber && (
        <p className="mb-3 rounded-md border border-ltl-accent/40 bg-ltl-accent/15 px-3 py-2 text-xs text-ltl-accent">
          Cadence Basic ·{" "}
          <Link
            href="/subscribe?from=concierge"
            className="font-semibold underline-offset-2 hover:underline"
          >
            Subscribe for Cadence Premium
          </Link>
        </p>
      )}

      <div
        className="flex max-h-[min(32rem,70vh)] flex-col overflow-hidden rounded-lg border border-ltl-border bg-ltl-surface"
        aria-busy={loading}
      >
        <div className="flex items-center justify-between gap-2 border-b border-ltl-border px-3 py-2 sm:px-3">
          <ConciergeAvatar isActive={!loading} size="sm" />
          <div className="flex items-center gap-1.5">
            <span className="hidden text-[0.7rem] text-ltl-text-secondary sm:inline">
              {userMessageCount}/{tierConfig.maxUserMessages}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 font-label text-[0.6rem] uppercase tracking-wider",
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
                className="h-7 border-ltl-border px-2 text-xs text-ltl-text-primary hover:bg-ltl-bg"
              >
                New chat
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={minimizeChat}
              disabled={loading}
              className="size-7 shrink-0 text-ltl-text-secondary hover:bg-ltl-bg hover:text-ltl-text-primary"
              aria-label="Minimize chat"
            >
              <ChevronDown className="size-4" />
            </Button>
          </div>
        </div>

        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label={`Conversation with ${CADENCE_NAME}`}
          className="flex-1 space-y-2.5 overflow-y-auto px-3 py-2.5 sm:px-3"
        >
          {showStarters && !intakeComplete && messages.length === 0 && intakePhase === "idle" && (
            <div className="flex items-start gap-2">
              <ConciergeAvatar
                isActive
                size="sm"
                showLabel={false}
                className="shrink-0"
              />
              <div className="rounded-lg bg-ltl-bg/60 px-2.5 py-1.5 text-sm text-ltl-text-secondary">
                Starting…
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
                  "max-w-[85%] rounded-lg px-2.5 py-1.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-ltl-accent text-ltl-bg whitespace-pre-wrap"
                    : "bg-ltl-bg/60 text-ltl-text-primary",
                )}
              >
                {message.role === "assistant" ? (
                  <CadenceMessageContent content={message.content} />
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {showIntakeChoices && (
            <CadenceIntakeChoices
              phase={intakePhase === "problem" ? "problem" : "audience"}
              audience={intakeAudience ?? undefined}
              expertId={expertId ?? undefined}
              disabled={loading}
              onChooseAudience={handleChooseAudience}
              onChooseProblem={handleChooseProblem}
            />
          )}

          {loading && (
            <div className="flex items-start gap-2">
              <ConciergeAvatar
                isActive
                size="sm"
                showLabel={false}
                className="shrink-0"
              />
              <div className="rounded-lg bg-ltl-bg/60 px-2.5 py-1.5 text-sm text-ltl-text-secondary">
                Thinking…
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-1.5 border-t border-ltl-border px-3 py-2"
          aria-label={`Message ${CADENCE_NAME}`}
        >
          <label htmlFor="cadence-message-input" className="sr-only">
            Message for {CADENCE_NAME}
          </label>
          <textarea
            id="cadence-message-input"
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
            aria-describedby={error ? "cadence-chat-error" : undefined}
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

      {error && (
        <p id="cadence-chat-error" className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {atLimit && !isSubscriber && (
        <p className="mt-2 text-center text-xs text-ltl-text-secondary">
          <Link
            href="/subscribe?from=concierge"
            className="font-semibold text-ltl-accent underline-offset-2 hover:underline"
          >
            Upgrade to Cadence Premium
          </Link>{" "}
          for longer conversations.
        </p>
      )}
    </div>
  );
}
