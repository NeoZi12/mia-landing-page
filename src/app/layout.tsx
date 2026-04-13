import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

// NOTE: Update this constant if the final production domain differs.
const SITE_URL = "https://mia-tax.co.il";
const SITE_NAME = "מיה - ייעוץ מס והנהלת חשבונות";
const SITE_DESCRIPTION =
  "שירותי ראיית חשבון, ייעוץ מס, החזרי מס וניהול פיננסי לעצמאיים וחברות. ליווי אישי ומקצועי להצלחה העסקית שלך. צור קשר לייעוץ ראשוני.";

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

// Structured data — Organization + LocalBusiness (AccountingService).
// Emitted once on the root layout so every page inherits it.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.jpg`,
      description: SITE_DESCRIPTION,
      telephone: "+972584087061",
      areaServed: "IL",
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
      address: {
        "@type": "PostalAddress",
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
      </body>
    </html>
  );
}
