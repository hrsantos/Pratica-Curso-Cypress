const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //Config URL base
    baseUrl: 'http://localhost:3000',
    //Conig URL API
    env:{
      apiUrl: 'http://localhost:3333'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
