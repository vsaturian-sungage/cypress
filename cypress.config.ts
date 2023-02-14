import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '7bj7cc',
  responseTimeout: 45000,
  defaultCommandTimeout: 30000,
  numTestsKeptInMemory: 1,
  screenshotOnRunFailure: true,
  retries: {
    "runMode": 2, 
    "openMode": 1
  },

  env: {
    url_installerPortal: 'https://sungage--stg.sandbox.my.site.com',
    url_internalSF: 'https://sungage--stg.sandbox.my.salesforce.com',
    email_installer: 'evan.mcdaniel+gemma@sungagefinancial.com',
    password_installer: 'Sungage1'
  },

  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
