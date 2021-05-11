module.exports = {
  testMatch: ['<rootDir>/test/**/**+(.|-)+(spec|test)?(s).+(j|t)s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/config/', '/test/perf/', '/test/graphql-check/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/jest-startup.js',
  moduleNameMapper: {
    '^isomorphic-fetch(.*)$': '<rootDir>/test/stub-modules/isomorphic-fetch.ts',
    '^test-utils(.*)$': '<rootDir>/test/utils/$1',
    'src/(.*)': '<rootDir>/src/$1'
  },
  moduleDirectories: ['src/common', 'node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: true,
  /*
   * UNCOMMENT to run coverage report for all files
   * This will let us know our coverage for all files,
   *    including the ones that are not tested
   */
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test/', '<rootDir>/src/common/types/'],
  coverageReporters: ['cobertura', 'html', 'text-summary', 'json-summary'],
  coverageThreshold: {
    global: {
      // Goal is to get the branch and line coverage to 90%
      branches: 71,
      functions: 73,
      lines: 80,
      statements: 81
    }
  },
  testURL: 'https://localhost:8443',
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'test/tsconfig.json',
      skipBabel: true
    }
  }
};
