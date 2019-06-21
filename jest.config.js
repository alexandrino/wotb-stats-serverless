
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
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
}
