module.exports = {
  images: {
    domains: [
      'res.cloudinary.com',
      'secure.gravatar.com',
      'scripthungry.cloudaccess.host',
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    quality: 25,
  },
  future: {
    webpack5: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true
  },
  async headers() {
    return [
      {
        source: '/(.*).(jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
    ]
  },
}
