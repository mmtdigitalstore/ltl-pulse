"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { AboutExpertBioDialog } from "@/components/about/AboutExpertBioDialog";
import { AboutExpertCard } from "@/components/about/AboutExpertCard";
import { EXPERT_PHOTOS } from "@/data/expert-photos.config";
import { experts, type ExpertId } from "@/data/problems.config";
import {
  sectionFadeUp,
  sectionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import {
  expertFocusCardClass,
  expertFocusWrapperClass,
} from "@/lib/navigation/expert-focus";
import { useHashExpertFocus } from "@/lib/navigation/use-hash-expert-focus";
import { cn } from "@/lib/utils";

const aboutExpertOrder: ExpertId[] = ["dawn", "jackie", "lashley", "joshua"];

type AboutExpertDetail = {
  displayName: string;
  credentials: string;
  canHelpWhen: string[];
  specialties: ReactNode;
  positioning: ReactNode;
};

interface AboutExpertsGridProps {
  trustBadges: string;
  aboutExpertDetails: Record<ExpertId, AboutExpertDetail>;
}

export function AboutExpertsGrid({
  trustBadges,
  aboutExpertDetails,
}: AboutExpertsGridProps) {
  const hashExpert = useHashExpertFocus();
  const [activeExpert, setActiveExpert] = useState<ExpertId | null>(null);
  const modalOpen = activeExpert !== null;

  useEffect(() => {
    if (hashExpert) {
      setActiveExpert(hashExpert);
    }
  }, [hashExpert]);

  const openExpert = useCallback((id: ExpertId) => {
    setActiveExpert(id);
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    }
  }, []);

  const closeExpert = useCallback(() => {
    setActiveExpert(null);
    const base = `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", base);
  }, []);

  const dialogExpert = activeExpert ? aboutExpertDetails[activeExpert] : null;

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={sectionFadeUp}
        className="ltl-theme-magazine ltl-media-container mt-8 rounded-xl px-5 py-5 md:px-6 md:py-6"
      >
        <p className="font-label text-xs uppercase tracking-widest text-ltl-accent">
          The credibility behind LTL Pulse
        </p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-ltl-text-primary md:text-base">
          {trustBadges}
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className={cn(
          "mt-8 grid gap-6 md:grid-cols-2 md:gap-8",
          modalOpen && "pointer-events-none",
        )}
        aria-hidden={modalOpen}
      >
        {aboutExpertOrder.map((id) => {
          const detail = aboutExpertDetails[id];

          return (
            <motion.div
              key={id}
              variants={staggerItem}
              className={expertFocusWrapperClass(
                id,
                modalOpen ? activeExpert : hashExpert,
              )}
            >
              <AboutExpertCard
                id={id}
                displayName={detail.displayName}
                role={experts[id].title}
                lane={experts[id].homepageLane ?? experts[id].tagline}
                positioning={detail.positioning}
                credentials={detail.credentials}
                canHelpWhen={detail.canHelpWhen}
                specialties={detail.specialties}
                photo={EXPERT_PHOTOS[id]}
                isFocused={hashExpert === id && !modalOpen}
                isObscured={modalOpen}
                onOpenDetail={() => openExpert(id)}
                className={expertFocusCardClass(
                  id,
                  modalOpen ? activeExpert : hashExpert,
                )}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {activeExpert && dialogExpert ? (
        <AboutExpertBioDialog
          expertId={activeExpert}
          onClose={closeExpert}
          displayName={dialogExpert.displayName}
          role={experts[activeExpert].title}
          lane={
            experts[activeExpert].homepageLane ?? experts[activeExpert].tagline
          }
          positioning={dialogExpert.positioning}
          credentials={dialogExpert.credentials}
          canHelpWhen={dialogExpert.canHelpWhen}
          specialties={dialogExpert.specialties}
          photo={EXPERT_PHOTOS[activeExpert]}
        />
      ) : null}
    </>
  );
}
