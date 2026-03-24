/**
 * src/lib/queries.ts — GROQ query definitions and their TypeScript types.
 *
 * Keeping queries next to their types makes it easy to keep both in sync.
 * `defineQuery` from `groq` is a no-op at runtime but enables editor
 * tooling (syntax highlighting, type inference with @sanity/client).
 */
import { defineQuery } from 'groq'

// ── Home page ────────────────────────────────────────────────────────────────

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    heroBadge,
    heroLine1,
    heroLine2,
    heroLine3,
    heroSubtitle,
    heroCtaLabel,
    heroCtaUrl,
    heroScrollLabel,
    aboutHeading,
    aboutBody,
    aboutOrgsLabel,
    aboutOrgs,
    aboutScrollLabel
  }
`)

export type HomePageData = {
  heroBadge?: string | null
  heroLine1?: string | null
  heroLine2?: string | null
  heroLine3?: string | null
  heroSubtitle?: string | null
  heroCtaLabel?: string | null
  heroCtaUrl?: string | null
  heroScrollLabel?: string | null
  aboutHeading?: string | null
  aboutBody?: string | null
  aboutOrgsLabel?: string | null
  aboutOrgs?: string | null
  aboutScrollLabel?: string | null
}

// ── Services ─────────────────────────────────────────────────────────────────

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc){
    _id,
    title,
    description,
    icon
  }
`)

// ── FAQs ─────────────────────────────────────────────────────────────────────

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq"] | order(order asc){
    _id,
    question,
    answer
  }
`)

// ── Testimonials ──────────────────────────────────────────────────────────────

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc){
    _id,
    clientName,
    clientTitle,
    quote,
    rating
  }
`)
