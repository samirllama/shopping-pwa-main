const path = require('path');

module.exports.config = {
  app: {
    api: {
      url: {
        default: process.env.API_URL || 'https://lodging-pwa-bff-api.us-west-2.test.expedia.com'
      }
    },
    advertising: {
      loaders: {
        ads: 'https://ewe-assets-staging.s3.amazonaws.com/meso-loaders/ads-loader.js',
        adsES5: 'https://ewe-assets-staging.s3.amazonaws.com/meso-loaders/ads-loader.es5.js'
      }
    },
    shortlist: {
      client: {
        id: 'pwa',
        token: 'ZTA5YWU1ODctYmRjMS00YTgzLWFjYjktY2FhNjYxZDBiMDBk'
      }
    },
    bexApi: {
      url: 'https://bex-api-loom.us-west-2.prod.expedia.com'
    },
    flex: {
      url: 'https://his-flex-web.us-west-2.prod.expedia.com',
      timeout: 5000
    },
    customer: {
      timeOut: 500
    },
    blacksmith: {
      url: 'https://blacksmith-anvil.test.expedia.com'
    }
  },
  logging: {
    accessLog: {
      compress: false,
      fileSize: undefined,
      keep: undefined,
      tailable: false
    }
  },
  platform: {
    context: {
      url: process.env.CONTEXT_URL || 'https://common-pwa-bff-api.us-west-2.test.expedia.com/api/context'
    },
    polyfill: {
      features: ['IntersectionObserver']
    },
    streaming: {
      enabled: true
    },
    controller: {
      fetch: {
        timeout: 60000
      }
    }
  },
  path: {
    stylesheets: path.join(process.cwd(), 'src', 'common', 'stylesheets')
  },
  client: {
    perfExperimentNames: ['MESO_PWA_GPT']
  },
  cdn: {
    dynamicStyle: {
      enabled: true
    }
  }
};
