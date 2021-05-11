module.exports.config = {
  app: {
    api: {
      url: {
        default: 'https://lodging-pwa-bff-api.ap-southeast-1.prod.expedia.com'
      }
    },
    flex: {
      url: 'https://his-flex-web.ap-southeast-1.prod.expedia.com'
    }
  },
  platform: {
    context: {
      bexApiUrl: 'https://bex-api-loom.us-west-2.prod.expedia.com/graphql',
      url: process.env.CONTEXT_URL || 'https://common-pwa-bff-api.us-west-2.prod.expedia.com/api/context'
    }
  }
};
