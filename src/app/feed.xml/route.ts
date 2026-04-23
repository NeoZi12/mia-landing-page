import { getAllPosts } from "@/lib/blogQueries";

const SITE_URL = "https://mia-tax.co.il";
const CANONICAL_NAME = "מיה זינו — ייעוץ מס והנהלת חשבונות";
const FEED_TITLE = "מאמרים | מיה";
const FEED_DESCRIPTION =
  "מאמרים מקצועיים על ייעוץ מס, החזרי מס, הנהלת חשבונות ותכנון פיננסי לעצמאיים ובעלי עסקים.";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const revalidate = 300;

export async function GET() {
  const posts = await getAllPosts();
  const latest = posts[0]?.published_at ?? new Date().toISOString();

  const entries = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const iso = new Date(p.published_at).toISOString();
      return [
        "<entry>",
        `<title>${esc(p.title)}</title>`,
        `<link href="${url}"/>`,
        `<id>${url}</id>`,
        `<updated>${iso}</updated>`,
        `<published>${iso}</published>`,
        `<summary type="html">${esc(p.excerpt)}</summary>`,
        "<author><name>מיה זינו</name></author>",
        "</entry>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="he">',
    `<title>${esc(FEED_TITLE)}</title>`,
    `<subtitle>${esc(FEED_DESCRIPTION)}</subtitle>`,
    `<link href="${SITE_URL}/feed.xml" rel="self"/>`,
    `<link href="${SITE_URL}/"/>`,
    `<id>${SITE_URL}/</id>`,
    `<updated>${new Date(latest).toISOString()}</updated>`,
    `<author><name>${esc(CANONICAL_NAME)}</name></author>`,
    entries,
    "</feed>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
