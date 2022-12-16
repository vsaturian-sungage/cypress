import { InstallerPortalSteps } from '../../business/steps/installer-portal/installer-portal-steps'
import { ProjectBuilder, ProjectBuilderUtils } from '../../business/page-objects/project-builder'
import { ProjectBuilderChecks } from '../../business/steps/installer-portal/installer-portal-checks'
import apiSalesforce from '../../business/steps/api-salesforce/api-salesforce-steps'
import Utils from '../../business/Utils/utils'

import testCases from '../../data/testing-data/project-builder/positive-test-cases.json'



testCases.simple.forEach(test => {
    describe(`Create a project with Personal Info (PII) only - ${test.desc}. ID: ${test.id}`, () => {

        before(() => {

            InstallerPortalSteps.login_installerPortal();

        })

        it('Create a project and verify that data are correct', () => {

            ProjectBuilder.createProject(test.projectDetails);

            ProjectBuilderChecks.checkEmailText(test.projectDetails.PII);
            ProjectBuilderChecks.checkFullNameText(test.projectDetails.PII);

        })

    })

    describe(`Delete the project - ${test.desc}. ID: ${test.id}`, () => {
        before (() => {
            apiSalesforce.apiLogin();
        })
        it ('Delete the project',  () => {
            cy.wrap(apiSalesforce.deleteSavedOpp());
        })
    })

})

