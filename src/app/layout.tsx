import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

// NOTE: Update this constant if the final production domain differs.
const SITE_URL = "https://mia-tax.co.il";
const SITE_NAME = "מיה זינו — ייעוץ מס והנהלת חשבונות";
const SITE_DESCRIPTION =
  "שירותי ראיית חשבון, ייעוץ מס, החזרי מס וניהול פיננסי לעצמאיים וחברות — ממשרד בקריית מוצקין, שירות דיגיטלי לכל הארץ. צרו קשר לייעוץ ראשוני.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | מיה",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ייעוץ מס",
    "הנהלת חשבונות",
    "רואה חשבון",
    "החזרי מס",
    "תיאום מס",
    "עוסק מורשה",
    "עסק זעיר",
    "תכנון פרישה",
    "קיבוע זכויות",
    "ניהול פיננסי",
    "מיה זינו",
  ],
  authors: [{ name: "מיה זינו" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002069",
};

// Structured data — Organization + Person + AccountingService + WebSite.
// Emitted once on the root layout so every page inherits it.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
      description: SITE_DESCRIPTION,
      telephone: "+972584087061",
      areaServed: "IL",
      founder: { "@id": `${SITE_URL}/#person` },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+972584087061",
        contactType: "customer service",
        availableLanguage: "Hebrew",
        areaServed: "IL",
      },
      sameAs: [
        "https://www.instagram.com/mayazino_/",
      ],
      knowsAbout: [
        "ייעוץ מס",
        "הנהלת חשבונות",
        "החזרי מס",
        "תיאום מס",
        "תכנון פרישה",
        "קיבוע זכויות",
        "עוסק מורשה",
        "עסק זעיר",
        "Israeli Tax Law",
        "Accounting",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "מיה זינו",
      jobTitle: "יועצת מס ומנהלת חשבונות",
      url: SITE_URL,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [
        "https://www.instagram.com/mayazino_/",
      ],
      knowsAbout: [
        "ייעוץ מס",
        "הנהלת חשבונות",
        "החזרי מס",
        "תיאום מס",
        "תכנון פרישה",
        "Israeli Tax Law",
      ],
    },
    {
      "@type": "AccountingService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.jpg`,
      description: SITE_DESCRIPTION,
      telephone: "+972584087061",
      priceRange: "₪₪",
      provider: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "לאה גולדברג 1",
        addressLocality: "קריית מוצקין",
        addressRegion: "חיפה",
        addressCountry: "IL",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Israel",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "he-IL",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
