import { InstallerPortalSteps } from '../../business/steps/installer-portal/installer-portal-steps'
import { ProjectBuilder } from '../../business/page-objects/project-builder'
import apiSalesforce from '../../business/steps/api-salesforce/api-salesforce-steps'
import TestRunner from '../../business/tests/test-runner/test-runner'
import testCases from '../../data/testing-data/project-builder/positive-test-cases'



testCases.simple.forEach(test => {
    describe(`Create a project with Personal Info (PII) only - ${test.desc}. \nID: ${test.id}`, () => {

        before(() => {

            InstallerPortalSteps.login_installerPortal();

        })

        it('Create a project and verify that data are correct', () => {

            ProjectBuilder.createProject(test.projectDetails);
            TestRunner.ProjectBuilderTests.Positive.projectOverviewPage(test.projectDetails);

        })

        after(() => {
            apiSalesforce.apiLogin();
        })

        after(() => {
            cy.wrap(apiSalesforce.deleteSavedOpp());    
        })

    })

    // describe(`Delete the project - ${test.desc}. ID: ${test.id}`, () => {
    //     before (() => {
    //         apiSalesforce.apiLogin();
    //     })
    //     it ('Delete the project',  () => {
    //         cy.wrap(apiSalesforce.deleteSavedOpp());
    //     })
    // })
 
})

