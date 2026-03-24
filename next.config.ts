import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Allow next/image to optimise images served from Sanity's asset CDN.
     * Using the URL constructor syntax supported in Next.js 16.
     */
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
};

export default nextConfig;
