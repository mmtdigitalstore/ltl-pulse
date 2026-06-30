import type { ReactNode } from "react";

import { PageHeader } from "@/components/layout/PageHeader";

interface StaticPageContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function StaticPageContent({
  title,
  subtitle,
  children,
}: StaticPageContentProps) {
  return (
    <div className="ltl-theme-magazine ltl-hub-page ltl-hub-handoff min-h-[calc(100dvh-4rem)] px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl ltl-media-container rounded-2xl p-8 md:p-10">
        <PageHeader title={title} subtitle={subtitle ?? ""} />
        <div className="mt-10 space-y-6 text-base leading-relaxed text-ltl-text-secondary md:text-lg">
          {children}
        </div>
      </article>
    </div>
  );
}
