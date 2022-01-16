module.exports = {
  experimental: {
      // Enables the styled-components SWC transform
      styledComponents: true
  },
  async redirects() {
      return [
        {
          source: '/api/user_auth_service/:path*',
          destination: 'http://localhost:8081/:path*',
          permanent: true,
        },
      ]
    },
  }