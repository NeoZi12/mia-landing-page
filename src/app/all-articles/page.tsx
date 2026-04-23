import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blogQueries";

export const revalidate = 60;

const SITE_URL = "https://mia-tax.co.il";

export const metadata: Metadata = {
  title: "כל המאמרים | מיה",
  description:
    "מאמרים מקצועיים בעברית על ייעוץ מס, החזרי מס, הנהלת חשבונות ותכנון פיננסי — לעצמאיים, שכירים ובעלי עסקים. תוכן עדכני מיועצת מס בקריית מוצקין.",
  alternates: { canonical: "/all-articles" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: `${SITE_URL}/all-articles`,
    title: "כל המאמרים | מיה",
    description:
      "מאמרים מקצועיים בעברית על ייעוץ מס, החזרי מס, הנהלת חשבונות ותכנון פיננסי — לעצמאיים, שכירים ובעלי עסקים. תוכן עדכני מיועצת מס בקריית מוצקין.",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/all-articles`,
      name: "כל המאמרים | מיה",
      url: `${SITE_URL}/all-articles`,
      description:
        "מאמרים מקצועיים בעברית על ייעוץ מס, החזרי מס, הנהלת חשבונות ותכנון פיננסי — לעצמאיים, שכירים ובעלי עסקים. תוכן עדכני מיועצת מס בקריית מוצקין.",
      inLanguage: "he-IL",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/all-articles#breadcrumb`,
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
          name: "כל המאמרים",
          item: `${SITE_URL}/all-articles`,
        },
      ],
    },
  ],
};

export default async function AllArticlesPage() {
  const posts = await getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <section dir="rtl" className="w-full pt-[104px] pb-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back to site — top right (RTL: start side = right) */}
        <div className="flex justify-start mb-8">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-[#003399]"
            style={{ fontSize: 14, fontWeight: 600, color: "#475569", textDecoration: "none" }}
          >
            → בחזרה לאתר
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="inline-block mb-3 rounded-full px-4 py-1 text-sm font-semibold"
            style={{ background: "rgba(0,51,153,0.07)", color: "#003399" }}
          >
            בלוג מקצועי
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#002069",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            כל המאמרים
          </h1>
          <p style={{ fontSize: 17, color: "#475569", maxWidth: 520, margin: "0 auto" }}>
            תוכן מקצועי בעברית לעצמאיים, בעלי עסקים ושכירים שרוצים להבין את עולם המס.
          </p>
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p style={{ fontSize: 18, color: "#94a3b8" }}>
              אין מאמרים עדיין. בקרוב יעלו תכנים חדשים!
            </p>
          </div>
        )}

        {/* Posts grid */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-[rgba(0,51,153,0.1)] bg-white shadow-[0_2px_16px_rgba(0,51,153,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,51,153,0.12)]"
                style={{ textDecoration: "none" }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1200/630" }}>
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                    {formatDate(post.published_at)}
                  </p>
                  <h2
                    className="group-hover:text-[#003399] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-heebo), sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#002069",
                      lineHeight: 1.35,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.65,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <p
                    className="mt-1 flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                    style={{ fontSize: 13, fontWeight: 600, color: "#3B6FD8" }}
                  >
                    קראו עוד ←
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
    </>
  );
}
