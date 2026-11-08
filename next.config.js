/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about/our-mission',
        permanent: false,
      },
      {
        source: '/about-us',
        destination: '/about/our-mission',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/coverage',
        destination: '/operations',
      },
      {
        source: '/our-clients',
        destination: '/about/our-clients',
      },
      {
        source: '/our-mission',
        destination: '/about/our-mission',
      },
      {
        source: '/our_clients',
        destination: '/about/our-clients',
      },
      {
        source: '/our_mission',
        destination: '/about/our-mission',
      },
      {
        source: '/about/our_clients',
        destination: '/about/our-clients',
      },
      {
        source: '/about/our_mission',
        destination: '/about/our-mission',
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig