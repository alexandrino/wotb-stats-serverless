
module.exports = {
  collectCoverageFrom: [
    '**/*.js',
  ],
  testRegex: '\\.spec\\.js$',
  modulePathIgnorePatterns: [
    'package.json',
  ],
  collectCoverage: true,
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
}
