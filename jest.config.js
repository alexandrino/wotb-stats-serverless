
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
      branches: 70,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },
}
