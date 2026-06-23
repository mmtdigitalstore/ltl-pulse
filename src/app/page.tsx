import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { EmailCapture } from "@/components/home/EmailCapture";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { LatestPodcast } from "@/components/home/LatestPodcast";
import { VlogGrid } from "@/components/home/VlogGrid";
import { WhatsInside } from "@/components/home/WhatsInside";

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
