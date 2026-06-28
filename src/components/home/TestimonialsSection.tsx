import Link from "next/link";

import {
  testimonials,
  spotlights,
  testimonialsCopy,
  type Spotlight,
  type Testimonial,
} from "./testimonials.config";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#C8A951]">
            {testimonialsCopy.kicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1F3A5F] sm:text-4xl">
            {testimonialsCopy.heading}
          </h2>
          <p className="mt-3 text-base text-[#6B7A8D]">{testimonialsCopy.subhead}</p>
        </div>

        {spotlights.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {spotlights.map((spotlight) => (
              <SpotlightCard key={spotlight.id} spotlight={spotlight} />
            ))}
          </div>
        )}

        <div className="mt-8 [column-gap:1.5rem] sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial) => (
            <QuoteCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#F4F7FB] px-6 py-8 text-center">
          <p className="text-lg font-semibold text-[#1F3A5F]">{testimonialsCopy.ctaNote}</p>
          <Link
            href={testimonialsCopy.cta.href}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#1F3A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#27496E]"
          >
            {testimonialsCopy.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, author, role, org, audioUrl } = testimonial;

  return (
    <figure className="mb-6 break-inside-avoid rounded-2xl border border-[#DBE3EC] bg-white p-6 shadow-sm">
      <span aria-hidden className="text-3xl font-bold leading-none text-[#C8A951]">
        “
      </span>
      <blockquote className="mt-1 text-[15px] leading-relaxed text-[#22303F]">
        {quote}
      </blockquote>
      {audioUrl && (
        <audio controls preload="none" className="mt-3 w-full">
          <source src={audioUrl} />
        </audio>
      )}
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-[#1F3A5F]">{author}</span>
        <span className="text-[#6B7A8D]">
          {" "}
          — {role}
          {org ? `, ${org}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}

function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  const { name, role, org, work, shift, href, avatarUrl } = spotlight;

  return (
    <article className="flex flex-col rounded-2xl bg-[#1F3A5F] p-6 text-white">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#C8A951]">
        Member spotlight
      </span>
      <div className="mt-3 flex items-center gap-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27496E] text-sm font-bold text-[#C8A951]">
            {initials(name)}
          </span>
        )}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-[#CFDDEE]">
            {role}
            {org ? `, ${org}` : ""}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-[#CFDDEE]">{work}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-white">{shift}</p>

      {href && href !== "#" && (
        <a
          href={href}
          className="mt-4 inline-flex w-fit items-center text-sm font-semibold text-[#C8A951] hover:underline"
        >
          See their work →
        </a>
      )}
    </article>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === "") return "•";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
