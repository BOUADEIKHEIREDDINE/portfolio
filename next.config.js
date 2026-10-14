/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  basePath,
  images: { unoptimized: true },
};

module.exports = nextConfig;
