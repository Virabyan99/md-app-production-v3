import type { NextConfig } from 'next';
import typography from '@tailwindcss/typography';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  plugins: [typography],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;