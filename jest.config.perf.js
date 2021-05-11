module.exports = {
  testMatch: ['<rootDir>/test/perf/**/**+(.|-)+(spec|test)?(s).+(j|t)s?(x)'],
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest'
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    'ts-jest': {
      tsConfigFile: 'jest.tsconfig.json',
      skipBabel: true
    }
  },
  testURL: 'https://localhost:8443'
};
