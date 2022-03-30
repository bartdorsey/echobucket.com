/** @type {import('next').NextConfig} */
const nextConfig = {
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
