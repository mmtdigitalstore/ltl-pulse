"use client";

import { useState } from "react";

import { shareCopy } from "./share.config";

type Status = "idle" | "submitting" | "success" | "error";

export default function AddYourVoiceForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [quote, setQuote] = useState("");
  const [consent, setConsent] = useState(false);

  const remaining = shareCopy.maxQuoteLength - quote.length;
  const canSubmit = quote.trim().length > 0 && consent && status !== "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch(shareCopy.endpoint, { method: "POST", body: data });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-[#F4F7FB] py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#DBE3EC] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1F3A5F]">
            <span className="text-2xl font-bold text-[#C8A951]">✓</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1F3A5F]">{shareCopy.successHeading}</h1>
          <p className="mt-2 text-[#6B7A8D]">{shareCopy.successBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F4F7FB] py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#C8A951]">
            {shareCopy.kicker}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#1F3A5F]">{shareCopy.heading}</h1>
          <p className="mt-3 text-base text-[#6B7A8D]">{shareCopy.subhead}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-[#DBE3EC] bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="quote" className="block text-sm font-semibold text-[#1F3A5F]">
              {shareCopy.promptLabel}
            </label>
            <textarea
              id="quote"
              name="quote"
              required
              rows={4}
              maxLength={shareCopy.maxQuoteLength}
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              placeholder={shareCopy.promptPlaceholder}
              className="mt-2 w-full rounded-lg border border-[#DBE3EC] px-3 py-2 text-[#22303F] outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/20"
            />
            <div className="mt-1 flex justify-between text-xs text-[#6B7A8D]">
              <span>{shareCopy.promptHint}</span>
              <span>{remaining}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="name" name="name" label={shareCopy.nameLabel} required />
            <Field id="role" name="role" label={shareCopy.roleLabel} required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="org" name="org" label={shareCopy.orgLabel} />
            <Field id="email" type="email" name="email" label={shareCopy.emailLabel} />
          </div>

          {shareCopy.allowAudio && (
            <div>
              <label htmlFor="audio" className="block text-sm font-semibold text-[#1F3A5F]">
                {shareCopy.audioLabel}
              </label>
              <input
                id="audio"
                name="audio"
                type="file"
                accept="audio/*"
                className="mt-2 block w-full text-sm text-[#6B7A8D] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1F3A5F] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#27496E]"
              />
            </div>
          )}

          <label className="flex items-start gap-3 text-sm text-[#22303F]">
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-[#DBE3EC] text-[#1F3A5F] focus:ring-[#2E75B6]"
            />
            <span>{shareCopy.consentLabel}</span>
          </label>

          {status === "error" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {shareCopy.errorBody}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-[#C8A951] px-5 py-3 text-sm font-semibold text-[#142439] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? shareCopy.submittingLabel : shareCopy.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#1F3A5F]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-[#DBE3EC] px-3 py-2 text-[#22303F] outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/20"
      />
    </div>
  );
}
