import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 70, 75],
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
