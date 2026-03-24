import HeroSection from "@/components/sections/HeroSection";
import AboutHeroSection from "@/components/sections/AboutHeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div id="about">
        <AboutHeroSection />
      </div>
    </>
  );
}
