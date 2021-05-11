const { Env } = require('bernie-config');

module.exports.config = {
  environment: {
    name: 'Test',
    env: Env.TEST,
    isAws: true
  },
  cluster: false,
  app: {
    api: {
      url: {
        default: process.env.API_URL || 'https://lodging-pwa-bff-api.us-west-2.test.expedia.com'
      }
    },
    flex: {
      url: 'https://his-flex-web.us-west-2.test.expedia.com'
    },
    bexApi: {
      url: 'https://bex-api-loom.us-west-2.test.expedia.com'
    },
    blacksmith: {
      url: 'https://blacksmith-anvil.test.expedia.com'
    }
  },
  platform: {
    context: {
      bexApiUrl: 'https://bex-api-loom.us-west-2.test.expedia.com/graphql',
      url: process.env.CONTEXT_URL || 'https://common-pwa-bff-api.us-west-2.test.expedia.com/api/context'
    },
    streaming: {
      enabled: false
    }
  }
};
