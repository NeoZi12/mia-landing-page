import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, SERVICES } from "@/lib/servicesData";
import ServiceExplanationSection from "@/components/sections/ServiceExplanationSection";
import { SITE_URL } from "@/lib/siteConstants";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "שירות לא נמצא",
    };
  }

  // Trim primaryText to leave room for the locality anchor, keep ≤160 chars total.
  const baseDescription =
    service.primaryText.length > 140
      ? `${service.primaryText.slice(0, 137).trimEnd()}...`
      : service.primaryText;
  const description = `${baseDescription} שירות מקריית מוצקין לכל הארץ.`.slice(0, 160);

  const canonical = `/services/${service.slug}`;

  return {
    title: service.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      locale: "he_IL",
      title: `${service.title} | מיה`,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | מיה`,
      description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceUrl = `${SITE_URL}/services/${service.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: service.title,
        description: service.primaryText,
        url: serviceUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Israel" },
          { "@type": "City", name: "קריית מוצקין" },
          { "@type": "City", name: "חיפה" },
          { "@type": "City", name: "קריית ביאליק" },
          { "@type": "City", name: "קריית ים" },
          { "@type": "City", name: "קריית אתא" },
          { "@type": "City", name: "נשר" },
          { "@type": "City", name: "עכו" },
          { "@type": "City", name: "טירת הכרמל" },
        ],
        serviceType: "Tax Consulting and Accounting",
        inLanguage: "he-IL",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "דף הבית",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: service.title,
            item: serviceUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${serviceUrl}#howto`,
        name: `איך עובד התהליך — ${service.title}`,
        description: service.primaryText,
        inLanguage: "he-IL",
        step: service.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step,
          text: step,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${serviceUrl}#webpage`,
        url: serviceUrl,
        name: `${service.title} | מיה`,
        description: service.primaryText,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${serviceUrl}#service` },
        inLanguage: "he-IL",
        breadcrumb: { "@id": `${serviceUrl}#breadcrumb` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceExplanationSection service={service} />
    </>
  );
}
