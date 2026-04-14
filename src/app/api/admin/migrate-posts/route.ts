import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

// One-shot migration: reclassify legacy posts (content_md only, no points)
// into the new structured template (intro + 5 points).
// Called once by the admin from /admin/new-post.

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val || val.startsWith("YOUR_")) {
    throw new Error(`Missing or placeholder env var: ${name}`);
  }
  return val;
}

function getGroq() {
  return new Groq({ apiKey: requireEnv("GROQ_API_KEY") });
}

function getSupabase() {
  return createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );
}

const MODEL = "llama-3.3-70b-versatile";

const MIGRATE_PROMPT = `You are converting an existing Hebrew blog article (markdown) into the new structured template.

Produce a JSON object with these keys:
{
  "intro":  "2-3 משפטי מבוא בעברית",
  "points": ["נקודה 1", "נקודה 2", "נקודה 3", "נקודה 4", "נקודה 5"]
}

Rules:
- Preserve the original wording and tone as much as possible — pull phrases directly from the article.
- points: EXACTLY 5 short Hebrew single-line sentences summarising the main points of the article.
- Do NOT invent facts not in the article.
- Return raw JSON only.`;

interface LegacyPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string | null;
}

interface Classified {
  intro: string;
  points: string[];
}

async function classifyLegacy(post: LegacyPost): Promise<Classified> {
  const groq = getGroq();
  const source = [
    `כותרת: ${post.title}`,
    `תקציר: ${post.excerpt}`,
    "",
    "תוכן המאמר:",
    post.content_md ?? "",
  ].join("\n");

  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 2048,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: MIGRATE_PROMPT },
      { role: "user", content: source },
    ],
  });

  const text = completion.choices[0]?.message?.content ?? "";
  const raw = JSON.parse(text);

  if (!Array.isArray(raw.points) || raw.points.length !== 5) {
    throw new Error(`Expected 5 points, got ${Array.isArray(raw.points) ? raw.points.length : "non-array"}`);
  }

  return {
    intro:  String(raw.intro ?? ""),
    points:   raw.points.map((p: unknown) => String(p).trim()).filter(Boolean),
  };
}

export async function POST(request: Request) {
  const password = request.headers.get("x-admin-password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, content_md")
      .is("points", null);

    if (error) throw new Error(`Fetch failed: ${error.message}`);

    const legacy = (data ?? []) as LegacyPost[];
    if (legacy.length === 0) {
      return Response.json({ success: true, migrated: 0, message: "No legacy posts found." });
    }

    const results: { slug: string; ok: boolean; error?: string }[] = [];

    for (const post of legacy) {
      try {
        const classified = await classifyLegacy(post);
        const { error: updateError } = await supabase
          .from("blog_posts")
          .update({
            intro:  classified.intro,
            points: classified.points,
          })
          .eq("id", post.id);

        if (updateError) throw new Error(updateError.message);
        results.push({ slug: post.slug, ok: true });
        console.log(`[migrate-posts] Migrated: ${post.slug}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        results.push({ slug: post.slug, ok: false, error: msg });
        console.error(`[migrate-posts] Failed ${post.slug}: ${msg}`);
      }
    }

    const migrated = results.filter((r) => r.ok).length;
    return Response.json({
      success: true,
      migrated,
      total: legacy.length,
      results,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown server error";
    console.error(`[migrate-posts] Error:`, msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
