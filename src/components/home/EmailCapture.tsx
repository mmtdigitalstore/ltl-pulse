"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sectionFadeUp, sectionViewport } from "@/lib/motion";

export function EmailCapture() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.success("Thanks for subscribing! We'll be in touch soon.");
    setEmail("");
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
        <h2 className="font-heading text-3xl font-semibold text-ltl-text-primary md:text-4xl">
          Join the Pulse
        </h2>
        <p className="mt-4 text-base text-ltl-text-secondary">
          Get leadership insights, new episodes, and exclusive content delivered
          to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 border-ltl-border bg-ltl-surface text-ltl-text-primary placeholder:text-ltl-text-secondary"
            aria-label="Email address"
            required
          />
          <Button
            type="submit"
            className="h-11 shrink-0 rounded-md bg-ltl-accent px-6 font-bold text-ltl-bg hover:bg-ltl-accent-hover"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </motion.section>
  );
}
