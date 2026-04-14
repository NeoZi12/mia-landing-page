import { Suspense } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutHeroSection from "@/components/sections/AboutHeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BelowFoldSections from "@/components/sections/BelowFoldSections";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import SiteFooter from "@/components/SiteFooter";
import Navbar from "@/components/Navbar";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div className="dotted-bg relative isolate">
        <DotPattern
          width={26}
          height={26}
          cx={1}
          cy={1}
          cr={1.3}
          glow={true}
          className="absolute inset-0 h-full w-full -z-10 pointer-events-none"
        />
        <div id="about">
          <AboutHeroSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <BelowFoldSections>
          <div id="blog">
            <Suspense fallback={null}>
              <BlogPreviewSection />
            </Suspense>
          </div>
        </BelowFoldSections>
        <SiteFooter />
      </div>
    </>
  );
}
