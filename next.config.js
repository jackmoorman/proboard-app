/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  output: 'standalone',
  // env: {
  //   WS_URL: process.env.WS_URL,
  // },
};

module.exports = nextConfig;
