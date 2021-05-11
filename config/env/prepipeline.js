module.exports.config = {
  app: {
    shortlist: {
      proxy: {
        url: 'https://universal-curation-service.us-west-2.int.expedia.com'
      }
    },
    bexApi: {
      url: 'https://bex-api-loom.us-west-2.test.expedia.com'
    },
    customer: {
      timeOut: 3000
    },
    blacksmith: {
      url: 'https://blacksmith-anvil.test.expedia.com'
    }
  },
  environment: {
    name: 'Prepipeline',
    isAws: true
  },
  platform: {
    context: {
      bexApiUrl: 'https://bex-api-loom.us-west-2.test.expedia.com/graphql',
      url: process.env.CONTEXT_URL || 'https://common-pwa-bff-api.us-west-2.test.expedia.com/api/context'
    }
  }
};
