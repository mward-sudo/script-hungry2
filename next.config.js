module.exports = {
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
