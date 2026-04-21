# In-Code SEO Improvements — Design Spec

**Date:** 2026-04-21
**Scope:** Code-side SEO only. Manual/off-site tasks (GBP, directory submissions, reviews, backlinks) are tracked separately in the user's PDF and are out of scope here.
**Goal:** Top-5 Google rankings for Hebrew tax queries in the Krayot/Haifa area, achieved via code/metadata levers only.

---

## Hard Constraints

1. **No design changes.** Zero visible pixel changes. The site looks identical to users before and after.
2. **No new content.** No new sections, no new copy, no expanded bios, no FAQs, no location pages.
3. **No image modifications.** No format conversions, no compression, no subsetting. Existing files are frozen.
4. **No font modifications.** Heebo stays on its current weight set (300/400/600/700/800).
5. **No animation degradation.** Any optimization that would change how an animation looks or feels is skipped.
6. **Google-compliant.** No cloaking, no hidden text, no doorway pages, no keyword stuffing.
7. **Single-page architecture preserved.** No new real routes beyond what already exists (`/`, `/services/[slug]`, `/blog/[slug]`, `/all-articles`, `/admin/*`, `/api/*`).

---

## Approach

Approach 3 from the brainstorming session ("data + invisible semantic DOM + animation-safe perf"), minus the image/font portions that were excluded by the design-lock constraint.

The work splits into four independent work areas:

### Area 1 — Schema / JSON-LD Enrichment

All changes are in the `<head>` data layer. Zero DOM impact.

**1.1 Root business entity upgrade** (`src/app/layout.tsx`)
- Change `@type: "AccountingService"` to `@type: ["LocalBusiness", "ProfessionalService", "AccountingService"]`.
- Add `geo: { "@type": "GeoCoordinates", latitude, longitude }` for the Kiryat Motzkin office (לאה גולדברג 1, קריית מוצקין). *Implementer step: look up coordinates from Google Maps for the exact address and hard-code them as numeric literals.*
- Add `hasMap: "<Google Maps share URL for the exact address>"`. *Implementer step: use the full `https://www.google.com/maps/place/...` URL for לאה גולדברג 1, קריית מוצקין.*
- Change `image` from single string to `image: [<array>]` — include `/og-image.jpg` plus the existing office photos already in `/public/images/` (`office-pic1.webp`, `office-pic2.webp`, `office-pic3.webp`). No new images added; only referencing existing assets.
- Expand `knowsAbout` array to include city tokens: קריית מוצקין, חיפה, הקריות, נשר, עכו, טירת הכרמל. Cap total `knowsAbout` entries at ≤20 to stay in the "entity association" range (not keyword dump).

**1.2 HowTo schema on service pages** (`src/app/services/[slug]/page.tsx`)
- Emit a `HowTo` JSON-LD block on every service page using the existing `steps` array from `servicesData.ts`.
- Each step in the array maps to a `HowToStep` entry.
- Google requires HowTo content to be visibly represented on the page — the steps already render as the "איך התהליך עובד?" numbered section, so compliance is met.

**1.3 Enriched Service entity** (`src/app/services/[slug]/page.tsx`)
- Expand the existing `Service` JSON-LD with `areaServed` as an array of `City` entries for the target Krayot/Haifa cities (not just `Country: Israel`).

**1.4 WebPage entities per canonical route**
- Add a `WebPage` JSON-LD block on each page type (`/`, `/services/[slug]`, `/blog/[slug]`, `/all-articles`), linked to the WebSite entity by `@id`.

**1.5 NAP canonicalization across the codebase**
- Single source of truth: the canonical NAP from `project_canonical_nap.md` in memory (em-dash, full form).
- Audit and fix every occurrence in: `src/app/layout.tsx` (`SITE_NAME`), `src/components/SiteFooter.tsx`, `src/components/Navbar.tsx`, `src/components/sections/HeroSection.tsx`, any OG/Twitter metadata, any JSON-LD `name` fields.
- Every byte must match the canonical form exactly.

---

### Area 2 — Invisible DOM Tweaks

Pixel-identical output. Only HTML semantics change.

**2.1 Hero H1 semantic swap** (`src/components/sections/HeroSection.tsx`)
- Current: `<h1>` wraps the three-line "ייעוץ מס חכם / בלי ניירת / בלי כאב ראש" — zero keywords.
- New: The already-visible brand line "מיה — משרד ייעוץ מס והנהלת חשבונות" (currently a `<span>` next to the logo) becomes the page's `<h1>`. The three-liner is demoted to a styled `<p>` or `<h2>`.
- All visual styling must be preserved — same font, size, weight, color, position. Only the HTML tag changes.
- Canonical form of the brand line must match the NAP decision from §1.5.

**2.2 Image alt text rewrites** (across all section components and blog rendering)
- Audit every `<Image alt="…">` for descriptive-first, keyword-natural Hebrew alt text.
- Examples: photos of Mia → include her role and location; office photos → include business descriptor and city.
- **No keyword stuffing.** Alt must primarily describe the image content; keywords are secondary.

**2.3 Meta description rewrites** (root and per-route)
- Rewrite for SERP click-through optimization while staying under 160 chars and honest.
- Every public route gets a unique, targeted description:
  - Root `/` — brand + Krayot/Haifa local anchor + primary service.
  - Each `/services/[slug]` — service-specific description with city anchor.
  - `/all-articles` — blog hub description with topic coverage.
  - Blog posts — keep using `post.meta_description` (already content-driven).

**2.4 Head resource hints** (`src/app/layout.tsx`)
- Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` for Heebo.
- Add `<link rel="preload" as="image" href="/images/papers-start.png">` so the hero LCP image (currently loaded via `next/image` with `priority`) starts fetching before React hydrates.
- No other optimization beyond hints.

---

### Area 3 — Sitemap + Feed

**3.1 Image sitemap extension** (`src/app/sitemap.ts`)
- Extend each sitemap entry with an `images` field for the primary image associated with that URL (hero image for home, service icon/OG for services, `post.image_url` for blog posts).
- Uses Next.js `MetadataRoute.Sitemap` image support.

**3.2 RSS/Atom feed for the blog**
- Add a new route `src/app/feed.xml/route.ts` that returns an Atom 1.0 XML feed of blog posts (reserved path — cannot collide with `/blog/[slug]`).
- Register the feed URL in the root layout metadata via the `alternates.types` field so Next.js emits `<link rel="alternate" type="application/atom+xml" href="/feed.xml">` automatically.
- Add `${SITE_URL}/feed.xml` to `sitemap.ts` static routes.

---

### Area 4 — Verification

Before marking any change as complete:

**4.1 Rich Results testing**
- Run Google's Rich Results Test on:
  - Homepage (Organization, LocalBusiness, Person, WebSite).
  - One service page (Service, HowTo, BreadcrumbList).
  - One blog post (BlogPosting, BreadcrumbList).
- All must pass with no errors or warnings.

**4.2 Lighthouse audit**
- Run Lighthouse (desktop + mobile) before and after.
- SEO score target: 100.
- Performance score must not regress.

**4.3 Visual / animation QA**
- Manual visual pass on: home (desktop + mobile), one `/services/[slug]`, one `/blog/[slug]`, `/all-articles`.
- Confirm zero visible diff between before and after.
- Confirm hero falling-papers animation, scroll-triggered reveals, and all Framer Motion transitions feel identical (timing, easing, smoothness).

**4.4 NAP consistency grep**
- Grep the codebase for every business-name variant. Confirm only the canonical form remains.

---

## Out of Scope

- All manual/off-site SEO (GBP, directory listings, backlinks, reviews) — user's PDF handles these.
- Any new routes or pages (no `/about-us`, no `/contact`, no location pages).
- Any content additions (no FAQ section, no expanded bios, no new copy).
- Image/font modifications of any kind.
- Animation or motion code.

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| H1 swap causes visual regression | Side-by-side pixel diff before merge; preserve every CSS rule. |
| `knowsAbout` city list reads as stuffing | Cap at the 6 relevant cities, keep list in line with actual service area. |
| Alt text rewrites cross into stuffing | Rule: alt primarily describes the image; keywords only where natural. |
| NAP changes break an existing external link or embed | `SITE_URL` constant is untouched; only display text changes. |
| Preload hint on wrong image hurts LCP | Verify via Lighthouse that the preloaded image is in fact the LCP. |
| RSS feed route name collides with a blog slug | Use a path the slug system cannot produce (e.g. reserved `/blog/feed.xml`), and add to sitemap.ts static list. |

---

## Execution Note

Implementation of this spec runs in a separate terminal, not in this session. This file is the handoff artifact.
