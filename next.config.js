<<<<<<< HEAD
// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cuddly-space-carnival-5wrwjwv7j793pg6-8000.app.github.dev',
        },
      ],
    },
  };
  
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['josereimondez.com'], // Añade los dominios de donde cargarás imágenes
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
      destination: 'http://127.0.0.1:8000/api/:path*',
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








  
>>>>>>> origin/main
