import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

// ── Env validation ────────────────────────────────────────────────────────────

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val || val.startsWith("YOUR_")) {
    throw new Error(`Missing or placeholder env var: ${name}`);
  }
  return val;
}

// ── Clients ───────────────────────────────────────────────────────────────────

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

// ── Constants ─────────────────────────────────────────────────────────────────

const MODEL = "llama-3.3-70b-versatile";

const IMAGE_STYLE =
  "Professional flat vector illustration, modern corporate tax and finance concepts, light theme with white and soft gray environments, accented with deep navy and vibrant blue, clean and trustworthy.";

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function fetchAndUploadImage(imagePrompt: string, slug: string): Promise<string> {
  const supabase = getSupabase();
  const fullPrompt = `${imagePrompt} ${IMAGE_STYLE}`;
  const encoded = encodeURIComponent(fullPrompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=630&nologo=true&seed=random`;

  const response = await fetch(url, { signal: AbortSignal.timeout(90_000) });
  if (!response.ok) {
    throw new Error(`Pollinations fetch failed: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const fileName = `${slug}-${Date.now()}.png`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(fileName, buffer, {
      contentType: "image/png",
      cacheControl: "31536000",
      upsert: true,
    });

  if (uploadError) throw new Error(`Supabase upload failed: ${uploadError.message}`);

  const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
  return data.publicUrl;
}

// ── System prompt ─────────────────────────────────────────────────────────────
// Grok's job is to CLASSIFY the admin's Hebrew text into structured fields —
// NOT to rewrite, paraphrase, embellish, or invent content. Admin has full
// control over wording. AI only chooses which sentence goes in which slot and
// generates SEO metadata + image prompt.

const SYSTEM_PROMPT = `You are a precision content extractor for the Hebrew blog of "מיה זינו — ייעוץ מס והנהלת חשבונות".

YOUR ROLE: You function as a high-fidelity mapping engine. Your goal is to take the admin's raw Hebrew text and place it into the correct structured fields WITHOUT CHANGING A SINGLE WORD.

STRICT RULES — MISSION CRITICAL:
1. NO SHORTENING: Do not summarize, truncate, or shorten the admin's text. 
2. NO REWRITING: Do not paraphrase, "improve", or translate the admin's Hebrew wording. Copy and paste exactly.
3. FULL FIDELITY: Every piece of information provided by the admin must be preserved in either the 'intro' or the 'points' array.
4. PARAGRAPHS ALLOWED: Points in the "points" array can be long paragraphs if that is how they are written. Do not force them into single sentences.
5. FLEXIBLE COUNT: Provide as many points as there are logical sections or paragraphs in the original text (at least 1). DO NOT force exactly 5 points if the content doesn't warrant it.

Return ONLY a raw JSON object:
{
  "title":            "The exact headline/title from the text",
  "intro":            "The opening sentences or introduction paragraph exactly as written",
  "points":           ["Exactly copied section/paragraph 1", "Exactly copied section/paragraph 2", "..."],
  "slug":             "english-url-slug-based-on-title",
  "meta_description": "A concise summary (max 160 chars) derived from the PROVIDED text",
  "keywords":         ["4-7 Hebrew keywords relevant to the content"],
  "imagePrompt":      "Concise English description for a professional flat vector illustration (corporate finance/tax style), no text, no faces"
}

No markdown fences. No commentary. Raw JSON only.`;

// ── Types ─────────────────────────────────────────────────────────────────────

interface ClassifiedArticle {
  title: string;
  intro: string;
  points: string[];
  slug: string;
  meta_description: string;
  keywords: string[];
  imagePrompt: string;
}

function validateArticle(a: unknown): ClassifiedArticle {
  if (!a || typeof a !== "object") throw new Error("AI did not return an object");
  const obj = a as Record<string, unknown>;

  const required = ["title", "intro", "points", "meta_description", "imagePrompt"];
  for (const key of required) {
    if (!obj[key]) throw new Error(`AI response missing field: ${key}`);
  }

  if (!Array.isArray(obj.points) || obj.points.length === 0) {
    throw new Error("AI must return at least one point in the 'points' array");
  }

  return {
    title:            String(obj.title).trim(),
    intro:            String(obj.intro).trim(),
    points:           (obj.points as unknown[]).map((p) => String(p).trim()).filter(Boolean),
    slug:             String(obj.slug ?? "").trim(),
    meta_description: String(obj.meta_description).trim(),
    keywords:         Array.isArray(obj.keywords) ? obj.keywords.map(String) : [],
    imagePrompt:      String(obj.imagePrompt).trim(),
  };
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // 1. Auth
  const password = request.headers.get("x-admin-password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse body
  let rawContent: string;
  try {
    const body = await request.json();
    rawContent = (body.content ?? "").trim();
    if (rawContent.length < 20) {
      return Response.json({ error: "Content too short (min 20 chars)" }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  console.log(`[generate-post] model: ${MODEL} | content length: ${rawContent.length}`);

  try {
    // 3. Classify admin's text with Groq (low temperature — we want fidelity, not creativity)
    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      max_tokens: 4096,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `סווגי את הטקסט הבא לשדות המבוקשים, תוך שמירה מילה במילה על ניסוחי המנהל:\n\n${rawContent}`,
        },
      ],
    });

    const responseText = completion.choices[0]?.message?.content ?? "";
    if (!responseText) throw new Error("Groq returned empty response");

    let parsed: unknown;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      const stripped = responseText
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
      parsed = JSON.parse(stripped);
    }

    const article = validateArticle(parsed);

    // 4. Sanitise slug
    let slug = slugify(article.slug || article.title);
    if (!slug) slug = `post-${Date.now()}`;

    // 5. Generate + upload image
    const imageUrl = await fetchAndUploadImage(article.imagePrompt, slug);

    // 6. Insert into Supabase (structured fields + excerpt = intro for preview cards)
    const supabase = getSupabase();
    const row = {
      slug,
      title:            article.title,
      intro:            article.intro,
      points:           article.points,
      excerpt:          article.intro,
      content_md:       null,
      meta_description: article.meta_description,
      keywords:         article.keywords,
      image_url:        imageUrl,
      published_at:     new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from("blog_posts").insert(row);

    if (insertError) {
      if (insertError.code === "23505") {
        slug = `${slug}-${Date.now()}`;
        await supabase.from("blog_posts").insert({ ...row, slug });
      } else {
        throw new Error(`DB insert failed: ${insertError.message}`);
      }
    }

    console.log(`[generate-post] Published: /blog/${slug}`);
    return Response.json({ success: true, slug });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown server error";
    console.error(`[generate-post] Error:`, msg);

    let userMessage = msg;
    if (msg.includes("401") || msg.includes("invalid_api_key")) {
      userMessage = "GROQ_API_KEY invalid. Get a free key at console.groq.com.";
    } else if (msg.includes("429") || msg.includes("rate_limit")) {
      userMessage = "Groq rate limit hit. Wait a minute and try again.";
    } else if (msg.includes("Missing or placeholder")) {
      userMessage = msg;
    }

    return Response.json({ error: userMessage }, { status: 500 });
  }
}
