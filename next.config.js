module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "secure.gravatar.com",
      "scripthungry.cloudaccess.host"
    ]
  },
  future: {
    webpack5: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
};
