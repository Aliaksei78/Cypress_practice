const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default   // from https://www.npmjs.com/package/cypress-cucumber-preprocessor

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())                           // from https://www.npmjs.com/package/cypress-cucumber-preprocessor
    },
    specPattern: 'cypress/integration/BDD/*.feature',
    baseUrl: "https://store.google.com/us/collection/accessories_wall?hl=en-US"
  },
});
