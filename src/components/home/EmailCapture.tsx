"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";

import { TURNOVER_GUIDE_LEAD_MAGNET } from "@/data/lead-magnets.config";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          leadMagnet: TURNOVER_GUIDE_LEAD_MAGNET.id,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        downloadUrl?: string;
        emailSent?: boolean;
      };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmittedEmail(email.trim());
      setDownloadUrl(data.downloadUrl ?? null);
      setEmailSent(Boolean(data.emailSent));
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeUp}
      className="border-b border-ltl-border bg-ltl-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
          Free guide
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
          {TURNOVER_GUIDE_LEAD_MAGNET.title}
        </h2>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-ltl-accent/30 bg-ltl-accent/10 px-6 py-8 text-left sm:text-center">
            <p className="font-heading text-lg font-semibold text-ltl-text-primary">
              You&apos;re all set.
            </p>
            {emailSent ? (
              <p className="mt-3 text-base leading-relaxed text-ltl-text-secondary">
                We emailed the download link to{" "}
                <span className="font-medium text-ltl-text-primary">{submittedEmail}</span>.
                Check your inbox — and spam — if it doesn&apos;t arrive in a few minutes.
              </p>
            ) : (
              <p className="mt-3 text-base leading-relaxed text-ltl-text-secondary">
                Thanks — we saved{" "}
                <span className="font-medium text-ltl-text-primary">{submittedEmail}</span>.
                Download your guide below.
              </p>
            )}
            {downloadUrl ? (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "mt-6 inline-flex rounded-md bg-ltl-accent font-semibold text-ltl-bg hover:bg-ltl-accent-hover",
                )}
              >
                Download now
              </a>
            ) : null}
            <p className="mt-4 text-sm text-ltl-text-secondary">
              While you&apos;re here, start with a free LTL Conversation on keeping your
              best people.
            </p>
            <Link
              href="/podcast#turnover"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "mt-4 inline-flex rounded-md border-ltl-border text-ltl-text-primary hover:bg-ltl-surface",
              )}
            >
              Listen free
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-4 text-base leading-relaxed text-ltl-text-secondary">
              Five practical conversations to keep your best people — free when you
              share your email.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-center"
            >
              <div className="flex w-full flex-col gap-2 sm:max-w-sm">
                <Input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 border-ltl-border bg-ltl-surface text-ltl-text-primary placeholder:text-ltl-text-secondary"
                  aria-label="Email address"
                  required
                  disabled={submitting}
                />
                {error ? (
                  <p className="text-left text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="h-11 shrink-0 rounded-md bg-ltl-accent px-6 font-bold text-ltl-bg hover:bg-ltl-accent-hover"
              >
                {submitting ? "Sending…" : "Get the guide"}
              </Button>
            </form>
          </>
        )}
      </div>
    </motion.section>
  );
}
