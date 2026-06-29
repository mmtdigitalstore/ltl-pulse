import { CoachesStrip } from "@/components/home/CoachesStrip";
import { ContentLadderSection } from "@/components/home/ContentLadderSection";
import { EmailCapture } from "@/components/home/EmailCapture";
import { FeaturedEpisodesSection } from "@/components/home/FeaturedEpisodesSection";
import { FoundingMemberTeaser } from "@/components/home/FoundingMemberTeaser";
import { MeetExpertsSection } from "@/components/home/MeetExpertsSection";
import { SoundFamiliarSection } from "@/components/home/SoundFamiliarSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Hero } from "@/components/layout/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <SoundFamiliarSection />
      <FeaturedEpisodesSection />
      <ContentLadderSection />
      <MeetExpertsSection />
      <CoachesStrip />
      <TestimonialsSection />
      <FoundingMemberTeaser />
      <EmailCapture />
    </>
  );
}
