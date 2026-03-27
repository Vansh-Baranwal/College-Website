import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/proxied-tour/:path*',
        destination: 'https://international.iitd.ac.in/campus-tour/:path*',
      },
      {
        source: '/proxied-tour',
        destination: 'https://international.iitd.ac.in/campus-tour/',
      },
      {
        source: '/campus-tour/:path*',
        destination: 'https://international.iitd.ac.in/campus-tour/:path*',
      },
      {
        source: '/campus-tour',
        destination: 'https://international.iitd.ac.in/campus-tour/',
      }
    ];
  },
};

export default nextConfig;
