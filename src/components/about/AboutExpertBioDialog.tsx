"use client";

import type { ReactNode } from "react";

import { AboutExpertBioBody } from "@/components/about/AboutExpertBioBody";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ExpertId } from "@/data/problems.config";

interface AboutExpertBioDialogProps {
  expertId: ExpertId | null;
  onClose: () => void;
  displayName: string;
  role: string;
  lane: string;
  positioning: ReactNode;
  credentials: string;
  canHelpWhen: string[];
  specialties: ReactNode;
  photo: { src: string; alt: string };
}

export function AboutExpertBioDialog({
  expertId,
  onClose,
  displayName,
  role,
  lane,
  positioning,
  credentials,
  canHelpWhen,
  specialties,
  photo,
}: AboutExpertBioDialogProps) {
  if (!expertId) {
    return null;
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        overlayClassName="bg-ltl-bg/80 backdrop-blur-sm"
        className="ltl-theme-magazine max-h-[min(90dvh,52rem)] overflow-y-auto border-ltl-border bg-ltl-surface p-6 text-ltl-text-primary sm:max-w-2xl sm:p-8"
        showCloseButton
      >
        <DialogTitle className="sr-only">{displayName}</DialogTitle>
        <AboutExpertBioBody
          id={expertId}
          displayName={displayName}
          role={role}
          lane={lane}
          positioning={positioning}
          credentials={credentials}
          canHelpWhen={canHelpWhen}
          specialties={specialties}
          photo={photo}
        />
      </DialogContent>
    </Dialog>
  );
}
