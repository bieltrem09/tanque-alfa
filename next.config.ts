import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // CSS embutido no HTML: sem requisição bloqueando a primeira pintura
  experimental: { inlineCss: true },
};

export default nextConfig;
