import { EmailCapture } from "@/components/home/EmailCapture";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { LatestPodcast } from "@/components/home/LatestPodcast";
import { VlogGrid } from "@/components/home/VlogGrid";
import { WhatsInside } from "@/components/home/WhatsInside";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      <LatestPodcast />
      <VlogGrid />
      <WhatsInside />
      <EmailCapture />
      <Footer />
    </>
  );
}
