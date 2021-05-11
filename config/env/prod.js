const { Env } = require('bernie-config');

module.exports.config = {
  app: {
    api: {
      url: {
        default: process.env.API_URL || 'https://lodging-pwa-bff-api.us-west-2.prod.expedia.com'
      }
    },
    advertising: {
      loaders: {
        ads: 'https://c.travel-assets.com/meso-loaders/ads-loader.js',
        adsES5: 'https://c.travel-assets.com/meso-loaders/ads-loader.es5.js'
      }
    },
    shortlist: {
      client: {
        token: 'Nzg0ZWFjMmYtMTkyNi00OWQ0LWJiMjktYjUzZDc3MjIwZDZi'
      }
    },
    bexApi: {
      url: 'https://bex-api-loom.us-west-2.prod.expedia.com'
    },
    customer: {
      timeOut: 100
    },
    blacksmith: {
      url: 'https://blacksmith-anvil.prod.expedia.com'
    }
  },
  environment: {
    name: 'Production',
    env: Env.PROD,
    isAws: true
  },
  platform: {
    context: {
      url: process.env.CONTEXT_URL || 'https://common-pwa-bff-api.us-west-2.prod.expedia.com/api/context'
    },
    abacus: {
      url: 'https://abacus-experiment-api-server.prod.expedia.com'
    }
  }
};
