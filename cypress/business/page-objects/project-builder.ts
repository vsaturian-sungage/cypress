import { InstallerPortalSteps, ProjectBuilderSteps } from '../steps/installer-portal/installer-portal-steps';
import { Utils } from '../Utils/utils';
import { ProjectDetails } from '../types/project-details-types';
import exampleProject from '../../data/testing-data/default/project-example'
import Logger from '../../core/logger/logger';


class ProjectBuilder {
    static createProject (projectDetails: ProjectDetails, saveOppId = true) {

        InstallerPortalSteps.goTo("Project Builder");

        //Use default project data if none provided for a test
        projectDetails.PII = projectDetails.PII 
                                ? projectDetails.PII 
                                : exampleProject.solar.projectDetails.PII;
        if (projectDetails.loanData) {
            projectDetails.projectData = !projectDetails.projectData
                                            ? projectDetails.loanType == "Battery"
                                                ? exampleProject.battery.projectDetails.projectData
                                                : projectDetails.loanType == "Solar+"
                                                    ? exampleProject.solarPlus.projectDetails.projectData
                                                    : exampleProject.solar.projectDetails.projectData
                                            : projectDetails.projectData
        }
        
        ProjectBuilderSteps.fillPersonalInfo(projectDetails.PII);
        if (projectDetails.projectData) {
            ProjectBuilderSteps.clickNext();
            ProjectBuilderSteps.fillProjectData(projectDetails);
        }
        if (projectDetails.loanData) {
            ProjectBuilderSteps.clickNext();
            ProjectBuilderSteps.fillLoanData(projectDetails.loanData);
        }
        ProjectBuilderSteps.clickDone();

        if (saveOppId) {
            ProjectBuilderUtils.saveOppId();
        }

    }
}



class ProjectBuilderUtils {
    static saveOppId () {
        cy.url().should('contain', 'id=').then(() => {
            cy.location('href').then(urlString => {
                let url = new URL(urlString);
                let id = url.searchParams.get("id");
                Logger.log(`Parsed project (Salesforce) ID: ${id}.`, `Project (Salesforce) ID`)
                Utils.oppAttributesAssign({oppId: id});
            })
        })
    }
}

export { ProjectBuilder, ProjectBuilderUtils }