
module.exports = {
  collectCoverageFrom: [
    '**/*.js',
    '**/*.js',
    '!.*.js',
    '!*.js',
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
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
}
