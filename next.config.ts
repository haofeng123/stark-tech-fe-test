import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/stark-tech-fe-test',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
