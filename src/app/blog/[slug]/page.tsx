import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/blogQueries";

export const revalidate = 300;

const SITE_URL = "https://mia-tax.co.il";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "מאמר לא נמצא" };

  return {
    title: post.title,
    description: post.meta_description,
    keywords: post.keywords,
    authors: [{ name: "מיה זינו" }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      locale: "he_IL",
      url: `${SITE_URL}/blog/${slug}`,
      title: `${post.title} | מיה`,
      description: post.meta_description,
      images: [{ url: post.image_url, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.published_at,
      authors: ["מיה זינו"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | מיה`,
      description: post.meta_description,
      images: [post.image_url],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const hasStructured =
    Array.isArray(post.points) && post.points.length > 0 && post.intro !== null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description,
    image: post.image_url,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Person",
      name: "מיה זינו",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "מיה - ייעוץ מס והנהלת חשבונות",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.jpg`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    keywords: post.keywords.join(", "),
    inLanguage: "he-IL",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article dir="rtl" className="w-full pt-10 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Top navigation row */}
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-[#003399]"
              style={{ fontSize: 17, fontWeight: 700, color: "#475569", textDecoration: "none" }}
            >
              → בחזרה לאתר
            </Link>
            <Link
              href="/all-articles"
              className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-[#003399]"
              style={{ fontSize: 17, fontWeight: 700, color: "#475569", textDecoration: "none" }}
            >
              כל המאמרים ←
            </Link>
          </div>

          {/* Hero image */}
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-8 shadow-[0_4px_32px_rgba(0,51,153,0.1)]"
            style={{ aspectRatio: "1200/630" }}
          >
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "rgba(0,51,153,0.07)", color: "#003399" }}
            >
              מאמר מקצועי
            </span>
            <time
              dateTime={post.published_at}
              style={{ fontSize: 13, color: "#94a3b8" }}
            >
              {formatDate(post.published_at)}
            </time>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>·</span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>מיה זינו</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px, 3.6vw, 38px)",
              color: "#002069",
              lineHeight: 1.22,
              marginBottom: 14,
              letterSpacing: "-0.5px",
            }}
          >
            {post.title}
          </h1>

          {hasStructured ? (
            <>
              {/* Intro */}
              <p
                className="rounded-2xl px-6 py-5 mb-12 border-r-4"
                style={{
                  fontSize: 17,
                  color: "#334155",
                  lineHeight: 1.8,
                  background: "#f1f5f9",
                  borderColor: "#3B6FD8",
                }}
              >
                {post.intro}
              </p>

              {/* 5 main points */}
              <div className="flex flex-col" style={{ gap: 22 }}>
                {post.points!.map((point, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-center rounded-2xl bg-white border border-[rgba(0,51,153,0.09)] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(0,51,153,0.08)]"
                    style={{
                      padding: "clamp(16px, 2vw, 22px)",
                      gap: "clamp(16px, 2vw, 22px)",
                      boxShadow: "0 2px 14px rgba(0,51,153,0.05)",
                    }}
                  >
                    {/* Big numbered circle */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "clamp(52px, 6vw, 64px)",
                        height: "clamp(52px, 6vw, 64px)",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #003399 0%, #3B6FD8 100%)",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-heebo), sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(22px, 2.4vw, 26px)",
                        boxShadow: "0 4px 14px rgba(0, 51, 153, 0.28)",
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Point text */}
                    <p
                      className="flex-1 text-right"
                      style={{
                        fontFamily: "var(--font-heebo), sans-serif",
                        fontWeight: 500,
                        fontSize: "clamp(15px, 1.35vw, 18px)",
                        color: "#1E3A5F",
                        lineHeight: 1.6,
                      }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Legacy fallback — old markdown-based posts */}
              <p
                className="rounded-xl px-5 py-4 mb-8 border-r-4"
                style={{
                  fontSize: 17,
                  color: "#334155",
                  lineHeight: 1.75,
                  background: "#f1f5f9",
                  borderColor: "#3B6FD8",
                }}
              >
                {post.excerpt}
              </p>
              <div className="blog-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content_md ?? ""}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* CTA card — WhatsApp */}
          <div
            className="cta-card relative mt-14 rounded-2xl p-7 text-center border overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #003399 0%, #3B6FD8 100%)",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            {/* Background office photo at low opacity */}
            <Image
              src="/images/office-pic1.webp"
              alt=""
              fill
              className="object-cover opacity-[0.08] pointer-events-none select-none"
              sizes="800px"
              aria-hidden="true"
            />

            {/* Content sits above the image */}
            <div className="relative z-10">
            <h3
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              יש שאלות? נשמח לעזור
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>
              צרו קשר לייעוץ ראשוני ללא עלות.
            </p>
            <a
              href="https://wa.me/972584087061"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 transition-colors duration-150 hover:bg-[#f0f4ff]"
              style={{
                background: "#fff",
                color: "#003399",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              שלחו לנו הודעה בוואטסאפ
            </a>
            </div>{/* end z-10 content wrapper */}
          </div>

          {/* Bottom navigation row — repeat the top links */}
          <div className="flex justify-between items-center mt-10">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-[#003399]"
              style={{ fontSize: 17, fontWeight: 700, color: "#475569", textDecoration: "none" }}
            >
              → בחזרה לאתר
            </Link>
            <Link
              href="/all-articles"
              className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-[#003399]"
              style={{ fontSize: 17, fontWeight: 700, color: "#475569", textDecoration: "none" }}
            >
              כל המאמרים ←
            </Link>
          </div>

        </div>
      </article>

      <style>{`
        .blog-content {
          font-family: var(--font-heebo), sans-serif;
          font-size: 16px;
          line-height: 1.85;
          color: #334155;
        }
        .blog-content h1,
        .blog-content h2 {
          font-weight: 800;
          color: #002069;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .blog-content h1 { font-size: clamp(22px, 3vw, 30px); }
        .blog-content h2 { font-size: clamp(19px, 2.5vw, 26px); }
        .blog-content h3 {
          font-weight: 700;
          font-size: clamp(17px, 2vw, 21px);
          color: #1e3a5f;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-content p { margin-bottom: 1.1rem; }
        .blog-content ul,
        .blog-content ol {
          margin: 0.75rem 0 1.1rem 0;
          padding-right: 1.5rem;
        }
        .blog-content li { margin-bottom: 0.4rem; }
        .blog-content strong { color: #002069; font-weight: 700; }
        .blog-content a {
          color: #3B6FD8;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content blockquote {
          border-right: 4px solid #3B6FD8;
          background: rgba(0,51,153,0.04);
          padding: 0.75rem 1rem;
          border-radius: 0 12px 12px 0;
          margin: 1rem 0;
          font-style: italic;
          color: #475569;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid rgba(0,51,153,0.12);
          margin: 2rem 0;
        }
        .blog-content code {
          background: rgba(0,51,153,0.07);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
          direction: ltr;
          display: inline-block;
        }
      `}</style>
    </>
  );
}
