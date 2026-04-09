import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/RFE-QUEST",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
