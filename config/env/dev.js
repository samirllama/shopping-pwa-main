const { Env } = require('bernie-config');

module.exports.config = {
  app: {
    shortlist: {
      proxy: {
        url: 'https://universal-curation-service.us-west-2.test.expedia.com'
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
    env: Env.DEV,
    name: 'Development',
    isAws: false
  },
  cluster: false,
  platform: {
    defaultTpid: process.env.DEFAULT_TPID || 1,
    defaultLocale: process.env.DEFAULT_LOCALE || 'en_US'
  },
  site: {
    static: [
      'public',
      'static',
      // Serves localization bundles to client for dev mode here
      'node_modules/shopping-pwa-localization/dist'
    ]
  },
  monitoring: {
    enabled: false
  }
};
