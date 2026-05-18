import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
