"use client";

/**
 * Client-side wrapper that lazy-loads below-fold sections.
 *
 * Using next/dynamic inside a Client Component produces proper code-splitting
 * for the imported Client Components (each becomes its own chunk). SSR stays
 * enabled (default) so the initial HTML still contains their content for SEO.
 *
 * Hero + About + Services remain eagerly imported in page.tsx — they're
 * above-the-fold / critical LCP content and should not wait on code-splitting.
 */

import dynamic from "next/dynamic";

const HowItWorksSection = dynamic(() => import("./HowItWorksSection"));
const WhyUsSection = dynamic(() => import("./WhyUsSection"));
const ContactSection = dynamic(() => import("./ContactSection"));

export default function BelowFoldSections() {
  return (
    <>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="why-us">
        <WhyUsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
