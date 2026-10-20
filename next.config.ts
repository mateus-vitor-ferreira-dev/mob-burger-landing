import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A landing sai como site estático (out/), servido pelo Cloudflare Workers.
  output: "export",
  images: {
    // Sem servidor não há otimização de imagem sob demanda: as imagens saem como estão.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'document-export.canva.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
