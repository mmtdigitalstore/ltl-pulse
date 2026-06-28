import { EmailCapture } from "@/components/home/EmailCapture";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { LatestPodcast } from "@/components/home/LatestPodcast";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VlogGrid } from "@/components/home/VlogGrid";
import { WhatsInside } from "@/components/home/WhatsInside";
import { Hero } from "@/components/layout/Hero";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);

  return (
    <>
      <Hero />
      <FeaturedArticles />
      <LatestPodcast />
      <VlogGrid isSubscriber={isSubscriber} />
      <WhatsInside />
      <TestimonialsSection />
      <EmailCapture />
    </>
  );
}
