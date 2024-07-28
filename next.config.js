// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? 'https://josereimondez.com/api/:path*'
          : 'http://localhost:8000/api/:path*',
      },
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

module.exports = nextConfig;





  
