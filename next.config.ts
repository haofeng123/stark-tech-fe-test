/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/stark-tech-fe-test',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '/stark-tech-fe-test/',
};

module.exports = nextConfig;
