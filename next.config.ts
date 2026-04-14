import type { NextConfig } from "next";

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
