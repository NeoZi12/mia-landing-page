import type { NextConfig } from "next";

// React dev mode relies on eval() for debugging features (call-stack reconstruction).
// Production React never uses eval — keep the prod CSP strict.
const IS_DEV = process.env.NODE_ENV !== "production";
const SCRIPT_SRC_EXTRAS = IS_DEV ? " 'unsafe-eval'" : "";

const CSP_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${SCRIPT_SRC_EXTRAS} https://va.vercel-scripts.com https://api.emailjs.com https://challenges.cloudflare.com`,
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
      // Supabase Storage (blog images)
      { protocol: "https", hostname: "*.supabase.co" },
      // Pollinations.ai fallback (if direct URL used)
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
