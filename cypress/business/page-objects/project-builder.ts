import { InstallerPortalSteps, ProjectBuilderSteps } from '../steps/installer-portal/installer-portal-steps';
import { Utils } from '../Utils/utils';
import { ProjectDetails } from '../types/project-details-types';
import defaultProjectData from '../../data/testing-data/default/project-example'
import Logger from '../../core/logger/logger';


class ProjectBuilder {
    
    static createProject (projectDetails: ProjectDetails, saveOppId = true) {

        InstallerPortalSteps.goTo("Project Builder");

        //Use default project data if none provided for a test
        projectDetails.PII = projectDetails.PII 
                                ? projectDetails.PII 
                                : defaultProjectData.solar.projectDetails.PII;
        // projectDetails.projectData = projectDetails.loanData && projectDetails.projectData 
        //                                 ? projectDetails.projectData 
        //                                 : defaultProjectData.projectDetails.projectData;

        projectDetails.projectData = !projectDetails.projectData && projectDetails.loanData
                                        ? projectDetails.loanType == "Battery"
                                            ? defaultProjectData.battery.projectDetails.projectData
                                            : defaultProjectData.solar.projectDetails.projectData
                                        : projectDetails.projectData
        
        ProjectBuilderSteps.fillPersonalInfo(projectDetails.PII);

        if (projectDetails.projectData) {
            
            ProjectBuilderSteps.clickNext();
            ProjectBuilderSteps.fillProjectData(projectDetails.projectData);

        }
        if (projectDetails.loanData) {

            ProjectBuilderSteps.clickNext();
            ProjectBuilderSteps.fillLoanData(projectDetails.loanData);

        }

        ProjectBuilderSteps.clickDone();

        if (saveOppId === true) {
            ProjectBuilderUtils.saveOppId();
        }

    }

    static editProject () {

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