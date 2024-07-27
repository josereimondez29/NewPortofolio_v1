// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Opcional, pero útil para identificar problemas en React
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // Proxy a tu backend Django
      },
    ];
  },
  webpack(config, { isServer }) {
    // Ajustes específicos para Webpack en el entorno del cliente
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

module.exports = nextConfig;


  
