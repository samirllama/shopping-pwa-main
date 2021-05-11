const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/test/graphql-check/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: undefined
};
