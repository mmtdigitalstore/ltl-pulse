import Link from "next/link";

import { ExpertPhoto } from "@/components/team/ExpertPhoto";
import { EXPERT_PHOTOS } from "@/data/expert-photos.config";
import { experts, getExpertHref, type ExpertId } from "@/data/problems.config";

export function ExpertLaneBanner({ expertId }: { expertId: ExpertId }) {
  const expert = experts[expertId];
  const photo = EXPERT_PHOTOS[expertId];

  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-ltl-accent/35 bg-ltl-surface px-4 py-3">
      <ExpertPhoto src={photo.src} alt={photo.alt} name={expert.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="font-label text-[0.65rem] uppercase tracking-widest text-ltl-accent">
          Your expert lane
        </p>
        <p className="truncate font-heading text-sm font-semibold text-ltl-text-primary">
          {expert.name}
        </p>
        <p className="truncate text-xs text-ltl-text-secondary">
          {expert.homepageLane ?? expert.tagline}
        </p>
      </div>
      <Link
        href={getExpertHref(expertId)}
        className="shrink-0 text-sm font-medium text-ltl-accent underline-offset-2 hover:underline"
      >
        Full bio
      </Link>
    </div>
  );
}
