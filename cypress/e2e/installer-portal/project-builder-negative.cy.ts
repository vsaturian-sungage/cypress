import { InstallerPortalSteps } from '../../business/steps/installer-portal/installer-portal-steps';
import { ProjectBuilder } from '../../business/page-objects/project-builder';
import apiSalesforce from '../../business/steps/api-salesforce/api-salesforce-steps';
import TestRunner from '../../business/tests/test-runner/test-runner';
import testCases from '../../data/testing-data/project-builder/negative-test-cases';
import CoreUtils from '../../core/helpers/utility';



testCases.emptyFields.forEach(test => {
    describe(`Create a project with ${test.desc}. \nID: ${test.id}`, () => {
        before(() => {
            InstallerPortalSteps.login();
        })

        it(`Create a project with ${test.desc}`, () => {
            ProjectBuilder.createProject(test.projectDetails, false);
            TestRunner.ProjectBuilderTests.Negative.checkEmptyFieldErrors(test.projectDetails);
            CoreUtils.makeScreenshot();
        })
    })
 
})

testCases.validationsProjectDetails.forEach(test => {
    describe(`Create a project with ${test.desc}. \nID: ${test.id}`, () => {
        before(() => {
            InstallerPortalSteps.login();
        })

        it('Create a project with ${test.desc}', () => {
            ProjectBuilder.createProject(test.projectDetails);
            TestRunner.ProjectBuilderTests.Negative.checkPopUpErrors(test.projectDetails);
            CoreUtils.makeScreenshot();
        })

        after(() => {
            apiSalesforce.apiLogin();
        })

        after(() => {
            apiSalesforce.deleteSavedOpp();    
        })
    });
});