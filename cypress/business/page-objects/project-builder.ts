import { InstallerPortalSteps, ProjectBuilderSteps } from '../steps/installer-portal/installer-portal-steps';
import Utils from '../Utils/utils';
import xpathLocator from '../../data/locators/element-locators';


class ProjectBuilder {
    
    static createProject (projectDetails, saveOppId = true) {
        try {

            InstallerPortalSteps.goTo("Project Builder");
            ProjectBuilderSteps.fillPersonalInfo(projectDetails.PII);

            if (projectDetails.projectData) {
                ProjectBuilderSteps.clickNext();
                ProjectBuilderSteps.fillProjectData(projectDetails.projectData);
            }
            if (projectDetails.projectData && projectDetails.loanData) {
                ProjectBuilderSteps.clickNext();
                ProjectBuilderSteps.fillLoanData(projectDetails.loanData);
            }

            ProjectBuilderSteps.clickDone();

        } catch (error) {
            
        } finally {

            if (saveOppId === true) {
                ProjectBuilderUtils.saveOppId();
            }

        }
    }

    static editProject () {

    }

}



class ProjectBuilderUtils {

    static getElementByName (element: string, xpath = "//") {
        if (element = "Email") {
            xpath = xpathLocator.installerPortal.projectOverview.email;
        } else if (element = "Full Name") {
            xpath = xpathLocator.installerPortal.projectOverview.fullName;
        } 
        return cy.xpath(xpath);
    }

    static saveOppId () {
        cy.url().should('contain', 'id=').then(() => {
            cy.location('href').then(urlString => {
                let url = new URL(urlString);
                let id = url.searchParams.get("id");
                Utils.oppAttributesAssign({oppId: id});
            })
        })
    }

}

export { ProjectBuilder, ProjectBuilderUtils }