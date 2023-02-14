import { InstallerPortalSteps } from '../../business/steps/installer-portal/installer-portal-steps';
import { ProjectBuilder } from '../../business/page-objects/project-builder';
import apiSalesforce from '../../business/steps/api-salesforce/api-salesforce-steps';
import TestRunner from '../../business/tests/test-runner/test-runner';
import testCases from '../../data/testing-data/project-builder/positive-test-cases';
import CoreUtils from '../../core/helpers/utility';



testCases.onlyPII.forEach(test => {
    describe(`Create a project with Personal Info (PII) only for ${test.desc}. \nID: ${test.id}`, () => {
        before(() => {
            InstallerPortalSteps.login();
        })

        it('Create a project and verify that data are correct', () => {
            ProjectBuilder.createProject(test.projectDetails);
            TestRunner.ProjectBuilderTests.Positive.projectOverviewPage(test.projectDetails);
            CoreUtils.makeScreenshot();
        })

        after(() => {
            apiSalesforce.apiLogin();
        })

        after(() => {
            apiSalesforce.deleteSavedOpp();    
        })
    })
})


testCases.withProjectData.forEach(test => {
    describe(`Create a project with Project Data for ${test.desc}. \nID: ${test.id}`, () => {
        before(() => {
            InstallerPortalSteps.login();
        })

        it('Create a project and verify that data are correct', () => {
            ProjectBuilder.createProject(test.projectDetails);
            TestRunner.ProjectBuilderTests.Positive.projectOverviewPage(test.projectDetails);
            CoreUtils.makeScreenshot();
        })

        after(() => {
            apiSalesforce.apiLogin();
        })

        after(() => {
            apiSalesforce.deleteSavedOpp();    
        })
    })
})


testCases.fullProject.forEach(test => {
    describe(`Create a project with full data for ${test.desc}. \nID: ${test.id}`, () => {
        before(() => {
            InstallerPortalSteps.login();
        })

        it('Create a project and verify that data are correct', () => {
            ProjectBuilder.createProject(test.projectDetails);
            TestRunner.ProjectBuilderTests.Positive.projectOverviewPage(test.projectDetails);
            CoreUtils.makeScreenshot();
        })

        after(() => {
            apiSalesforce.apiLogin();
        })

        after(() => {
            apiSalesforce.deleteSavedOpp();    
        })
    })
})

