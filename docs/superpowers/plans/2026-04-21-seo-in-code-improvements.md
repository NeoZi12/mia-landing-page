# SEO In-Code Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the four work areas from the SEO design spec (`docs/superpowers/specs/2026-04-21-seo-in-code-improvements-design.md`) — schema/JSON-LD enrichment, invisible DOM tweaks, sitemap + RSS feed, and verification — with **zero visible design changes** and full Google compliance.

**Architecture:** Pure metadata, JSON-LD, and semantic-HTML changes to an existing Next.js 15 App Router site. The only user-visible code edit is the hero H1/`<p>` semantic swap, which MUST be pixel-identical. No new pages, no new content, no image modifications, no font modifications, no animation/motion code touched.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion (untouched), `next/font/google` (untouched), Supabase (untouched), Vercel (deploy target).

---

## Hard Constraints (non-negotiable — stop and ask if any task seems to violate these)

1. **Pixel-identical output.** The site must look and behave identically to users. Only HTML semantics, head tags, JSON-LD, and sitemap/feed XML change.
2. **No new content.** No new sections, no new copy, no expanded bios, no FAQs.
3. **No image changes.** No format swaps (no PNG→WebP/AVIF), no recompression, no renames.
4. **No font changes.** Heebo stays on `["300","400","600","700","800"]`. Subsets stay on `["hebrew","latin"]`.
5. **No animation changes.** Framer Motion code, motion timing, Intersection Observer thresholds, paper-fall animation — all untouched.
6. **Google-compliant.** No hidden text, no cloaking, no doorway pages, no keyword stuffing.

---

## Canonical NAP (byte-exact — copy verbatim)

Pulled from memory (`project_canonical_nap.md`). Every NAP-carrying string in this plan uses this exact form:

- **Name (full canonical):** `מיה זינו — ייעוץ מס והנהלת חשבונות`
  *(em-dash `—` U+2014, NOT a hyphen; includes "זינו")*
- **Short-form allowed in title templates and copyright only:** `מיה`
- **Address:** `לאה גולדברג 1, קריית מוצקין`
- **Phone (E.164 — used in JSON-LD):** `+972584087061`
- **Phone (display — used in visible text):** `058-408-7061`
- **WhatsApp URL:** `https://wa.me/972584087061`

---

## Prerequisites

- [ ] **Start dev server.** Run `npm run dev` in one terminal. Keep it running for visual checks.

- [ ] **Baseline Lighthouse reports.** Before touching any code, run Chrome DevTools → Lighthouse on `http://localhost:3000` for both desktop and mobile. Save both HTML reports somewhere outside the repo. These are the "before" baselines used in Phase 6.

- [ ] **Look up geo coordinates.** On Google Maps, search for `לאה גולדברג 1, קריית מוצקין`. Record:
  - `latitude` and `longitude` as numeric literals with ≥6 decimal places.
  - The full share URL (copy from Maps' "Share → Copy link" — the `https://www.google.com/maps/place/...` form, not a short `maps.app.goo.gl` link).
  - Save both to a scratch note; they'll be hard-coded in Task 2.1.

- [ ] **Screenshot the hero — desktop and mobile.** Open `http://localhost:3000` on a desktop browser at 1440×900, take a full-page screenshot of the hero section. Switch to mobile viewport (375×812), take another. These are the visual baseline for the H1 swap pixel-diff check in Task 5.1.

---

## Phase 1 — Feed + Sitemap (low risk, pure new files/data)

### Task 1.1: Add Atom feed route at `/feed.xml`

**Files:**
- Create: `src/app/feed.xml/route.ts`

- [ ] **Step 1: Create the feed route handler**

Create `src/app/feed.xml/route.ts`:

```typescript
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
```

- [ ] **Step 2: Verify the feed renders**

In a browser: open `http://localhost:3000/feed.xml`.
Expected: valid Atom XML with `<feed xmlns="http://www.w3.org/2005/Atom" …>`, `Content-Type: application/atom+xml`, and one `<entry>` per blog post.

Also validate in https://validator.w3.org/feed/. Expected: valid.

- [ ] **Step 3: Commit**

```bash
git add src/app/feed.xml/route.ts
git commit -m "feat(seo): add Atom feed at /feed.xml"
```

---

### Task 1.2: Register feed alternate link + include in sitemap

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add `alternates.types` to root metadata**

In `src/app/layout.tsx`, inside the `export const metadata: Metadata = { ... }` block, change:

```typescript
alternates: {
  canonical: "/",
},
```

to:

```typescript
alternates: {
  canonical: "/",
  types: {
    "application/atom+xml": "/feed.xml",
  },
},
```

- [ ] **Step 2: Add feed URL to sitemap static routes**

In `src/app/sitemap.ts`, add a new entry to the `staticRoutes` array after the `/all-articles` entry:

```typescript
{
  url: `${SITE_URL}/feed.xml`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.5,
},
```

- [ ] **Step 3: Verify**

- Reload `http://localhost:3000/`. View page source. Search for `alternate` and `atom+xml`. Expected: `<link rel="alternate" type="application/atom+xml" href="/feed.xml">` in `<head>`.
- Open `http://localhost:3000/sitemap.xml`. Expected: feed URL present.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/sitemap.ts
git commit -m "feat(seo): register /feed.xml in head alternates and sitemap"
```

---

### Task 1.3: Extend sitemap with image references

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add image arrays to each sitemap entry**

In `src/app/sitemap.ts`:

1. Import the `Sitemap` type entry with image support (already available through `MetadataRoute.Sitemap`).
2. Add an `images` field to each route:

Replace the full body of `sitemap()` with:

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/all-articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/feed.xml`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE_URL}/og-image.jpg`],
  }));

  const posts = await getAllPosts().catch(() => []);
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "monthly",
    priority: 0.7,
    images: post.image_url ? [post.image_url] : undefined,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000/sitemap.xml`. Expected: each URL entry now contains `<image:image><image:loc>…</image:loc></image:image>` (Next.js emits these automatically when `images` is populated).

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): extend sitemap with per-URL image references"
```

---

## Phase 2 — Root JSON-LD Enrichment

### Task 2.1: Upgrade business `@type` + add `geo` + `hasMap` + image array

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite the AccountingService JSON-LD node**

In `src/app/layout.tsx`, locate the node in `jsonLd["@graph"]` with `"@type": "AccountingService"` (around lines 150–184). Replace it in full with:

```typescript
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
    latitude: <LAT_FROM_PREREQS>,
    longitude: <LNG_FROM_PREREQS>,
  },
  hasMap: "<GOOGLE_MAPS_SHARE_URL_FROM_PREREQS>",
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
```

**Important:** Replace the three placeholders (`<LAT_FROM_PREREQS>`, `<LNG_FROM_PREREQS>`, `<GOOGLE_MAPS_SHARE_URL_FROM_PREREQS>`) with the actual values from the Prerequisites step. `latitude` and `longitude` must be numeric literals (no quotes). `hasMap` must be a string (with quotes).

- [ ] **Step 2: Verify in Rich Results Test**

1. Deploy to a preview URL OR use view-source in dev: open `http://localhost:3000/` → view source → find the `<script type="application/ld+json">` block → copy its contents.
2. Paste into https://search.google.com/test/rich-results → select "code" mode.
3. Expected: no errors. Under "detected items," confirm "Local business" (or similar) appears.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): upgrade business @type to LocalBusiness + add geo/hasMap/image[]"
```

---

### Task 2.2: Expand `knowsAbout` with city tokens

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Extend `knowsAbout` on Organization entity**

In the Organization node (`"@type": "Organization"`), replace the `knowsAbout` array with:

```typescript
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
```

- [ ] **Step 2: Extend `knowsAbout` on Person entity**

In the Person node, replace its `knowsAbout` array with the same expanded list as Step 1 (keep them consistent — the person and org know about the same things).

- [ ] **Step 3: Verify**

View source on home, confirm the JSON-LD contains the expanded list. Re-run Rich Results Test; expected: still no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): expand knowsAbout with target-area city tokens"
```

---

### Task 2.3: Add `WebPage` entity to root layout graph

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Append WebPage node to `@graph`**

Add a new entry at the END of the `@graph` array in `jsonLd` (after WebSite):

```typescript
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
```

Note: this represents the homepage only. Service/blog/all-articles pages already include their own page-level JSON-LD — they don't need a WebPage added in the root.

- [ ] **Step 2: Verify**

Rich Results Test on the homepage JSON-LD → confirm `WebPage` appears under detected items.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add WebPage entity to homepage JSON-LD graph"
```

---

## Phase 3 — Per-page JSON-LD

### Task 3.1: Add `HowTo` schema on service pages

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`

- [ ] **Step 1: Extend service-page `@graph` with HowTo**

In `src/app/services/[slug]/page.tsx`, find the `jsonLd` object inside `ServicePage`. Append this entry to the `@graph` array (after `BreadcrumbList`):

```typescript
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
```

- [ ] **Step 2: Verify**

1. Open any `/services/[slug]` URL in dev, e.g., `http://localhost:3000/services/small-business`.
2. View source → find JSON-LD block → copy.
3. Paste into Rich Results Test.
4. Expected: "HowTo" detected under items, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/[slug]/page.tsx
git commit -m "feat(seo): emit HowTo schema on service pages from existing steps"
```

---

### Task 3.2: Enrich `Service.areaServed` with specific cities

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`

- [ ] **Step 1: Replace `areaServed` on Service node**

In the same file, inside the `Service` node of `@graph`, replace:

```typescript
areaServed: { "@type": "Country", name: "Israel" },
```

with:

```typescript
areaServed: [
  { "@type": "Country", name: "Israel" },
  { "@type": "City", name: "קריית מוצקין" },
  { "@type": "City", name: "חיפה" },
  { "@type": "City", name: "קריית ביאליק" },
  { "@type": "City", name: "קריית ים" },
  { "@type": "City", name: "קריית אתא" },
  { "@type": "City", name: "נשר" },
  { "@type": "City", name: "עכו" },
  { "@type": "City", name: "טירת הכרמל" },
],
```

- [ ] **Step 2: Verify**

Re-test any service page in Rich Results Test. Expected: `Service.areaServed` array populated, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/[slug]/page.tsx
git commit -m "feat(seo): enrich Service.areaServed with target Krayot cities"
```

---

### Task 3.3: Add `WebPage` entity to service, blog, and all-articles pages

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/all-articles/page.tsx`

- [ ] **Step 1: Service pages — add WebPage**

In `src/app/services/[slug]/page.tsx`, append to the service-page `@graph` (after HowTo):

```typescript
{
  "@type": "WebPage",
  "@id": `${serviceUrl}#webpage`,
  url: serviceUrl,
  name: `${service.title} | מיה`,
  description: service.primaryText,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${serviceUrl}#service` },
  inLanguage: "he-IL",
  breadcrumb: { "@id": `${serviceUrl}#breadcrumb` },
},
```

And **rename** the existing `BreadcrumbList` node to include `"@id": \`${serviceUrl}#breadcrumb\`` (currently it has no `@id`). This enables the `breadcrumb:` reference above.

- [ ] **Step 2: Blog posts — add WebPage**

In `src/app/blog/[slug]/page.tsx`, append to the post `@graph` (after BreadcrumbList):

```typescript
{
  "@type": "WebPage",
  "@id": `${SITE_URL}/blog/${slug}#webpage`,
  url: `${SITE_URL}/blog/${slug}`,
  name: `${post.title} | מיה`,
  description: post.meta_description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/blog/${slug}#article` },
  inLanguage: "he-IL",
  breadcrumb: { "@id": `${SITE_URL}/blog/${slug}#breadcrumb` },
},
```

And add `"@id": \`${SITE_URL}/blog/${slug}#breadcrumb\`` to the existing `BreadcrumbList` in the same file.

- [ ] **Step 3: All-articles page — link existing CollectionPage to breadcrumb**

In `src/app/all-articles/page.tsx`, find the `jsonLd` const. Add `"@id": \`${SITE_URL}/all-articles#breadcrumb\`` to the existing `BreadcrumbList`. The existing `CollectionPage` already acts as the page entity; no additional WebPage needed.

- [ ] **Step 4: Verify**

For each page type (`/services/small-business`, `/blog/<any-slug>`, `/all-articles`): view source → copy JSON-LD → Rich Results Test. Expected: no errors on any page.

- [ ] **Step 5: Commit**

```bash
git add src/app/services/[slug]/page.tsx src/app/blog/[slug]/page.tsx src/app/all-articles/page.tsx
git commit -m "feat(seo): add WebPage entities and @ids for breadcrumb linking across page types"
```

---

## Phase 4 — NAP Canonicalization

> **Rule:** Every occurrence of the business name in the codebase must match the canonical form above, byte-for-byte. The short form `מיה` is allowed ONLY in (a) the Next.js title template (`template: "%s | מיה"`), and (b) copyright strings. Everywhere else — use the full canonical form with em-dash.

### Task 4.1: Audit and inventory current NAP occurrences

- [ ] **Step 1: Grep for every business-name variant**

Run each of these with the Grep tool (or `git grep` / `rg`) across the `src/` and `public/` directories, and record the files and line numbers returned:

```
pattern: "מיה - "         (regular hyphen + space — WRONG)
pattern: "מיה — "         (em-dash + space — current partial, still missing "זינו")
pattern: "מיה זינו"       (full name — correct prefix)
pattern: "מיה"            (bare short form — verify each occurrence's context)
```

- [ ] **Step 2: Classify each hit**

For each hit, decide:
- **CHANGE** → replace with canonical `מיה זינו — ייעוץ מס והנהלת חשבונות`.
- **KEEP as `מיה`** → only if it's the title template `template: "%s | מיה"` or a copyright line or a short brand reference in visible body copy where length matters AND a neighboring canonical form already exists on the page.
- **KEEP as existing** → in JSON-LD `Person.name: "מיה זינו"` (a personal name, not NAP — correct as-is).

Write the inventory to a scratch note before making changes. No edits yet.

- [ ] **Step 3: No commit** — this is a research task only.

---

### Task 4.2: Update `SITE_NAME` in root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Change the SITE_NAME constant**

In `src/app/layout.tsx`, change:

```typescript
const SITE_NAME = "מיה - ייעוץ מס והנהלת חשבונות";
```

to:

```typescript
const SITE_NAME = "מיה זינו — ייעוץ מס והנהלת חשבונות";
```

Note: the em-dash character is U+2014 (`—`), not a regular hyphen (`-`).

- [ ] **Step 2: Verify**

- In dev, view `http://localhost:3000/` source. Confirm the `<title>` tag reads `מיה זינו — ייעוץ מס והנהלת חשבונות` (not `מיה - …`).
- Confirm the JSON-LD `name` fields referencing `SITE_NAME` now use the canonical form.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix(seo): canonicalize SITE_NAME to 'מיה זינו — ייעוץ מס והנהלת חשבונות'"
```

---

### Task 4.3: Canonicalize the footer brand line

**Files:**
- Modify: `src/components/SiteFooter.tsx`

- [ ] **Step 1: Update the visible brand span**

In `src/components/SiteFooter.tsx`, find:

```tsx
<span
  className="hidden sm:inline"
  style={{ ... }}
>
  מיה - ייעוץ מס והנהלת חשבונות
</span>
```

Change the text from `מיה - ייעוץ מס והנהלת חשבונות` to `מיה זינו — ייעוץ מס והנהלת חשבונות`.

Also update the copyright line in the same file:

```tsx
© {new Date().getFullYear()} מיה. כל הזכויות שמורות.
```

This one STAYS as-is (`מיה` short form is allowed in copyright per the rule).

- [ ] **Step 2: Visual check**

Reload `http://localhost:3000/` → scroll to footer → confirm the brand line now shows the full canonical form. Take a before/after screenshot at desktop width to confirm no layout break.

**If the text now wraps to a second line** or visibly shifts anything, STOP. The brand line lives in a flex row with the logo. Report back; do not improvise a design change.

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteFooter.tsx
git commit -m "fix(seo): canonicalize footer brand line to full NAP form"
```

---

### Task 4.4: Canonicalize the hero brand line

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Update the hero brand span**

In `src/components/sections/HeroSection.tsx`, find the span near the logo that currently reads:

```tsx
<span
  style={{ ... }}
>
  מיה — משרד ייעוץ מס והנהלת חשבונות
</span>
```

Change the text to:

```
מיה זינו — ייעוץ מס והנהלת חשבונות
```

Notes:
- The existing "משרד" descriptor is REMOVED to match the canonical form. Per the canonical NAP rule, descriptors are allowed "around the canonical" — but since we're using this as the H1 in Task 5.1 (it must match NAP byte-for-byte), strip to the canonical form.
- If removing "משרד" causes the text to visibly fit *better* (fewer chars), confirm no unexpected layout shift.

- [ ] **Step 2: Visual check**

Reload `http://localhost:3000/`. Compare hero to the baseline screenshot taken in Prerequisites. Expected: the brand line now reads exactly `מיה זינו — ייעוץ מס והנהלת חשבונות`. Confirm:
- Line wraps or doesn't wrap the same as before (text is actually slightly shorter, so no new wrap should appear).
- Logo placement unchanged.
- No CSS change.

Take a new screenshot. File a pixel-diff between baseline and current on the hero area. Expected: only the text content differs (1–2 chars per line); no layout or size shift.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "fix(seo): canonicalize hero brand line to full NAP form"
```

---

### Task 4.5: Canonicalize remaining NAP occurrences

**Files:**
- Any remaining files from the Task 4.1 inventory.

- [ ] **Step 1: Update remaining occurrences**

Using the inventory from Task 4.1, update each remaining NAP-carrying string to the canonical `מיה זינו — ייעוץ מס והנהלת חשבונות`.

Likely candidates (confirm from inventory — don't just trust this list):
- `src/components/Navbar.tsx` — logo `alt` attribute. Current: `"לוגו מיה - משרד ייעוץ מס ורואי חשבון"`. Change to `"לוגו מיה זינו — ייעוץ מס והנהלת חשבונות"`.
- `src/components/SiteFooter.tsx` — logo `alt` attribute. Same change.
- Any OG title or meta that hardcodes a variant form.
- Any JSON-LD `name` field not referencing `SITE_NAME`.

- [ ] **Step 2: Final grep verification**

Grep once more:
```
pattern: "מיה - "       — expected: zero hits (regular hyphen + space after "מיה" should no longer appear as a brand line).
pattern: "מיה — משרד"   — expected: zero hits.
```

If any hits appear, investigate each one.

- [ ] **Step 3: Commit**

```bash
git add <files changed>
git commit -m "fix(seo): canonicalize remaining NAP occurrences site-wide"
```

---

## Phase 5 — Invisible DOM Tweaks

### Task 5.1: Hero H1 semantic swap

**This is the ONLY task in the entire plan that touches a user-visible JSX element's tag. Extra care required.**

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Understand the current structure**

Currently in `HeroSection.tsx`:
- The logo + brand-line group is wrapped in a `<motion.div>` and uses `<span>` for the brand text.
- The three-line headline uses `<h1>` containing nested `<span>` elements.

The swap:
- The brand-line `<span>` becomes the `<h1>`.
- The three-line headline's `<h1>` becomes a `<p>` (or `<div role="heading" aria-level={2}>` — use `<p>` for simplicity, it does not need heading semantics for SEO).

- [ ] **Step 2: Convert brand-line `<span>` → `<h1>`**

Find the brand line (now containing the canonical NAP after Task 4.4):

```tsx
<span
  style={{
    fontFamily: "var(--font-heebo), sans-serif",
    fontWeight: 700,
    fontSize: "clamp(20px, 4vw, 30px)",
    letterSpacing: "-0.4px",
    color: "rgba(255,255,255,0.88)",
    whiteSpace: "nowrap",
  }}
>
  מיה זינו — ייעוץ מס והנהלת חשבונות
</span>
```

Change the wrapping tag from `<span>` to `<h1>`:

```tsx
<h1
  style={{
    fontFamily: "var(--font-heebo), sans-serif",
    fontWeight: 700,
    fontSize: "clamp(20px, 4vw, 30px)",
    letterSpacing: "-0.4px",
    color: "rgba(255,255,255,0.88)",
    whiteSpace: "nowrap",
    margin: 0,
  }}
>
  מיה זינו — ייעוץ מס והנהלת חשבונות
</h1>
```

**Critical:** Add `margin: 0` to cancel the browser default `<h1>` margin — this is the only way to preserve pixel-identical layout. Also verify that no global CSS in `globals.css` injects additional margin/padding on `h1`. If it does, override here.

- [ ] **Step 3: Convert three-line `<h1>` → `<p>`**

Find:

```tsx
<h1
  className="flex flex-col items-center text-center"
  style={{ … }}
>
  …three nested spans…
</h1>
```

Change `<h1>` to `<p>`. Keep `className`, `style`, and all children identical:

```tsx
<p
  className="flex flex-col items-center text-center"
  style={{ … existing styles … , margin: 0 }}
>
  …three nested spans…
</p>
```

**Critical:** Add `margin: 0` to cancel browser default `<p>` margin.

- [ ] **Step 4: Pixel-diff check**

1. Reload `http://localhost:3000/`. Compare against the baseline hero screenshot from Prerequisites.
2. Take a new screenshot at desktop (1440×900) and mobile (375×812).
3. Compare pixel-by-pixel (use https://diffchecker.com/image-diff or any image-diff tool).
4. **Expected: zero pixel difference** (except for the one-character text difference from Task 4.4, which has already been applied).
5. If ANY layout, size, or spacing difference is visible, investigate. Most likely causes: default heading/paragraph margin, different line-height. Override in the inline style until pixel-identical.

- [ ] **Step 5: Accessibility check**

- Verify in DevTools → Accessibility pane that the page's H1 is now "מיה זינו — ייעוץ מס והנהלת חשבונות" (only one H1 per page is the right state).
- Run Lighthouse → Accessibility. Expected: no H1 regression.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "fix(seo): swap hero H1 semantics — brand line becomes H1, headline becomes P"
```

---

### Task 5.2: Image alt text rewrites

**Files:**
- Modify: `src/components/sections/HeroSection.tsx` (if any alt)
- Modify: `src/components/sections/AboutHeroSection.tsx`
- Modify: `src/components/sections/ServiceExplanationSection.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/app/blog/[slug]/page.tsx` (hero image of post)

> **Rule:** Alt text must primarily describe the image. Keywords only where natural and accurate. Zero stuffing. Max ~125 chars per alt (screen reader limit).

- [ ] **Step 1: Rewrite alt attributes per the table below**

| File | Image | Current alt | New alt (approved keyword-natural) |
|---|---|---|---|
| `HeroSection.tsx` | logo `/images/maya logo 2.png` | `""` (decorative, aria-hidden) | **Keep as-is** — decorative, no alt change |
| `AboutHeroSection.tsx` (mobile) | `/images/miaprofile.jpg` | `מיה זינו - יועצת מס, קריית מוצקין` | `מיה זינו — יועצת מס והנהלת חשבונות בקריית מוצקין, חיפה והקריות` |
| `AboutHeroSection.tsx` (desktop) | `/images/miaprofile.jpg` | `מיה זינו - יועצת מס ורואת חשבון, קריית מוצקין` | `מיה זינו — יועצת מס והנהלת חשבונות בקריית מוצקין, חיפה והקריות` |
| `ServiceExplanationSection.tsx` | `/images/office-pic2.webp` (hero bg) | `""` (aria-hidden — decorative) | **Keep as-is** |
| `ServiceExplanationSection.tsx` | `/images/office-pic3.webp` (CTA bg) | `""` (aria-hidden) | **Keep as-is** |
| `Navbar.tsx` | logo | `לוגו מיה - משרד ייעוץ מס ורואי חשבון` | **Already updated in Task 4.5** |
| `SiteFooter.tsx` | logo | `לוגו מיה - משרד ייעוץ מס ורואי חשבון` | **Already updated in Task 4.5** |
| `blog/[slug]/page.tsx` | `post.image_url` (hero) | `post.title` | **Keep as-is** — data-driven, editorial content |

- [ ] **Step 2: Correct the two `AboutHeroSection` alts**

In `src/components/sections/AboutHeroSection.tsx`:

- Find the mobile-only `<Image alt="מיה זינו - יועצת מס, קריית מוצקין" ... />` — change to `alt="מיה זינו — יועצת מס והנהלת חשבונות בקריית מוצקין, חיפה והקריות"`.
- Find the desktop `<Image alt="מיה זינו - יועצת מס ורואת חשבון, קריית מוצקין" ... />` — change to `alt="מיה זינו — יועצת מס והנהלת חשבונות בקריית מוצקין, חיפה והקריות"`.

Note the hyphen → em-dash normalization.

- [ ] **Step 3: Verify**

- Reload home. Inspect the mia-profile image in DevTools. Confirm new alt text.
- Run Lighthouse → Accessibility. Expected: no regression.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/AboutHeroSection.tsx
git commit -m "fix(seo): keyword-natural alt text on founder photo"
```

---

### Task 5.3: Rewrite meta descriptions for SERP CTR

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/services/[slug]/page.tsx`
- Modify: `src/app/all-articles/page.tsx`

> **Rule:** Meta descriptions are ≤160 chars, accurate, and optimized for click-through. Include primary keyword + locality + value prop. No stuffing.

- [ ] **Step 1: Root description**

In `src/app/layout.tsx`, change `SITE_DESCRIPTION` from the current value to:

```typescript
const SITE_DESCRIPTION =
  "יועצת מס והנהלת חשבונות בקריית מוצקין — שירות דיגיטלי לעצמאיים וחברות בכל הקריות, חיפה והסביבה. ייעוץ מס, החזרי מס, תיאום מס. שיחת ייעוץ ראשונית.";
```

Character count should be ≤160. If >160, tighten.

- [ ] **Step 2: Service-page meta description**

In `src/app/services/[slug]/page.tsx`, find `generateMetadata`. Currently the description is derived from `service.primaryText.slice(0, 157)`. Replace with a locality-anchored template:

```typescript
const baseDescription =
  service.primaryText.length > 140
    ? `${service.primaryText.slice(0, 137).trimEnd()}...`
    : service.primaryText;
const description = `${baseDescription} שירות מקריית מוצקין לכל הארץ.`.slice(0, 160);
```

This ensures every service page's description ends with the locality anchor, and it stays ≤160.

- [ ] **Step 3: All-articles description**

In `src/app/all-articles/page.tsx`, change the `description` in both the exported `metadata` and the `jsonLd` `CollectionPage.description` to:

```typescript
"מאמרים מקצועיים בעברית על ייעוץ מס, החזרי מס, הנהלת חשבונות ותכנון פיננסי — לעצמאיים, שכירים ובעלי עסקים. תוכן עדכני מיועצת מס בקריית מוצקין."
```

Count characters, trim if >160.

- [ ] **Step 4: Verify**

For each route (home, `/services/small-business`, `/all-articles`): view source, find `<meta name="description" content="…">`, confirm the new content and length ≤160 chars.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/services/[slug]/page.tsx src/app/all-articles/page.tsx
git commit -m "fix(seo): rewrite meta descriptions with locality anchor and CTR framing"
```

---

### Task 5.4: Head resource hints — verification, not addition

**Files:**
- No edits unless verification fails.

> **Background:** The existing setup already handles resource hints automatically. `next/font/google` self-hosts Heebo (no `fonts.googleapis.com` preconnect needed — it'd be preconnecting to a host we don't use). The hero `Image` uses `priority={true}`, which makes Next.js auto-emit `<link rel="preload">` for the LCP image. This task confirms the defaults are working and adds manual hints ONLY if they're missing.

- [ ] **Step 1: Verify hero image preload**

Open `http://localhost:3000/` → view source → search for `<link rel="preload"`. Expected: a preload link for `/images/papers-start.png` (or a Next-optimized variant like `_next/image?...papers-start.png…`).

If present → no action. Task complete.
If missing → add the following to `src/app/layout.tsx` inside `<head>` (which you may need to declare explicitly):

```tsx
<head>
  <link rel="preload" as="image" href="/images/papers-start.png" />
</head>
```

- [ ] **Step 2: Verify fonts are self-hosted**

View source → search for `googleapis.com` and `gstatic.com`. Expected: zero hits (Next self-hosts). If hits appear, investigate `next/font` config — don't add preconnects, fix the root cause.

- [ ] **Step 3: Commit (only if a change was made)**

```bash
git add src/app/layout.tsx
git commit -m "fix(seo): add manual LCP preload for hero image (auto-preload was missing)"
```

If no change was needed, skip the commit.

---

## Phase 6 — Verification

### Task 6.1: Rich Results Test sweep

- [ ] **Step 1: Test each page type**

Deploy to a preview (Vercel preview deployment) OR make the dev server reachable. Then run https://search.google.com/test/rich-results on:

1. `https://<preview-url>/`
2. `https://<preview-url>/services/small-business`
3. `https://<preview-url>/services/authorized-dealer`
4. `https://<preview-url>/services/retirement-planning`
5. `https://<preview-url>/services/tax-coordination`
6. `https://<preview-url>/services/tax-refund-employees`
7. `https://<preview-url>/all-articles`
8. `https://<preview-url>/blog/<any-post-slug>`

For each:
- Expected: no errors.
- Expected detected items:
  - Home → `LocalBusiness`, `Organization`, `Person`, `WebSite`, `WebPage`.
  - Service pages → `Service`, `BreadcrumbList`, `HowTo`, `WebPage`.
  - Blog posts → `BlogPosting`, `BreadcrumbList`, `WebPage`.
  - All-articles → `CollectionPage`, `BreadcrumbList`.

- [ ] **Step 2: Schema Validator cross-check**

Run https://validator.schema.org/ on the same URLs. Expected: no errors (warnings for optional fields are OK).

- [ ] **Step 3: No commit** — verification only.

---

### Task 6.2: Lighthouse regression check

- [ ] **Step 1: Run Lighthouse on desktop and mobile**

On the same preview URL (or local dev):

- Chrome DevTools → Lighthouse tab.
- Desktop mode → run → save report.
- Mobile mode → run → save report.

- [ ] **Step 2: Compare scores to baseline**

Compare to the baseline reports from Prerequisites:

| Metric | Expected |
|---|---|
| SEO | 100 (target) — baseline was already high; should now be 100. |
| Performance | **Must not regress.** Equal or better. |
| Accessibility | Equal or better (the alt text changes should nudge it up). |
| Best Practices | Equal or better. |

If Performance drops by ≥3 points, investigate. Likely culprit: the manual preload in Task 5.4 if it targets the wrong asset. Revert and diagnose.

- [ ] **Step 3: No commit** — verification only.

---

### Task 6.3: Visual + animation QA

- [ ] **Step 1: Visual diff on every page type**

Open these pages in desktop and mobile viewports, compare with baseline screenshots:

1. `/` (home — especially the hero, the footer, the about section).
2. `/services/small-business` (any service).
3. `/blog/<slug>` (any blog post).
4. `/all-articles`.

**Expected: pixel-identical** (modulo the intentional text changes from Task 4.4, Task 4.5, and the hero brand line).

If any visual regression is visible, stop and report. Do not improvise.

- [ ] **Step 2: Animation QA**

- Reload home in desktop. Watch the hero on load: falling papers, the four-line stagger (logo → badge → headline → subtitle → CTA). Confirm timing, easing, and smoothness match baseline.
- Scroll through the page: watch the SectionReveal entrances on About, Services, WhyUs, HowItWorks, Blog. Confirm each feels identical.
- Reload on mobile. Repeat.
- Expected: every animation looks and feels the same.

If anything feels different, stop and report.

- [ ] **Step 3: No commit** — verification only.

---

### Task 6.4: Final NAP consistency grep

- [ ] **Step 1: Run final grep**

Grep the entire `src/` and `public/` directories for:

```
pattern: "מיה - "
pattern: "מיה-"
pattern: "מיה—"      (em-dash without surrounding spaces — potential formatting bug)
```

Expected: zero hits for the first two. Any hit for the third needs inspection.

Additionally:
```
pattern: "משרד ייעוץ מס"    (was used in the old hero descriptor)
```
Expected: zero hits in brand-line contexts. Hits in body copy (e.g., subtitle) are OK — those are descriptive, not NAP.

- [ ] **Step 2: Verify canonical form hits**

```
pattern: "מיה זינו — ייעוץ מס והנהלת חשבונות"
```

Expected: at least 4 hits (layout SITE_NAME, footer brand line, hero brand line, and at least one alt attribute).

- [ ] **Step 3: No commit** — verification only.

---

## Rollout

- [ ] **Merge the branch to main.**
- [ ] **Deploy to production.**
- [ ] **In Google Search Console:** submit the updated sitemap (already at `/sitemap.xml`; no new submission needed unless URL changed). Wait for re-crawl (usually 1–7 days).
- [ ] **Submit the feed URL** in Search Console as a regular URL in case it helps discovery of new posts.
- [ ] **Request indexing** on the homepage via GSC "URL Inspection" → "Request Indexing".

---

## Out of Scope (do NOT do in this plan)

- New pages or routes.
- New content, FAQs, or expanded bios.
- Image format conversions or compression.
- Font subsetting or weight trimming.
- Framer Motion changes, IntersectionObserver threshold tweaks, motion deferral.
- Any visible CSS change (spacing, colors, typography, layout).
- Google Business Profile, directory submissions, reviews, backlinks — tracked in user's separate PDF.

---

## Rollback

Every phase is atomic and committed separately. To roll back:

1. Identify the offending task's commit (`git log --oneline`).
2. `git revert <sha>` for that commit.
3. If multiple commits participate in the regression, revert them in reverse order.

Each task is independently rollback-safe because:
- JSON-LD additions are additive (removing them just drops enhanced data).
- The H1 swap is a single-file change that can be reverted cleanly.
- NAP canonicalization commits touch one file each.
