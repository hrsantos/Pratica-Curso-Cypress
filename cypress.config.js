const { defineConfig } = require("cypress");
//importação da biblioteca do plugin do Allure
//https://github.com/Shelex/cypress-allure-plugin
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    //Config URL base
    baseUrl: 'http://localhost:3000',
    //Conig URL API
    env: {
      apiUrl: 'http://localhost:3333'
    },

    //Configuração de resolução de tela
    viewportWidth: 1920,
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      //Configuração Allure
      allureWriter(on, config);
      return config;
    },
  },
});
