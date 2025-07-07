const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.cy.js',
    supportFile: false,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
  video: true,
  screenshotOnRunFailure: false
}); 