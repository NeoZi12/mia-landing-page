/**
 * src/app/page.tsx — Main landing page (Server Component).
 *
 * Fetches the homePage document from Sanity at request time and passes
 * the data as props to each section. If the project ID is not yet set
 * (local dev before Sanity is configured) the fetch is skipped and each
 * section renders its own hardcoded fallback content — so the page never
 * breaks even with an empty .env.local.
 */
import HeroSection from "@/components/sections/HeroSection";
import AboutHeroSection from "@/components/sections/AboutHeroSection";
import VideoIntroSection from "@/components/sections/VideoIntroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import Navbar from "@/components/Navbar";
import { client } from "@/lib/sanity";
import { HOME_PAGE_QUERY, type HomePageData } from "@/lib/queries";

async function getHomePageData(): Promise<HomePageData | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  try {
    return await client.fetch<HomePageData>(HOME_PAGE_QUERY);
  } catch {
    // Sanity unreachable or not yet configured — fall back to static text
    return null;
  }
}

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <Navbar />
      <div id="hero">
        <HeroSection data={data} />
      </div>
      <div id="about">
        <AboutHeroSection data={data} />
      </div>
      <div id="intro-video">
        <VideoIntroSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="contact" style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
