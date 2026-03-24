import HeroSection from "@/components/sections/HeroSection";
import AboutHeroSection from "@/components/sections/AboutHeroSection";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutHeroSection />
      </div>
    </>
  );
}
