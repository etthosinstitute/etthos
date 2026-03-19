import { HeroSection } from "@/components/home/HeroSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { JournalFeatures } from "@/components/home/JournalFeatures";

export default function Home() {
  return (
    <>
      <HeroSection />
      <JournalFeatures />
      <LatestArticles />
    </>
  );
}
