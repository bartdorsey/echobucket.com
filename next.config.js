/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/minecraft/tiles/:path*',
        destination: 'http://mc.echobucket.com/minecraft/tiles/:path*'
      }
    ]
  }
}

module.exports = nextConfig
