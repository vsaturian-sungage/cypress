import { ProjectBuilder, ProjectBuilderUtils } from '../business/page-objects/project-builder'
import apiSalesforce from '../business/steps/api-salesforce/api-salesforce-steps'
import {Utils} from '../business/Utils/utils'
//import testData from '../data/testing-data/project-builder/positive-test-cases.json'
import { ProjectBuilderChecks } from '../business/tests/installer-portal/installer-portal-checks'
import { InstallerPortalSteps } from '../business/steps/installer-portal/installer-portal-steps'
import xpathLocator from '../data/locators/xpath-locators'

let testData = {
  solarCost: 145000,
  solarSize: 50,
  downPayment: 0,
  solarRebate: {
    amount: 0
  },
  batteryCost: 0,
  batterySize: 0,
  batteryRebate: {
    amount: 0
  },
  roofCost: 0
}

describe('', () => {
  before (() => {
    
    InstallerPortalSteps.login_installerPortal();
    cy.visit("https://sungage--stg.sandbox.my.site.com/projects/ProjectOverview?id=0063I000008iTNhQAM#/");
    
  })
  it ('asd',  () => {
    ProjectBuilderChecks.checkProjectDetailsData(testData)
    // cy.xpath(xpathLocator.installerPortal.projectOverview.solarCost).invoke('attr', 'value').then((asd) => {
    //   cy.log(asd)
    // })

  })

})

/*

var raw2 = {
  "id": "16698156917121111",
  "primaryApplicant": {
    "firstName": "1RUTH",
    "lastName": "CHACON",
    "email": "credit-app-test@email.ghostinspector.com"
  },
  "projectAddress": {
    "street": "504 TOLOUSE AVE",
    "city": "RIVERSIDE",
    "state": "CA",
    "zip": "92501"
  },
  "projectDetails": {
    "solarCost": 150000,
    "solarSize": 100
  },
  "loan": {
    "term": 25
  }
}

describe('empty spec', () => {
  it('passes', () => {
    cy.request(
      'POST', 
      'https://sungage--stg.sandbox.my.salesforce-sites.com/apply/services/apexrest/ProjectApi/v01/project?ak=03990b8f7b6fa49bd088eff6490d5a9c&uk=asdfasg5yg5g4g24ferw', 
      
      raw2
    )
  })
}) 

*/