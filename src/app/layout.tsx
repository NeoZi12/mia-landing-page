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
  "יועצת מס והנהלת חשבונות בקריית מוצקין — שירות דיגיטלי לעצמאיים וחברות בכל הקריות, חיפה והסביבה. ייעוץ מס, החזרי מס, תיאום מס. שיחת ייעוץ ראשונית.";

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
    types: {
      "application/atom+xml": "/feed.xml",
    },
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
        "קריית מוצקין",
        "חיפה",
        "הקריות",
        "נשר",
        "עכו",
        "טירת הכרמל",
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
        "קיבוע זכויות",
        "עוסק מורשה",
        "עסק זעיר",
        "Israeli Tax Law",
        "Accounting",
        "קריית מוצקין",
        "חיפה",
        "הקריות",
        "נשר",
        "עכו",
        "טירת הכרמל",
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService", "AccountingService"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: [
        `${SITE_URL}/og-image.jpg`,
        `${SITE_URL}/images/office-pic1.webp`,
        `${SITE_URL}/images/office-pic2.webp`,
        `${SITE_URL}/images/office-pic3.webp`,
      ],
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
      geo: {
        "@type": "GeoCoordinates",
        latitude: 32.8518355,
        longitude: 35.0864072,
      },
      hasMap: "https://www.google.com/maps/place/%D7%9C%D7%90%D7%94+%D7%92%D7%95%D7%9C%D7%93%D7%91%D7%A8%D7%92+1,+Kiryat+Motskin/@32.8518355,35.0864072,17z/data=!3m1!4b1!4m6!3m5!1s0x151db654424e3f65:0x1bef89d0e49530ae!8m2!3d32.8518355!4d35.0864072!16s%2Fg%2F11xn4m4jfj",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
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
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "he-IL",
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
