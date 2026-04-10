import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Allow next/image to optimise images served from Sanity's asset CDN.
     * Using the URL constructor syntax supported in Next.js 16.
     */
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
    // Prefer AVIF (smallest) then WebP for all optimised images.
    formats: ['image/avif', 'image/webp'],
    // Cache optimised variants for 1 year.
    minimumCacheTTL: 31536000,
  },
  async rewrites() {
    return [
      { source: "/about-us", destination: "/" },
      { source: "/services",  destination: "/" },
      { source: "/why-us",    destination: "/" },
      { source: "/contact",   destination: "/" },
    ];
  },
};

export default nextConfig;
