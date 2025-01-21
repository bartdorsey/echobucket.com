/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/minecraft/tiles/:path*',
                destination: 'http://mc.echobucket.com/minecraft/tiles/:path*',
            },
        ]
    },
}

module.exports = nextConfig
