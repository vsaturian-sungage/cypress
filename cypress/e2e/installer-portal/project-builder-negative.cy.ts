import { InstallerPortalSteps } from '../../business/steps/installer-portal/installer-portal-steps'
import { ProjectBuilder } from '../../business/page-objects/project-builder'
import apiSalesforce from '../../business/steps/api-salesforce/api-salesforce-steps'
import TestRunner from '../../business/tests/test-runner/test-runner'
import testCases from '../../data/testing-data/project-builder/negative-test-cases'



testCases.emptyFields.forEach(test => {
    describe(`Create a project with ${test.desc}. \nID: ${test.id}`, () => {

        before(() => {

            InstallerPortalSteps.login_installerPortal();

        })

        it(`Create a project with ${test.desc}`, () => {

            ProjectBuilder.createProject(test.projectDetails, false);
            TestRunner.ProjectBuilderTests.Negative.checkEmptyFieldErrors(test.projectDetails);

        })

    })
 
})

testCases.validationsProjectDetails.forEach(test => {
    describe(`Create a project with ${test.desc}. \nID: ${test.id}`, () => {
        before(() => {

            InstallerPortalSteps.login_installerPortal();

        })

        it('Create a project with ${test.desc}', () => {

            ProjectBuilder.createProject(test.projectDetails);
            TestRunner.ProjectBuilderTests.Negative.checkPopUpErrors(test.projectDetails);

        })

        after(() => {
            apiSalesforce.apiLogin();
        })

        after(() => {
            cy.wrap(apiSalesforce.deleteSavedOpp());    
        })
    });
});