import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // necessary to load images from monorepo packages
  images: {
    unoptimized: true,
  },
  // Ensure Turbopack/Next transpiles local workspace packages
  // so imports like '@etthos/assets' resolve correctly.
  transpilePackages: ["@etthos/assets", "@etthos/ui"],
};

export default nextConfig;
