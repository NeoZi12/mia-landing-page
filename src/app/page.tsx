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
import ServicesSection from "@/components/sections/ServicesSection";
import BelowFoldSections from "@/components/sections/BelowFoldSections";
import SiteFooter from "@/components/SiteFooter";
import Navbar from "@/components/Navbar";
import { DotPattern } from "@/components/ui/dot-pattern";
import { client } from "@/lib/sanity";
import { HOME_PAGE_QUERY, type HomePageData } from "@/lib/queries";

async function getHomePageData(): Promise<HomePageData | null> {
  if (!client) return null;

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
          <AboutHeroSection data={data} />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <BelowFoldSections />
        <SiteFooter />
      </div>
    </>
  );
}
