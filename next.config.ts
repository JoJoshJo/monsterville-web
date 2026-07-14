import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — AVIF first (smallest), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Cache optimized derivatives for a year.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
