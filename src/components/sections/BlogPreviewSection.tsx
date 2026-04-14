import Image from "next/image";
import Link from "next/link";
import { getAllPosts, type BlogPost } from "@/lib/blogQueries";
import FadeUpItem from "@/components/motion/FadeUpItem";
import StaggerContainer from "@/components/motion/StaggerContainer";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-[rgba(0,51,153,0.09)] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,51,153,0.13)]"
      style={{
        boxShadow: "0 2px 16px rgba(0,51,153,0.06)",
        textDecoration: "none",
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1200/630" }}>
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-2.5">
        <time
          dateTime={post.published_at}
          style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, letterSpacing: "0.01em" }}
        >
          {formatDate(post.published_at)}
        </time>

        <h3
          className="transition-colors duration-200 group-hover:text-[#003399]"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "#002069",
            lineHeight: 1.35,
          }}
        >
          {post.title}
        </h3>

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

        <span
          className="mt-1 inline-flex items-center gap-1 transition-gap duration-200"
          style={{ fontSize: 13, fontWeight: 600, color: "#3B6FD8" }}
        >
          קראו עוד ←
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPreviewSection() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      dir="rtl"
      className="w-full pt-[104px] pb-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <FadeUpItem standalone>
            <p
              className="inline-block mb-3 rounded-full px-4 py-1 text-sm font-semibold"
              style={{ background: "rgba(0,51,153,0.07)", color: "#003399" }}
            >
              מדריכי מס וטיפים פיננסיים
            </p>
          </FadeUpItem>

          <FadeUpItem standalone delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.2vw, 42px)",
                color: "#1E3A5F",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                marginBottom: 12,
              }}
            >
              ידע שעובד{" "}
              <span style={{ color: "#3B6FD8", fontWeight: 800 }}>
                בשבילך
              </span>
            </h2>
          </FadeUpItem>

          <FadeUpItem standalone delay={0.16}>
            <p
              className="text-[#496177] text-center max-w-[640px] mx-auto"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.4vw, 20px)",
                lineHeight: "32px",
              }}
            >
              מאמרים מקצועיים על מס, הנהלת חשבונות ותכנון פיננסי.
            </p>
          </FadeUpItem>
        </div>

        {/* Cards grid — staggered */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          delayChildren={0.1}
          staggerChildren={0.13}
        >
          {posts.map((post) => (
            <FadeUpItem key={post.slug} className="h-full">
              <ArticleCard post={post} />
            </FadeUpItem>
          ))}
        </StaggerContainer>

        {/* View all CTA */}
        <FadeUpItem standalone delay={0.1} className="mt-10 text-center">
          <Link
            href="/all-articles"
            className="inline-flex items-center gap-2 transition-all duration-200 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="rounded-xl px-8 py-3.5 transition-all duration-200 shadow-md group-hover:shadow-lg group-hover:bg-[#1A2E5A] active:scale-[0.98]"
              style={{
                background: "#0D2049",
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#FFFFFF",
                textShadow: "none",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              צפו בכל המאמרים ←
            </span>
          </Link>
        </FadeUpItem>

      </div>
    </section>
  );
}
