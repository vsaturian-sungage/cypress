import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '7bj7cc',
  responseTimeout: 45000,
  defaultCommandTimeout: 30000,
  retries: {
    "runMode": 0, 
    "openMode": 0
  },

  env: {
    url_installerPortal: 'https://sungage--stg.sandbox.my.site.com',
  //  url_internalSF: 'https://cs213.salesforce.com',
    url_internalSF: 'https://sungage--stg.sandbox.my.salesforce.com',
    email_installer: 'evan.mcdaniel+gemma@sungagefinancial.com',
    password_installer: 'Sungage1'
  },

  e2e: {
  //  experimentalSessionAndOrigin: true,
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
