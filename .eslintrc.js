module.exports = {
  "plugins": ["node"],
  "extends": "airbnb-base",
  "rules": {
    "strict": "off",
    "semi": [
      "error",
      "never"
    ],
    "no-var": "error"
  },
  "overrides": [
    {
      "files": ["*.spec.js", "*.ispec.js"]
    }
  ],
  "env": {
    "jest": true,
    "node": true,
  }
}
