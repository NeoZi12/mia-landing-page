# Security & Privacy Proofing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring mia-tax.co.il into Israeli legal + security compliance across 4 independently-deployable phases (P0 → P3), plus drafting off-site manual tasks for the site owner (Mia).

**Architecture:** Phased defense-in-depth — HTTP headers first (P0), then consented analytics + bot-filtered contact API (P1), then legal pages gated on lawyer review (P2), then a11y audit + fixes (P3). Each phase independently deployable. EmailJS retained but routed server-side. Cloudflare Turnstile + honeypot + custom Hebrew consent banner. No automated test suite — verification is manual browser/curl checks per phase.

**Tech Stack:** Next.js 15 App Router · TypeScript · Tailwind · Heebo font · RTL Hebrew · Vercel hosting · Vercel Analytics · Supabase (blog content only) · EmailJS (server-side REST) · Cloudflare Turnstile · Framer Motion

**Spec reference:** `docs/superpowers/specs/2026-04-23-security-proofing-design.md`

**Execution venue:** Per Q5=C hybrid — the code tasks (P0, P1, P2 code portions, P3) are executed in a separate terminal. The drafting tasks (legal skeletons in `docs/legal-skeletons/`, manual-task checklists in `docs/manual-tasks/`) are executed in the planning session.

---

## Phase P0 — HTTP hardening (no external dependencies)

### Task P0.1: Add security headers to next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Read current next.config.ts to preserve existing config**

Run: `cat next.config.ts`
Expected: existing config with `images`, `rewrites` — do not remove.

- [ ] **Step 2: Add `async headers()` function**

Replace the entire file contents with:

```ts
import type { NextConfig } from "next";

const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://api.emailjs.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://image.pollinations.ai",
  "font-src 'self' data:",
  "connect-src 'self' https://api.emailjs.com https://va.vercel-scripts.com https://*.supabase.co https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-Frame-Options",           value: "DENY" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy",   value: CSP_POLICY },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 70, 75],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "image.pollinations.ai" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
    ];
  },
  async rewrites() {
    return [
      { source: "/about-us", destination: "/" },
      { source: "/services",  destination: "/" },
      { source: "/why-us",    destination: "/" },
      { source: "/contact",   destination: "/" },
      { source: "/blog",      destination: "/" },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify build still compiles**

Run: `npm run build`
Expected: build succeeds. If CSP breaks the JSON-LD block or any inline style, you'll see a browser console error at runtime — but build itself will pass.

- [ ] **Step 4: Dev-verify in local browser**

Run: `npm run dev`, open `http://localhost:3000`, check DevTools Network tab → response headers on the document request.
Expected: all 6 headers present. CSP should not throw violations in the console (JSON-LD is covered by `'unsafe-inline'`).

- [ ] **Step 5: Commit**

```bash
git add next.config.ts
git commit -m "feat(security): add HTTP security headers (HSTS, CSP, X-Frame-Options, etc.)"
```

---

### Task P0.2: Create public/robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Check if robots.txt already exists**

Run: `ls public/robots.txt 2>/dev/null && cat public/robots.txt`
Expected: file does not exist (empty output). If it exists, merge — don't overwrite.

- [ ] **Step 2: Create the file**

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://mia-tax.co.il/sitemap.xml
```

- [ ] **Step 3: Verify in dev**

Run: `npm run dev`, visit `http://localhost:3000/robots.txt`
Expected: the exact content above is served.

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt
git commit -m "feat(security): add robots.txt blocking /admin and /api"
```

---

### Task P0.3: Add noindex layout for /admin

**Files:**
- Create: `src/app/admin/layout.tsx`

- [ ] **Step 1: Check if admin layout exists**

Run: `ls src/app/admin/layout.tsx 2>/dev/null`
Expected: file does not exist.

- [ ] **Step 2: Create the layout**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Verify noindex meta in dev**

Run: `npm run dev`, visit `http://localhost:3000/admin/new-post`, view source.
Expected: `<meta name="robots" content="noindex,nofollow,nocache"/>` in `<head>`.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/layout.tsx
git commit -m "feat(security): noindex /admin routes"
```

---

### Task P0.4: Exclude /admin and /api from sitemap

**Files:**
- Modify or create: `src/app/sitemap.ts` (or `public/sitemap.xml` depending on current setup)

- [ ] **Step 1: Find the sitemap source**

Run: `ls src/app/sitemap.ts public/sitemap.xml 2>/dev/null`
Expected: one of the two exists.

- [ ] **Step 2a (if `src/app/sitemap.ts` exists): Read it and filter**

Open `src/app/sitemap.ts`. Confirm no `/admin` or `/api/*` paths are included. If any path matching `/admin` or `/api` is returned by the sitemap function, remove it. If the sitemap is dynamically generated from blog posts or service routes, confirm those sources do not include admin/api paths.

- [ ] **Step 2b (if `public/sitemap.xml` exists instead): Read it and clean**

Open `public/sitemap.xml`. Remove any `<url>` entries whose `<loc>` contains `/admin` or `/api`.

- [ ] **Step 3: Verify in dev**

Run: `npm run dev`, visit `http://localhost:3000/sitemap.xml`.
Expected: no URLs containing `/admin` or `/api`.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts  # or public/sitemap.xml
git commit -m "feat(security): exclude /admin and /api from sitemap"
```

---

### Task P0.5: Create src/lib/rateLimit.ts

**Files:**
- Create: `src/lib/rateLimit.ts`

- [ ] **Step 1: Create the helper**

```ts
// Simple in-memory sliding-window rate limiter.
// Resets on serverless cold start — acceptable for basic abuse defense.
// Upgrade path: swap the Map for @vercel/kv if abuse surfaces.

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
}

export async function ratelimit(
  key: string,
  { windowMs = 60_000, max = 10 }: { windowMs?: number; max?: number } = {},
): Promise<RateLimitResult> {
  const now = Date.now();
  const prior = hits.get(key) ?? [];
  const recent = prior.filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    return { ok: false, remaining: 0 };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true, remaining: max - recent.length };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/rateLimit.ts
git commit -m "feat(security): add in-memory sliding-window rate limiter"
```

---

### Task P0.6: Create src/middleware.ts

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware**

```ts
import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/rateLimit";

export const config = {
  matcher: "/api/:path*",
};

export async function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { ok } = await ratelimit(`api:${ip}`, { windowMs: 60_000, max: 10 });

  if (!ok) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  return NextResponse.next();
}
```

- [ ] **Step 2: Verify in dev**

Run: `npm run dev`, then in another terminal:
```bash
for i in $(seq 1 15); do curl -s -o /dev/null -w "%{http_code} " -X POST http://localhost:3000/api/admin/auth; done; echo
```
Expected: first 10 responses are `401`, next 5 are `429`.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat(security): add /api/* rate limiter in middleware (10 req/min/IP)"
```

---

### Task P0.7: P0 full manual verification

- [ ] **Step 1: Deploy P0 to production (Vercel)**

Run: `git push origin master` (or whichever branch is production).
Expected: Vercel auto-deploys. Wait for deploy to complete.

- [ ] **Step 2: Verify headers on production**

Run: `curl -sI https://mia-tax.co.il | grep -iE 'strict-transport|content-security|x-frame|referrer|permissions|x-content-type'`
Expected: all 6 headers present in the output.

- [ ] **Step 3: Verify robots.txt**

Run: `curl -s https://mia-tax.co.il/robots.txt`
Expected: matches the content from Task P0.2.

- [ ] **Step 4: Verify /admin noindex on production**

Open `https://mia-tax.co.il/admin/new-post` in a browser, view source.
Expected: `<meta name="robots" content="noindex,nofollow,nocache"/>` in `<head>`.

- [ ] **Step 5: Verify rate limit on production**

Run:
```bash
for i in $(seq 1 15); do curl -s -o /dev/null -w "%{http_code} " -X POST https://mia-tax.co.il/api/admin/auth; done; echo
```
Expected: mix of 401 and 429 responses.

- [ ] **Step 6: Submit /admin to Search Console URL Inspection**

In Google Search Console → URL Inspection → enter `https://mia-tax.co.il/admin/new-post`.
Expected: "Indexing not allowed: 'noindex' detected".

- [ ] **Step 7: Tag P0 complete in git**

```bash
git tag security-p0-shipped
git push origin security-p0-shipped
```

**P0 complete.**

---

## Phase P1 — Consent banner + bot-protected contact API

### Task P1.1: Create ConsentProvider with useConsent hook

**Files:**
- Create: `src/components/ConsentProvider.tsx`

- [ ] **Step 1: Create the provider**

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ConsentState = "unknown" | "granted" | "denied";

interface ConsentContextValue {
  consent: ConsentState;
  grant: () => void;
  deny: () => void;
  reset: () => void;
}

const COOKIE_NAME = "mia_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readCookie(): ConsentState {
  if (typeof document === "undefined") return "unknown";
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  const v = match?.[2];
  return v === "granted" || v === "denied" ? v : "unknown";
}

function writeCookie(v: "granted" | "denied") {
  document.cookie = `${COOKIE_NAME}=${v}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function clearCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("unknown");

  useEffect(() => {
    setConsent(readCookie());
  }, []);

  const grant = useCallback(() => {
    writeCookie("granted");
    setConsent("granted");
  }, []);

  const deny = useCallback(() => {
    writeCookie("denied");
    setConsent("denied");
  }, []);

  const reset = useCallback(() => {
    clearCookie();
    setConsent("unknown");
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, grant, deny, reset }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ConsentProvider.tsx
git commit -m "feat(privacy): add ConsentProvider with useConsent hook"
```

---

### Task P1.2: Create ConsentBanner component

**Files:**
- Create: `src/components/ConsentBanner.tsx`

- [ ] **Step 1: Create the banner**

```tsx
"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

export function ConsentBanner() {
  const { consent, grant, deny } = useConsent();
  if (consent !== "unknown") return null;

  return (
    <div
      dir="rtl"
      role="dialog"
      aria-live="polite"
      aria-label="הודעת הסכמה לעוגיות"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0D2049]/95 backdrop-blur-md px-6 py-4"
      style={{ fontFamily: "var(--font-heebo), sans-serif" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <p className="text-white/90 text-sm leading-relaxed max-w-[780px]">
          אנחנו משתמשים בעוגיות לניתוח שימוש באתר ולשיפור השירות. ניתן לקבל או לדחות.{" "}
          <Link href="/privacy" className="underline text-white">
            מדיניות הפרטיות
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={deny}
            className="px-5 py-2 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            דחה
          </button>
          <button
            type="button"
            onClick={grant}
            className="px-5 py-2 rounded-lg bg-white text-[#002069] text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            אשר
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ConsentBanner.tsx
git commit -m "feat(privacy): add Hebrew consent banner UI"
```

---

### Task P1.3: Mount ConsentProvider and gate Analytics in layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create a client wrapper that gates Analytics**

Create: `src/components/AnalyticsGate.tsx`

```tsx
"use client";

import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "./ConsentProvider";

export function AnalyticsGate() {
  const { consent } = useConsent();
  if (consent !== "granted") return null;
  return <Analytics />;
}
```

- [ ] **Step 2: Modify `src/app/layout.tsx` — replace imports and body**

Find the line `import { Analytics } from "@vercel/analytics/next";` and replace with:

```tsx
import { ConsentProvider } from "@/components/ConsentProvider";
import { ConsentBanner } from "@/components/ConsentBanner";
import { AnalyticsGate } from "@/components/AnalyticsGate";
```

Find the `<body>` JSX and replace:

```tsx
<body className="flex min-h-full flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  <MotionProvider>{children}</MotionProvider>
  <Analytics />
</body>
```

With:

```tsx
<body className="flex min-h-full flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  <ConsentProvider>
    <MotionProvider>{children}</MotionProvider>
    <ConsentBanner />
    <AnalyticsGate />
  </ConsentProvider>
</body>
```

- [ ] **Step 3: Verify in dev**

Run: `npm run dev`, open DevTools → Network → filter `vercel-scripts.com`. Clear cookies first (Application → Cookies → delete `mia_consent`).
Expected: Banner visible. No `va.vercel-scripts.com` requests. Click "אשר". Banner disappears. On next page load, `va.vercel-scripts.com` beacon appears.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/AnalyticsGate.tsx
git commit -m "feat(privacy): gate Vercel Analytics behind consent"
```

---

### Task P1.4: Add "change consent" link in footer

**Files:**
- Modify: `src/components/SiteFooter.tsx`

- [ ] **Step 1: Convert footer to use ConsentProvider**

Currently `SiteFooter.tsx` is `"use client"`. Add after the existing imports:

```tsx
import { useConsent } from "./ConsentProvider";
```

Inside the `SiteFooter` function, near the top of the function body (before `return`):

```tsx
const { reset } = useConsent();
```

- [ ] **Step 2: Add the "change consent" link**

Find the copyright paragraph (currently: `© {new Date().getFullYear()} מיה. כל הזכויות שמורות.`). Just above it, add a button styled like the other footer links:

```tsx
<button
  type="button"
  onClick={reset}
  className="text-[11px] text-white/40 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer"
  style={{ fontFamily: "var(--font-heebo), sans-serif" }}
>
  שנה הגדרות פרטיות
</button>
```

(A full footer refactor for the legal links row comes in Task P2.5 — this task adds only the re-consent affordance.)

- [ ] **Step 3: Verify**

Run: `npm run dev`, scroll to footer, click "שנה הגדרות פרטיות".
Expected: consent cookie cleared, banner reappears.

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteFooter.tsx
git commit -m "feat(privacy): add re-consent link to footer"
```

---

### Task P1.5: Set up Cloudflare Turnstile account + add env vars

**Files:**
- Modify: `.env.local` (local dev)
- Configure: Vercel project environment variables (production)

- [ ] **Step 1: Create Turnstile widget**

1. Go to https://dash.cloudflare.com → Turnstile → Add site.
2. Site name: `mia-tax`
3. Domain: `mia-tax.co.il` (and for local dev add `localhost`).
4. Widget mode: `Managed` (recommended).
5. Copy the **Site Key** (public) and **Secret Key** (server).

- [ ] **Step 2: Add env vars locally**

Edit `.env.local` (create if missing). Add:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key-from-cloudflare>
TURNSTILE_SECRET_KEY=<secret-key-from-cloudflare>
```

- [ ] **Step 3: Add env vars on Vercel**

In Vercel dashboard → Project Settings → Environment Variables. Add both for Production, Preview, and Development.

- [ ] **Step 4: Verify**

Run: `npm run dev`. Confirm no build/runtime errors about missing env vars.

- [ ] **Step 5: Commit (no file changes — this is infra setup)**

No commit needed. Just confirm both Turnstile keys are set in `.env.local` and on Vercel.

---

### Task P1.6: Create src/lib/turnstile.ts

**Files:**
- Create: `src/lib/turnstile.ts`

- [ ] **Step 1: Create the verifier helper**

```ts
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface VerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY not set");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token, remoteip: ip });

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = (await res.json()) as VerifyResponse;
    return Boolean(data.success);
  } catch (err) {
    console.error("Turnstile verify error", err);
    return false;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/turnstile.ts
git commit -m "feat(security): add Turnstile server-side verifier helper"
```

---

### Task P1.7: Create /api/contact/route.ts

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create the route**

```ts
import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";
import { ratelimit } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\-+\s()]{7,15}$/;
const MESSAGE_MAX = 200;

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  honeypot?: string;
  turnstileToken?: string;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 1. Honeypot — silent 200 to avoid tipping off bots.
  if (body.honeypot && body.honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Turnstile verify.
  if (!body.turnstileToken) {
    return NextResponse.json({ error: "Missing captcha" }, { status: 400 });
  }
  const turnstileOk = await verifyTurnstile(body.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
  }

  // 3. Per-IP rate limit (on top of global middleware limit).
  const { ok: rlOk } = await ratelimit(`contact:${ip}`, { windowMs: 60_000, max: 5 });
  if (!rlOk) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  // 4. Field validation.
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !message) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
  if (message.length > MESSAGE_MAX) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  // 5. Consent check.
  if (body.consent !== true) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  // 6. Server-side EmailJS REST call.
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const userId = process.env.EMAILJS_USER_ID; // EmailJS public key serves as user_id server-side
  const accessToken = process.env.EMAILJS_PRIVATE_KEY; // optional private key for stricter auth

  if (!serviceId || !templateId || !userId) {
    console.error("EmailJS env vars missing");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const emailBody: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    template_params: {
      from_name: name,
      reply_to: email,
      phone,
      message,
    },
  };
  if (accessToken) emailBody.accessToken = accessToken;

  try {
    const res = await fetch(EMAILJS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailBody),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("EmailJS error", res.status, text);
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("EmailJS fetch error", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 502 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat(contact): add server-side /api/contact with Turnstile + honeypot + rate-limit"
```

---

### Task P1.8: Move EmailJS env vars from NEXT_PUBLIC_ to server-only

**Files:**
- Modify: `.env.local`
- Configure: Vercel environment variables

- [ ] **Step 1: Update local env**

In `.env.local`, rename:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` → `EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` → `EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` → `EMAILJS_USER_ID`

Add (optional but recommended) `EMAILJS_PRIVATE_KEY` — in EmailJS dashboard → Account → Security → create Private Key. This allows server-side calls to be authenticated more strictly.

- [ ] **Step 2: Update Vercel env vars**

In Vercel dashboard → Project Settings → Environment Variables:
- Delete the three `NEXT_PUBLIC_EMAILJS_*` vars.
- Add the new server-only names as above.
- Redeploy is triggered automatically.

- [ ] **Step 3: No commit — env changes only.**

---

### Task P1.9: Refactor ContactSection.tsx — remove EmailJS client, add Turnstile, honeypot, consent checkbox

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`
- Add dependency: `@marsidev/react-turnstile`

- [ ] **Step 1: Install Turnstile React wrapper**

Run: `npm install @marsidev/react-turnstile`
Expected: added to `package.json`.

- [ ] **Step 2: Read current ContactSection.tsx**

Run: `head -20 src/components/sections/ContactSection.tsx`
Expected: current file starts with `"use client"; import { useState } ...`

- [ ] **Step 3: Replace the EmailJS envvar block and the submit handler**

Find this block at top of file:

```tsx
/* ─── EmailJS env vars ───────────────────────────────────────── */
const SVC_ID  = (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "").trim();
const TPL_ID  = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "").trim();
const PUB_KEY = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "").trim();
```

Replace with:

```tsx
/* ─── Turnstile site key (public by design) ─────────────────── */
const TURNSTILE_SITE_KEY = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
```

Add a new import near the top:

```tsx
import { Turnstile } from "@marsidev/react-turnstile";
```

- [ ] **Step 4: Extend form state with consent + honeypot + turnstile token**

Find: `const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });`

Replace with:

```tsx
const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "", consent: false });
const [turnstileToken, setTurnstileToken] = useState<string>("");
```

(`company` is the honeypot field — bots auto-fill it, humans never see it.)

- [ ] **Step 5: Update `isFormValid`**

Find the `isFormValid` const and replace with:

```tsx
const isFormValid =
  form.name.trim().length > 0 &&
  EMAIL_RE.test(form.email.trim()) &&
  PHONE_RE.test(form.phone.trim()) &&
  form.message.trim().length > 0 &&
  form.message.length <= MESSAGE_MAX &&
  form.consent === true &&
  turnstileToken.length > 0;
```

- [ ] **Step 6: Replace `handleSubmit` entirely**

Find the `handleSubmit` function and replace with:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setTouched({ name: true, email: true, phone: true, message: true });
  if (!isFormValid) return;
  if (Date.now() - lastSubmitAt < RATE_LIMIT_MS) { setStatus("rate_limited"); return; }

  setIsLoading(true);
  setStatus("idle");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        honeypot: form.company,
        consent: form.consent,
        turnstileToken,
      }),
    });

    if (res.status === 429) {
      setStatus("rate_limited");
      return;
    }
    if (!res.ok) {
      setStatus("error");
      return;
    }

    lastSubmitAt = Date.now();
    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "", company: "", consent: false });
    setTouched({});
    setTurnstileToken("");
  } catch {
    setStatus("error");
  } finally {
    setIsLoading(false);
  }
};
```

- [ ] **Step 7: Add honeypot field + consent checkbox + Turnstile to the form JSX**

Inside the `<form>` body, just before the bottom-row `<div className="flex flex-col items-start gap-2">`, add:

```tsx
{/* Honeypot — hidden from users, visible to bots */}
<input
  type="text"
  name="company"
  value={form.company}
  onChange={(e) => setForm({ ...form, company: e.target.value })}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
/>

{/* Turnstile widget */}
<div className="flex justify-end">
  <Turnstile
    siteKey={TURNSTILE_SITE_KEY}
    onSuccess={(token) => setTurnstileToken(token)}
    onExpire={() => setTurnstileToken("")}
    onError={() => setTurnstileToken("")}
    options={{ language: "he", theme: "light" }}
  />
</div>

{/* Consent checkbox */}
<label
  dir="rtl"
  className="flex items-start gap-2 text-sm cursor-pointer"
  style={{ fontFamily: "var(--font-heebo), sans-serif", color: "#496177" }}
>
  <input
    type="checkbox"
    checked={form.consent}
    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
    className="mt-1"
  />
  <span>
    קראתי את{" "}
    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">
      מדיניות הפרטיות
    </a>
    {" "}ואני מאשר/ת שליחת פרטיי.
  </span>
</label>
```

- [ ] **Step 8: Remove `@emailjs/browser` dependency**

Run: `npm uninstall @emailjs/browser`
Expected: `package.json` no longer lists `@emailjs/browser`.

- [ ] **Step 9: Verify in dev**

Run: `npm run dev`. Open contact form.
Expected:
- Turnstile widget renders.
- "Send" button disabled until name/email/phone/message/consent/turnstile all satisfied.
- Submit with invalid email → shown as invalid.
- Submit valid → check Network tab, request goes to `/api/contact`, response 200.
- Check inbox: email arrives.

- [ ] **Step 10: Commit**

```bash
git add src/components/sections/ContactSection.tsx package.json package-lock.json
git commit -m "feat(contact): route form through /api/contact with Turnstile + honeypot + consent"
```

---

### Task P1.10: P1 full manual verification

- [ ] **Step 1: Deploy P1 to production**

Run: `git push origin master`
Expected: Vercel deploys.

- [ ] **Step 2: Fresh browser — verify consent flow**

Open production site in incognito. Check DevTools → Network, filter `vercel-scripts.com`.
Expected: banner visible, no analytics requests. Click "אשר". Banner disappears. On page navigation, analytics beacon fires.

- [ ] **Step 3: Test form honeypot**

In the page, via DevTools console, set the honeypot field value: `document.querySelector('input[name=company]').value = 'bot'; document.querySelector('input[name=company]').dispatchEvent(new Event('change', {bubbles:true}))`. Submit the form.
Expected: Response 200 but **no email arrives** in Mia's inbox.

- [ ] **Step 4: Test Turnstile failure**

In DevTools, delete the `cf-turnstile-response` cookie/localStorage if any, reload form, don't solve Turnstile, force-submit (dev tools or disable button).
Expected: response 400 "Missing captcha".

- [ ] **Step 5: Test rate limit on /api/contact**

Run:
```bash
for i in $(seq 1 8); do curl -s -o /dev/null -w "%{http_code} " -X POST https://mia-tax.co.il/api/contact -H "Content-Type: application/json" -d '{}'; done; echo
```
Expected: mix of 400s (invalid payload) and 429s after the 5th.

- [ ] **Step 6: Test valid submission**

Fill form with real data, solve Turnstile, check consent, submit.
Expected: 200, success message, email arrives in Mia's inbox.

- [ ] **Step 7: Tag P1**

```bash
git tag security-p1-shipped
git push origin security-p1-shipped
```

**P1 complete.**

---

## Phase P2 — Legal pages + footer links (gated on lawyer)

**Pre-requisite:** Legal copy skeletons drafted in this session live at `docs/legal-skeletons/privacy.md`, `docs/legal-skeletons/terms.md`, `docs/legal-skeletons/accessibility.md`. P2.2-P2.4 paste content from those files into TSX page components.

---

### Task P2.1: Add legal constants to siteConstants.ts

**Files:**
- Modify: `src/lib/siteConstants.ts`

- [ ] **Step 1: Read current constants to avoid collisions**

Run: `cat src/lib/siteConstants.ts | head -60`

- [ ] **Step 2: Add constants**

Append at the end of the file:

```ts
// ─── Legal / Privacy ─────────────────────────────────────────
export const PRIVACY_CONTACT_EMAIL = "privacy@mia-tax.co.il"; // TODO Mia: create alias or update to her preferred address
export const LEGAL_LAST_UPDATED = "2026-04-23"; // update this when legal pages change
export const DATABASE_REG_NUMBER = ""; // fill in after Mia registers with הרשות להגנת הפרטיות, if applicable
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/siteConstants.ts
git commit -m "feat(legal): add PRIVACY_CONTACT_EMAIL, LEGAL_LAST_UPDATED, DATABASE_REG_NUMBER constants"
```

---

### Task P2.2: Create /privacy page

**Files:**
- Create: `src/app/privacy/page.tsx`
- Reference: `docs/legal-skeletons/privacy.md` (Hebrew skeleton copy drafted separately)

- [ ] **Step 1: Create the page shell**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { LEGAL_LAST_UPDATED, PRIVACY_CONTACT_EMAIL } from "@/lib/siteConstants";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של מיה זינו — ייעוץ מס והנהלת חשבונות. איך אנחנו אוספים, שומרים ומגנים על הפרטים שלך.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1 w-full max-w-[900px] mx-auto px-6 pt-[104px] pb-16" dir="rtl">
        <article
          className="prose prose-lg max-w-none"
          style={{ fontFamily: "var(--font-heebo), sans-serif", color: "#1E3A5F" }}
        >
          <h1 className="text-3xl font-bold mb-2">מדיניות פרטיות</h1>
          <p className="text-sm text-[#496177] mb-8">עודכן לאחרונה: {LEGAL_LAST_UPDATED}</p>

          {/* LAWYER-REVIEW: Content below is a skeleton. Full Hebrew copy pasted from docs/legal-skeletons/privacy.md. */}
          {/* PASTE PRIVACY SKELETON CONTENT HERE — see docs/legal-skeletons/privacy.md */}

          <h2 className="text-xl font-bold mt-8 mb-3">יצירת קשר בענייני פרטיות</h2>
          <p>
            לפניות בענייני פרטיות או למימוש זכויותיך לפי חוק הגנת הפרטיות, ניתן לפנות בכתובת:{" "}
            <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} className="underline">{PRIVACY_CONTACT_EMAIL}</a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Paste skeleton content**

Open `docs/legal-skeletons/privacy.md` and copy every section beneath the frontmatter into the page, replacing the `{/* PASTE PRIVACY SKELETON CONTENT HERE */}` comment. Wrap each section header in `<h2>`, subsections in `<h3>`, paragraphs in `<p>`. Preserve `{/* LAWYER-REVIEW */}` markers exactly as shown in the skeleton.

- [ ] **Step 3: Verify**

Run: `npm run dev`, visit `/privacy`.
Expected: page renders RTL, Hebrew, correct headings, shared navbar + footer.

- [ ] **Step 4: Commit**

```bash
git add src/app/privacy/page.tsx
git commit -m "feat(legal): add /privacy page with Hebrew skeleton (pending lawyer review)"
```

---

### Task P2.3: Create /terms page

**Files:**
- Create: `src/app/terms/page.tsx`
- Reference: `docs/legal-skeletons/terms.md`

- [ ] **Step 1: Create the page shell**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { LEGAL_LAST_UPDATED } from "@/lib/siteConstants";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: "תנאי השימוש באתר מיה זינו — ייעוץ מס והנהלת חשבונות.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1 w-full max-w-[900px] mx-auto px-6 pt-[104px] pb-16" dir="rtl">
        <article
          className="prose prose-lg max-w-none"
          style={{ fontFamily: "var(--font-heebo), sans-serif", color: "#1E3A5F" }}
        >
          <h1 className="text-3xl font-bold mb-2">תנאי שימוש</h1>
          <p className="text-sm text-[#496177] mb-8">עודכן לאחרונה: {LEGAL_LAST_UPDATED}</p>

          {/* LAWYER-REVIEW: Content below is a skeleton. Full Hebrew copy pasted from docs/legal-skeletons/terms.md. */}
          {/* PASTE TERMS SKELETON CONTENT HERE — see docs/legal-skeletons/terms.md */}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Paste skeleton content from `docs/legal-skeletons/terms.md`**

- [ ] **Step 3: Verify /terms renders correctly**

- [ ] **Step 4: Commit**

```bash
git add src/app/terms/page.tsx
git commit -m "feat(legal): add /terms page with Hebrew skeleton (pending lawyer review)"
```

---

### Task P2.4: Create /accessibility page

**Files:**
- Create: `src/app/accessibility/page.tsx`
- Reference: `docs/legal-skeletons/accessibility.md`

- [ ] **Step 1: Create the page shell**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { LEGAL_LAST_UPDATED, PRIVACY_CONTACT_EMAIL } from "@/lib/siteConstants";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של אתר מיה זינו — ייעוץ מס והנהלת חשבונות.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1 w-full max-w-[900px] mx-auto px-6 pt-[104px] pb-16" dir="rtl">
        <article
          className="prose prose-lg max-w-none"
          style={{ fontFamily: "var(--font-heebo), sans-serif", color: "#1E3A5F" }}
        >
          <h1 className="text-3xl font-bold mb-2">הצהרת נגישות</h1>
          <p className="text-sm text-[#496177] mb-8">עודכן לאחרונה: {LEGAL_LAST_UPDATED}</p>

          {/* LAWYER-REVIEW: Content below is a skeleton. Full Hebrew copy pasted from docs/legal-skeletons/accessibility.md. */}
          {/* PASTE ACCESSIBILITY SKELETON CONTENT HERE — see docs/legal-skeletons/accessibility.md */}

          <h2 className="text-xl font-bold mt-8 mb-3">פנייה בנושא נגישות</h2>
          <p>
            לפניות בנושא נגישות האתר ניתן ליצור קשר בכתובת:{" "}
            <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} className="underline">{PRIVACY_CONTACT_EMAIL}</a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Paste skeleton content from `docs/legal-skeletons/accessibility.md`**

- [ ] **Step 3: Verify /accessibility renders correctly**

- [ ] **Step 4: Commit**

```bash
git add src/app/accessibility/page.tsx
git commit -m "feat(legal): add /accessibility page with Hebrew skeleton (pending review)"
```

---

### Task P2.5: Add legal links row to SiteFooter

**Files:**
- Modify: `src/components/SiteFooter.tsx`

- [ ] **Step 1: Find the copyright block**

Locate the `<p>© {new Date().getFullYear()} מיה...</p>` line and the "שנה הגדרות פרטיות" button added in P1.4.

- [ ] **Step 2: Restructure the right-side legal block**

Replace the container holding the location paragraph + copyright paragraph (currently `<div className="flex flex-col items-center lg:items-end gap-0.5">...</div>`) with:

```tsx
<div className="flex flex-col items-center lg:items-end gap-1">
  <p
    style={{
      fontFamily: "var(--font-heebo), sans-serif",
      fontWeight: 500,
      fontSize: 12,
      color: "rgba(255,255,255,0.5)",
      whiteSpace: "nowrap",
    }}
  >
    משרד ייעוץ מס | {ADDRESS_FULL} | שירות לכלל הארץ
  </p>
  <div
    className="flex flex-row items-center gap-3"
    style={{
      fontFamily: "var(--font-heebo), sans-serif",
      fontSize: 11,
      color: "rgba(255,255,255,0.45)",
    }}
  >
    <Link href="/privacy" className="hover:text-white/80 transition-colors">מדיניות פרטיות</Link>
    <span>·</span>
    <Link href="/terms" className="hover:text-white/80 transition-colors">תנאי שימוש</Link>
    <span>·</span>
    <Link href="/accessibility" className="hover:text-white/80 transition-colors">הצהרת נגישות</Link>
    <span>·</span>
    <button
      type="button"
      onClick={reset}
      className="hover:text-white/80 transition-colors bg-transparent border-none cursor-pointer p-0"
      style={{ fontFamily: "inherit", fontSize: "inherit", color: "inherit" }}
    >
      שנה הגדרות פרטיות
    </button>
  </div>
  <p
    style={{
      fontFamily: "var(--font-heebo), sans-serif",
      fontWeight: 400,
      fontSize: 12,
      color: "rgba(255,255,255,0.35)",
      whiteSpace: "nowrap",
    }}
  >
    © {new Date().getFullYear()} מיה. כל הזכויות שמורות.
  </p>
</div>
```

(This replaces the standalone "שנה הגדרות פרטיות" button added in P1.4 — it now lives inside the legal-links row.)

- [ ] **Step 3: Verify**

Run: `npm run dev`, scroll to footer.
Expected: four items with `·` separators — מדיניות פרטיות, תנאי שימוש, הצהרת נגישות, שנה הגדרות פרטיות. All links resolve.

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteFooter.tsx
git commit -m "feat(legal): add legal-links row to footer"
```

---

### Task P2.6: Update sitemap to include legal pages

**Files:**
- Modify: `src/app/sitemap.ts` or `public/sitemap.xml`

- [ ] **Step 1: Locate sitemap source (from P0.4)**

- [ ] **Step 2a (if `src/app/sitemap.ts`): add the three routes**

Inside the default-export function's returned array, add:

```ts
{
  url: "https://mia-tax.co.il/privacy",
  lastModified: new Date(),
  changeFrequency: "yearly",
  priority: 0.3,
},
{
  url: "https://mia-tax.co.il/terms",
  lastModified: new Date(),
  changeFrequency: "yearly",
  priority: 0.3,
},
{
  url: "https://mia-tax.co.il/accessibility",
  lastModified: new Date(),
  changeFrequency: "yearly",
  priority: 0.3,
},
```

- [ ] **Step 2b (if `public/sitemap.xml`): add three `<url>` blocks**

```xml
<url>
  <loc>https://mia-tax.co.il/privacy</loc>
  <lastmod>2026-04-23</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.3</priority>
</url>
<url>
  <loc>https://mia-tax.co.il/terms</loc>
  <lastmod>2026-04-23</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.3</priority>
</url>
<url>
  <loc>https://mia-tax.co.il/accessibility</loc>
  <lastmod>2026-04-23</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.3</priority>
</url>
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, visit `/sitemap.xml`.
Expected: three new entries present.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts  # or public/sitemap.xml
git commit -m "feat(seo): add legal pages to sitemap"
```

---

### Task P2.7: [External] Send legal pages to lawyer for review

**Files:** none (process task)

- [ ] **Step 1: Generate PDF exports**

Run: `npm run dev`, open `/privacy`, `/terms`, `/accessibility` each, Ctrl+P → Save as PDF.

- [ ] **Step 2: Package handoff**

Compile into one email to the lawyer, referencing the checklist at `docs/manual-tasks/lawyer-review-checklist.md`. Ask for redlined Word doc or inline PDF comments. Expected turnaround 1-2 weeks.

- [ ] **Step 3: Do not deploy /privacy, /terms, /accessibility publicly yet**

The pages exist in the codebase but **must not be linked from the public footer until lawyer-approved**. So temporarily: in Task P2.5's footer update, wrap the three new `<Link>` components in a `{process.env.NEXT_PUBLIC_LEGAL_LIVE === "true" && ...}` guard, OR revert P2.5 commit until lawyer redlines are integrated, then re-apply.

**Recommended**: keep the footer change unmerged in a feature branch (`legal-pages-live`) until Task P2.8 completes. This makes P2.8 a simple merge.

---

### Task P2.8: Integrate lawyer redlines

**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/accessibility/page.tsx`
- Modify: `src/lib/siteConstants.ts` — bump `LEGAL_LAST_UPDATED` to today's date, set `DATABASE_REG_NUMBER` if returned.

- [ ] **Step 1: Review lawyer's redlines**

- [ ] **Step 2: Paste redlined Hebrew into each page**

Replace the content between `{/* LAWYER-REVIEW */}` markers with final copy. Remove the `LAWYER-REVIEW` comments.

- [ ] **Step 3: Bump `LEGAL_LAST_UPDATED` in siteConstants.ts**

- [ ] **Step 4: Merge the `legal-pages-live` branch (re-enabling footer links)**

- [ ] **Step 5: Verify production**

After deploy: visit `/privacy`, `/terms`, `/accessibility`. Confirm lawyer's copy is live.

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(legal): integrate lawyer redlines into legal pages"
```

---

### Task P2.9: P2 manual verification

- [ ] **Step 1: Visit each page on production**

- [ ] **Step 2: Check metadata**

View source on each legal page. Confirm `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots" content="index, follow">`.

- [ ] **Step 3: Run Lighthouse SEO audit on each**

In Chrome DevTools → Lighthouse → SEO category → run on each legal URL.
Expected: SEO score ≥ 95 on all three.

- [ ] **Step 4: Verify footer links resolve**

Click each footer link from any page.
Expected: correct page loads, scroll position top.

- [ ] **Step 5: Submit to Google Search Console**

In GSC → Sitemaps → resubmit sitemap. Request indexing for each new URL.

- [ ] **Step 6: Tag P2**

```bash
git tag security-p2-shipped
git push origin security-p2-shipped
```

**P2 complete.**

---

## Phase P3 — Accessibility audit + fixes

### Task P3.1: Add skip-link to root layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css` (skip-link styles)

- [ ] **Step 1: Add skip-link in layout body**

In `src/app/layout.tsx`, inside the `<body>` tag, as the very first child (before `<script>`):

```tsx
<a href="#main" className="skip-link">דלג לתוכן הראשי</a>
```

- [ ] **Step 2: Add CSS for skip-link**

Append to `src/app/globals.css`:

```css
.skip-link {
  position: absolute;
  right: 16px;
  top: -200px;
  background: #002069;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: var(--font-heebo), sans-serif;
  font-weight: 600;
  font-size: 14px;
  z-index: 100;
  transition: top 0.15s ease;
}
.skip-link:focus {
  top: 16px;
  outline: 2px solid #fff;
  outline-offset: 2px;
}
```

- [ ] **Step 3: Ensure main regions have `id="main"`**

Check that every `<main>` tag in the app has `id="main"`. If `src/app/page.tsx` uses a custom container instead of `<main>`, wrap it. Same check for `/privacy`, `/terms`, `/accessibility`, `/all-articles`, `/blog/[slug]`, `/services/[slug]`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, load homepage, press Tab.
Expected: "דלג לתוכן הראשי" link appears at top-right. Pressing Enter scrolls to `#main`.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(a11y): add skip-link to root layout"
```

---

### Task P3.2: Respect prefers-reduced-motion in MotionProvider

**Files:**
- Modify: `src/components/MotionProvider.tsx`

- [ ] **Step 1: Read current MotionProvider**

Run: `cat src/components/MotionProvider.tsx`

- [ ] **Step 2: Add MotionConfig with reducedMotion="user"**

If not already present, wrap children with Framer Motion's `<MotionConfig reducedMotion="user">`:

```tsx
"use client";
import { MotionConfig } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

(`reducedMotion="user"` means: respect the user's OS-level `prefers-reduced-motion` setting. Users who have not set that preference get the full animation experience — this preserves the "never degrade animations" project rule.)

- [ ] **Step 3: Verify**

Run: `npm run dev`. Open system preferences → enable "Reduce motion" (macOS: Accessibility > Display; Windows: Settings > Accessibility > Visual effects). Reload site.
Expected: animations replaced by instant transitions. Disable reduce-motion, reload. Animations return.

- [ ] **Step 4: Commit**

```bash
git add src/components/MotionProvider.tsx
git commit -m "feat(a11y): honor prefers-reduced-motion in MotionProvider"
```

---

### Task P3.3: Full a11y audit pass

**Files:** none (audit only — findings go in `docs/manual-tasks/a11y-audit-<date>.md`)

- [ ] **Step 1: Install axe DevTools browser extension**

Install axe DevTools extension (Chrome/Firefox) if not already installed.

- [ ] **Step 2: Run axe scan on three pages**

- `https://mia-tax.co.il/`
- `https://mia-tax.co.il/#contact` (ContactSection)
- `https://mia-tax.co.il/privacy`

For each, open axe DevTools → "Scan full page". Record all **serious** and **critical** violations in `docs/manual-tasks/a11y-audit-<today>.md`.

- [ ] **Step 3: Keyboard-only pass**

Disconnect mouse. Using only Tab, Shift+Tab, Enter, Space:
- Navigate from top of homepage through every interactive element.
- Submit a contact form.
- Open the mobile nav menu (if any).

Record any element that is unreachable, invisible on focus, or requires a mouse-only action.

- [ ] **Step 4: Screen reader pass**

Using NVDA (Windows) or VoiceOver (macOS), walk through homepage + contact form + `/privacy`. Note any missing labels, unannounced errors, or confusing landmark structure.

- [ ] **Step 5: Color contrast check**

In axe results, filter to "color-contrast" violations. Note each with the pair (FG, BG, ratio).

- [ ] **Step 6: Commit the audit report**

```bash
git add docs/manual-tasks/a11y-audit-<date>.md
git commit -m "docs(a11y): P3 audit findings"
```

---

### Task P3.4: Fix audit findings

**Files:** depends on findings from P3.3.

For each finding in the audit doc:

- [ ] **Step 1: Read the finding, identify the target element(s)**

- [ ] **Step 2: Apply the smallest change that resolves the violation**

Common fixes:
- Missing alt → add `alt="<Hebrew description>"` or `alt=""` if decorative.
- Missing aria-label → add `aria-label="<label>"` to the control.
- Missing form label → add `<label htmlFor="id">` or `aria-label`.
- Contrast violation → bump color to meet 4.5:1 ratio for normal text, 3:1 for large text. Update the inline `style` or Tailwind class.
- Heading hierarchy → rename `<h4>` → `<h3>` etc. to restore order.
- Keyboard trap → add `tabIndex={-1}` only to elements that must be skipped; ensure focus-visible styles on the rest.

- [ ] **Step 3: Re-run axe after each fix**

Expected: violation removed, no new violations introduced.

- [ ] **Step 4: Commit each fix separately (per finding, where clean)**

```bash
git add <files>
git commit -m "fix(a11y): <specific violation description>"
```

---

### Task P3.5: Update /accessibility page with known gaps

**Files:**
- Modify: `src/app/accessibility/page.tsx`

- [ ] **Step 1: In the "known gaps" section of the accessibility page, list any audit findings that were not fixed**

Example sentence (Hebrew): "רכיב X אינו עומד כרגע בדרישת Y — עבודה על תיקון מתוכננת עד [תאריך]."

- [ ] **Step 2: Update `LEGAL_LAST_UPDATED` constant to today**

- [ ] **Step 3: Commit**

```bash
git add src/app/accessibility/page.tsx src/lib/siteConstants.ts
git commit -m "docs(a11y): update accessibility statement with known gaps"
```

---

### Task P3.6: P3 ship + verification

- [ ] **Step 1: Deploy**

```bash
git push origin master
```

- [ ] **Step 2: Re-run axe on production**

Expected: zero serious/critical on the three sample pages.

- [ ] **Step 3: Tag P3**

```bash
git tag security-p3-shipped
git push origin security-p3-shipped
```

**P3 complete. All 4 phases shipped.**

---

## Manual / off-site tasks (drafted in planning session)

These three markdown files are drafted during the planning session (same session as this plan) so Mia has concrete checklists to execute outside the codebase.

### Task M1: Draft database-registration.md

**File:** `docs/manual-tasks/database-registration.md`

- [ ] **Step 1: Write the checklist**

Content (drafted in planning session):
- Israeli Privacy Protection Law Amendment 13 overview (why registration may be required).
- Decision tree: what counts as a "database" (email inbox, CRM, Supabase if holds client data).
- Registration form URL: https://www.gov.il/he/departments/legalInfo/required_database_registration
- Fee information (currently free as of 2025).
- Step-by-step: forms to complete, evidence required, expected response time.
- Output: registration number → paste into `src/lib/siteConstants.ts` as `DATABASE_REG_NUMBER`.
- Skip-path: if Mia's data holdings are below threshold, document that decision in the file — still need the analysis for defensive purposes.

- [ ] **Step 2: Commit**

```bash
git add docs/manual-tasks/database-registration.md
git commit -m "docs(manual-tasks): database registration checklist for Mia"
```

---

### Task M2: Draft lawyer-review-checklist.md

**File:** `docs/manual-tasks/lawyer-review-checklist.md`

- [ ] **Step 1: Write the checklist**

Content:
- List every `{/* LAWYER-REVIEW */}` marker across `privacy.md`, `terms.md`, `accessibility.md` skeletons.
- Per marker: the specific legal question the lawyer should address.
- Specific questions (examples):
  - Is the "legitimate interest" basis for analytics sufficient under Amendment 13?
  - Is the Hebrew wording for cross-border transfer disclosure compliant?
  - Does the liability clause in Terms satisfy Israeli Consumer Protection Law?
  - Is the WCAG 2.0 AA declaration accurate given the audit results?
  - Do we need to disclose professional secrecy (חובת סודיות) obligations in addition to standard privacy terms?
- Expected deliverable: redlined Word doc or inline PDF comments.
- Expected turnaround: 1-2 weeks.
- Budget expectation: discuss with lawyer.

- [ ] **Step 2: Commit**

```bash
git add docs/manual-tasks/lawyer-review-checklist.md
git commit -m "docs(manual-tasks): lawyer review checklist for legal pages"
```

---

### Task M3: Draft contact-privacy-email-setup.md

**File:** `docs/manual-tasks/contact-privacy-email-setup.md`

- [ ] **Step 1: Write the checklist**

Content:
- Goal: dedicated email for privacy/user-rights requests, published in Privacy Policy.
- Option A: create `privacy@mia-tax.co.il` alias forwarding to Mia's primary inbox (preferred).
- Option B: use existing `maya@ethikaltd.co.il` and label it in Privacy Policy as privacy contact.
- Instructions to request alias from her domain host.
- Deliverable: chosen address → paste into `src/lib/siteConstants.ts` as `PRIVACY_CONTACT_EMAIL`.

- [ ] **Step 2: Commit**

```bash
git add docs/manual-tasks/contact-privacy-email-setup.md
git commit -m "docs(manual-tasks): privacy-contact email setup"
```

---

### Task M4: Draft legal skeleton markdowns

**Files:**
- `docs/legal-skeletons/privacy.md`
- `docs/legal-skeletons/terms.md`
- `docs/legal-skeletons/accessibility.md`

- [ ] **Step 1: Write the three skeletons**

Hebrew RTL markdown files with all 12 Privacy Policy sections (from spec §9.2), the 5 Terms sections (§9.3), and the Accessibility Statement content (§9.4). Every substantive paragraph marked with `<!-- LAWYER-REVIEW: <specific question> -->` so the exact question lands in the lawyer checklist.

These markdown files are the source of truth for P2.2-P2.4 — those TSX tasks paste content from here.

- [ ] **Step 2: Commit**

```bash
git add docs/legal-skeletons/
git commit -m "docs(legal): Hebrew skeleton copy for privacy, terms, accessibility"
```

---

## Plan done-criteria

- All 4 phase tags present: `security-p0-shipped`, `security-p1-shipped`, `security-p2-shipped`, `security-p3-shipped`.
- `curl -sI https://mia-tax.co.il` shows all 6 security headers.
- Consent banner appears for new users, is absent after accept/reject.
- Contact form rejects honeypot bots silently and Turnstile failures with 400.
- `/privacy`, `/terms`, `/accessibility` live, footer-linked, lawyer-reviewed.
- axe DevTools reports zero serious/critical on homepage + contact + a legal page.
- `docs/manual-tasks/*.md` present with actionable checklists for Mia.
