import type { Metadata } from "next";

import AddYourVoiceForm from "./AddYourVoiceForm";

export const metadata: Metadata = {
  title: "Add your voice | LTL Pulse",
  description:
    "Share one thing you lead differently now — help the next leader on the LTL Pulse community wall.",
};

export default function SharePage() {
  return <AddYourVoiceForm />;
}
