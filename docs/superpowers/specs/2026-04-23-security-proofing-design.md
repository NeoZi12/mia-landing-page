# Website Security & Privacy Proofing — Design Spec

**Date:** 2026-04-23
**Status:** Approved design, pending implementation plan
**Site:** mia-tax.co.il (Mia Zino — יועצת מס, Kiryat Motzkin)
**Next step:** Invoke `superpowers:writing-plans` to produce `docs/superpowers/plans/2026-04-23-security-proofing.md`

---

## 1. Goal

Bring the site into full legal + security compliance with Israeli law (Privacy Protection Law Amendment 13, Equal Rights for Persons with Disabilities accessibility regs) while hardening the technical surface (HTTP headers, admin lockdown, bot-protected contact form, consented analytics). The site is operated by a tax consultant handling financial PII, which elevates the baseline duty of care.

## 2. Scope — what ships, what's deferred

**In scope (9 items):**
1. HTTP security headers (HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options)
2. `/admin` + `/api` discoverability lockdown (robots.txt, noindex meta, sitemap exclusions)
3. Global rate-limiter on `/api/*` via `middleware.ts`
4. Server-side `/api/contact` endpoint (refactors form off direct EmailJS call)
5. Cloudflare Turnstile + honeypot on contact form, consent checkbox
6. Custom Hebrew consent banner (first-party cookie), gates `@vercel/analytics`
7. Three legal pages: `/privacy`, `/terms`, `/accessibility` (Hebrew, RTL, skeleton + lawyer review)
8. Footer legal-links row
9. Manual a11y audit + fixes (WCAG 2.0 AA target), skip-link, reduced-motion support

**Deferred / out of scope:**
- Third-party accessibility widget (נגיש בקליק / UserWay) — code-only approach chosen instead
- CSP nonces (using strict `script-src` allowlist instead; nonces deferred as cleanup)
- Automated test suite (vitest/playwright) — manual verification only
- Supabase client-PII disclosure audit — current Supabase usage is blog-only, no client PII
- Switch from EmailJS to Resend — EmailJS retained by user choice

## 3. Decisions (from brainstorming)

| # | Question | Decision |
|---|---|---|
| Q1 | Legal copy source | **B** — skeleton Hebrew inline in TSX + lawyer review before P2 launch |
| Q2 | Accessibility approach | **C** — code-only (no widget) + Accessibility Statement page |
| Q3 | Consent banner | **A** — custom minimal Hebrew banner, first-party cookie |
| Q4 | Bot protection | **A + D** — Cloudflare Turnstile + honeypot via `/api/contact` |
| Q5 | Implementation venue | **C** — hybrid: legal copy + manual-task docs here, Next.js code in separate terminal |
| Q6 | Delivery phasing | **B** — P0 → P1 → P2 → P3, each independently deployable |
| — | Architecture | **Approach A** — keep EmailJS (routed server-side), flat legal routes, no Resend swap |

## 4. Architecture

Phased rollout layered from infrastructure inward:
- **P0** — HTTP headers (browser-enforced) + admin lockdown + global API rate-limit
- **P1** — Consented analytics gate + bot-filtered contact API
- **P2** — Legal disclosure pages + footer links (gated on lawyer redlines)
- **P3** — Accessibility audit + fixes

Each phase is independently deployable and does not block later phases. P2 is the only phase with an external (lawyer) dependency.

## 5. Tech stack additions

| Addition | Purpose |
|---|---|
| `next.config.ts` `async headers()` | Security headers |
| `src/middleware.ts` | Per-IP rate-limit on `/api/*` |
| `src/app/api/contact/route.ts` | Server-side Turnstile verify + honeypot + rate-limit + EmailJS REST proxy |
| Cloudflare Turnstile | Bot protection (free tier) |
| `src/components/ConsentBanner.tsx` + `ConsentProvider.tsx` | Consent UI + hook |
| `src/app/privacy/page.tsx` + `terms/page.tsx` + `accessibility/page.tsx` | Three flat legal routes |
| `public/robots.txt` | Block `/admin` and `/api` |
| `src/lib/rateLimit.ts`, `src/lib/turnstile.ts` | Helper modules |

## 6. File map

**Modified:**
- `next.config.ts` — add `headers()`
- `public/robots.txt` — create, Disallow `/admin` and `/api`
- `src/components/SiteFooter.tsx` — add legal-links row, re-consent link
- `src/components/sections/ContactSection.tsx` — remove EmailJS client, POST to `/api/contact`, add Turnstile + honeypot + consent checkbox
- `src/app/layout.tsx` — wrap children in `<ConsentProvider>`, gate `<Analytics />` on consent, mount `<ConsentBanner />`
- `src/components/MotionProvider.tsx` — respect `prefers-reduced-motion`
- `src/app/sitemap.ts` (or `public/sitemap.xml`) — exclude `/admin` and `/api`, add `/privacy`, `/terms`, `/accessibility`
- `src/lib/siteConstants.ts` — add `PRIVACY_CONTACT_EMAIL`, `LEGAL_LAST_UPDATED`, `DATABASE_REG_NUMBER`

**Created:**
- `src/middleware.ts`
- `src/app/api/contact/route.ts`
- `src/app/admin/layout.tsx` — noindex metadata wrapper
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/accessibility/page.tsx`
- `src/components/ConsentBanner.tsx`
- `src/components/ConsentProvider.tsx`
- `src/lib/rateLimit.ts`
- `src/lib/turnstile.ts`
- `docs/manual-tasks/database-registration.md`
- `docs/manual-tasks/lawyer-review-checklist.md`
- `docs/manual-tasks/contact-privacy-email-setup.md`
- `docs/manual-tasks/a11y-audit-2026-04-XX.md` (dated at audit time)

## 7. Phase P0 — HTTP hardening (no external dependencies)

### 7.1 Security headers in `next.config.ts`

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | see full policy below |

**CSP policy:**
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://api.emailjs.com https://challenges.cloudflare.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://*.supabase.co https://image.pollinations.ai;
font-src 'self' data:;
connect-src 'self' https://api.emailjs.com https://va.vercel-scripts.com https://*.supabase.co https://challenges.cloudflare.com;
frame-src https://challenges.cloudflare.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
```

`'unsafe-inline'` required by JSON-LD `dangerouslySetInnerHTML` in `layout.tsx:257-260`. Turnstile domains pre-whitelisted so P1 doesn't re-touch CSP.

### 7.2 Admin + API lockdown

- `public/robots.txt` — created, with `Disallow: /admin` and `Disallow: /api`.
- `src/app/admin/layout.tsx` — new layout with `export const metadata = { robots: { index: false, follow: false } }`.
- Sitemap source — exclude `/admin` and `/api`.

### 7.3 Global middleware rate-limiter

- `src/middleware.ts` matches `/api/:path*`.
- Reads client IP from `x-forwarded-for` then `x-real-ip` then `"unknown"`.
- Calls `ratelimit(ip)` helper (sliding window, 10 req/min per IP), returns 429 on deny.
- In-memory `Map`-based implementation in `src/lib/rateLimit.ts` (acceptable for abuse defense; upgrade to `@vercel/kv` if hit limits).

### 7.4 P0 verification

1. `curl -sI https://mia-tax.co.il` → all 6 headers present.
2. Google Search Console URL Inspection on `/admin/new-post` → "noindex detected".
3. `/robots.txt` → `Disallow: /admin`.
4. 11 rapid POSTs to `/api/admin/auth` → 11th returns 429.

## 8. Phase P1 — Consent banner + bot-protected contact

### 8.1 Consent banner

- `src/components/ConsentProvider.tsx` — React context + `useConsent()` hook, reads first-party cookie `mia_consent=granted|denied`, 1-year expiry.
- `src/components/ConsentBanner.tsx` — bottom-of-viewport Hebrew RTL banner, "אשר" / "דחה" buttons + "פרטים נוספים" link to `/privacy`. Shown while cookie unset.
- `src/app/layout.tsx` — wraps children in `<ConsentProvider>`, mounts `<ConsentBanner />`, renders `<Analytics />` only when `consent === "granted"`.
- `src/components/SiteFooter.tsx` — adds "שנה הגדרות פרטיות" link that clears the cookie (re-opens banner on next page load).

### 8.2 `/api/contact/route.ts`

Validation chain (short-circuit on first failure):
1. Honeypot field (`company` or similar) must be empty → reject silently with 200.
2. Turnstile token server-verify against `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRET_KEY`.
3. Field validation: name non-empty, email regex, phone regex, message ≤ 200 chars.
4. Per-IP rate-limit 5/min (stacks on top of global 10/min).
5. Consent field must be `true`.
6. Server-side POST to EmailJS REST API with server env vars.

### 8.3 `ContactSection.tsx` refactor

- Remove dynamic import of `@emailjs/browser`.
- Add `<Turnstile />` widget (official React wrapper or `@marsidev/react-turnstile`).
- Add hidden honeypot input.
- Add consent checkbox: "קראתי את [מדיניות הפרטיות](/privacy) ואני מאשר/ת שליחת פרטיי".
- Submit POSTs JSON to `/api/contact`.

### 8.4 Environment variables

**Remove from client** (drop `NEXT_PUBLIC_` prefix):
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PRIVATE_KEY` (create in EmailJS dashboard if missing)

**Add:**
- `TURNSTILE_SECRET_KEY` (server)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client, public by design)

### 8.5 P1 verification

- No cookie → no `va.vercel-scripts.com` network requests.
- Accept consent → analytics beacon fires.
- Form with invalid Turnstile → 400. Valid + empty honeypot → 200 + email arrives. Filled honeypot → 200 silent no-op.
- 6 submits in 60s → 6th returns 429.

## 9. Phase P2 — Legal pages + footer (gated on lawyer)

### 9.1 Three flat routes

`/privacy`, `/terms`, `/accessibility` — each `src/app/<slug>/page.tsx`, Hebrew RTL, shares root layout (navbar + footer), each has own `metadata` with page-specific title + description.

### 9.2 Privacy Policy — required sections

1. Identity of controller (NAP block from `siteConstants.ts`)
2. Data collected (contact form fields; analytics events; cookies)
3. Purposes + legal basis (legitimate interest / consent)
4. Data processors: EmailJS (US), Vercel (US + global CDN), Supabase (EU/global)
5. Retention periods
6. User rights (access, rectify, delete, portability) + `PRIVACY_CONTACT_EMAIL`
7. Cookie list + consent + how to revoke
8. Cross-border transfer disclosure
9. Professional secrecy (חובת סודיות) — tax consultant duty
10. Breach notification reference (Amendment 13 procedure)
11. Database registration reference (`DATABASE_REG_NUMBER` if registered)
12. Last updated (`LEGAL_LAST_UPDATED`)

Every substantive paragraph wrapped in `{/* LAWYER-REVIEW: <question> */}`.

### 9.3 Terms of Use — short

Scope of site, blog content ≠ personalized advice, disclaimer of advisor-client relationship from website use, limitation of liability, Israeli governing law + Haifa jurisdiction.

### 9.4 Accessibility Statement

Compliance target (WCAG 2.0 AA), audit date, known gaps, contact for a11y complaints (email), mention of code-only approach (no widget).

### 9.5 Footer legal-links row

New row in `SiteFooter.tsx`, above copyright line:
`מדיניות פרטיות · תנאי שימוש · הצהרת נגישות · שנה הגדרות פרטיות`

### 9.6 Sitemap

Add `/privacy`, `/terms`, `/accessibility` with current `lastModified`.

### 9.7 P2 verification

- All three routes return 200, correct metadata, Hebrew `lang`, RTL.
- Footer links resolve.
- Lighthouse SEO ≥ 95 on each.

## 10. Phase P3 — Accessibility audit + fixes

### 10.1 Manual audit scope

- Keyboard nav full tab-path on homepage, contact section, one legal page.
- Skip-link added at top of `layout.tsx`: `<a href="#main" className="sr-only focus:not-sr-only">דלג לתוכן</a>`.
- Landmarks confirmed: `<header>`, `<nav>`, `<main id="main">`, `<footer>`.
- Alt text audit for every `<Image>`.
- Heading hierarchy audit.
- Contrast check (axe DevTools) — `#496177` on white currently; verify AA compliance.
- `MotionProvider` — respect `prefers-reduced-motion: reduce` media query. Honors the "never degrade animations" rule: default users keep full animations, only users who explicitly request reduced motion get them disabled.
- Screen reader pass: NVDA or VoiceOver on homepage + contact + one legal page.

### 10.2 P3 deliverables

- `docs/manual-tasks/a11y-audit-<date>.md` — findings log.
- Fixes committed.
- `/accessibility` page's "known gaps" section updated with anything that remains unfixed.

### 10.3 P3 verification

- axe DevTools: zero serious/critical violations on three sample pages.
- Tab-path documented.
- Screen-reader pass logged.

## 11. Off-site manual tasks (for Mia)

Saved as markdown under `docs/manual-tasks/`, drafted in this session as part of P0/P2 work.

### 11.1 `database-registration.md`

Amendment 13 threshold analysis, registration steps at gov.il/privacy, expected deliverable = registration number → paste into `siteConstants.DATABASE_REG_NUMBER`.

### 11.2 `lawyer-review-checklist.md`

Paragraph-by-paragraph list of `{/* LAWYER-REVIEW */}` blocks across privacy/terms/accessibility pages, with specific legal questions per block. Expected turnaround 1-2 weeks, delivery as redlined Word doc.

### 11.3 `contact-privacy-email-setup.md`

Set up `privacy@mia-tax.co.il` (or label main email as privacy contact). Email gets published in Privacy Policy as the user-rights request channel.

## 12. Verification summary

| Phase | Verification |
|---|---|
| P0 | `curl -I` header check, Search Console noindex check, rate-limit curl loop |
| P1 | Browser DevTools consent-cookie flow, Turnstile/honeypot e2e, rate-limit test |
| P2 | Route 200s, Lighthouse SEO ≥ 95, footer links |
| P3 | axe DevTools zero serious/critical, screen-reader pass logged |

No automated test suite added.

## 13. Open items / risks

- **`'unsafe-inline'` in CSP `script-src`** — required by JSON-LD block. Nonces deferred as cleanup. Acceptable risk at this stage.
- **In-memory rate-limit resets on cold starts** — serverless reality. If abuse emerges, swap `rateLimit.ts` internals for `@vercel/kv` (~10 lines).
- **Lawyer timeline is the one external blocker** — P2 ships only after redlines return. P0, P1, P3 unblocked.
- **Database registration threshold** — depends on Mia's actual data practices; manual-task doc explains. If she doesn't need to register, the Privacy Policy still works without a reg number.
- **EmailJS quota** — 200/mo free. Fine for current volume; track monthly.

## 14. Execution handoff

- **Legal copy (skeleton Hebrew) + manual-task docs** → drafted in this (current) session.
- **Next.js code changes** → executed in separate terminal, following the plan file.

---

**Next action:** Invoke `superpowers:writing-plans` to produce the step-by-step implementation plan at `docs/superpowers/plans/2026-04-23-security-proofing.md`.
