import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Map global assets requested by the viewer to the custom proxy
      {
        source: '/campus-tour/:path*',
        destination: '/api/proxy/campus-tour/:path*',
      },
      {
        source: '/wp-content/:path*',
        destination: '/api/proxy/wp-content/:path*',
      },
      {
        source: '/wp-includes/:path*',
        destination: '/api/proxy/wp-includes/:path*',
      }
    ];
  },
};

export default nextConfig;
