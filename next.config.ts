import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // imagens: versões de 900 px geradas no repositório, escolhidas pelo srcset do next/image
  images: { loader: "custom", loaderFile: "./lib/imgLoader.ts", deviceSizes: [640, 900, 1280, 1920], imageSizes: [96, 256, 480] },
  // CSS embutido no HTML: sem requisição bloqueando a primeira pintura
  experimental: { inlineCss: true },
};

export default nextConfig;
