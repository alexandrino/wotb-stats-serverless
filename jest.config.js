
module.exports = {
  collectCoverageFrom: [
    '**/*.js',
    '!**/coverage/**/*.js',
  ],
  testRegex: '\\.spec\\.js$',
  modulePathIgnorePatterns: [
    'package.json',
  ],
  collectCoverage: true,
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
}
