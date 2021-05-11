module.exports.config = {
  app: {
    api: {
      url: {
        default: 'https://lodging-pwa-bff-api.us-east-1.prod.expedia.com'
      }
    },
    bexApi: {
      url: 'https://bex-api-loom.us-east-1.prod.expedia.com'
    },
    flex: {
      url: 'https://his-flex-web.us-east-1.prod.expedia.com'
    }
  },
  platform: {
    context: {
      bexApiUrl: 'https://bex-api-loom.us-east-1.prod.expedia.com/graphql',
      url: process.env.CONTEXT_URL || 'https://common-pwa-bff-api.us-east-1.prod.expedia.com/api/context'
    }
  }
};
