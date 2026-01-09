import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Image optimization enabled for Vercel deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Ensure Turbopack/Next transpiles local workspace packages
  // so imports like '@etthos/assets' resolve correctly.
  transpilePackages: ["@etthos/assets", "@repo/ui"],
};

export default nextConfig;

