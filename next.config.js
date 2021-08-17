const { StatsWriterPlugin } = require('webpack-stats-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack: (config, {}) => {
    config.plugins.push(
      new StatsWriterPlugin({
        filename: 'webpack-stats.json',
        stats: {
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true,
        },
      })
    )

    return config
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'secure.gravatar.com',
      'scripthungry.cloudaccess.host',
      'media.graphcms.com',
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    quality: 25,
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
  resolve: {
    alias: {
      'react-dom$': 'react-dom/profiling',
    },
  },
})
