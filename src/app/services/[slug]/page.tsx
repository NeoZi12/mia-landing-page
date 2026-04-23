import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, SERVICES } from "@/lib/servicesData";
import ServiceExplanationSection from "@/components/sections/ServiceExplanationSection";

const SITE_URL = "https://mia-tax.co.il";

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

  // Trim primaryText to a clean meta-description (≤160 chars).
  const description =
    service.primaryText.length > 160
      ? `${service.primaryText.slice(0, 157).trimEnd()}...`
      : service.primaryText;

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
        areaServed: { "@type": "Country", name: "Israel" },
        serviceType: "Tax Consulting and Accounting",
        inLanguage: "he-IL",
      },
      {
        "@type": "BreadcrumbList",
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
