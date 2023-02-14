import Logger from 'cypress/core/logger/logger';
import DOMHelper from '../../../core/helpers/element-actions';
import xpathLocator from '../../../data/locators/xpath-locators';
import { ProjectDetails } from '../../types/project-details-types';



class InstallerPortalUtils {
    static pickState (state: string) {
        cy.window().then((window) => {
            window.eval("let arrow = document.querySelectorAll('.ant-select-arrow');arrow[0].click();");
            cy.xpath(`//li[text() = "${state}"]`).click();
        })
    }

    static pickSolarMountingLocation (solarMountingLocation: string) {
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.solarMountingLocationDropdown);
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.solarMountingLocationValue(solarMountingLocation));
    }

    static pickRate (rate: string | number, loanTerm: number) { //TODO - Adjust method to be able to pick first and last element
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.rateDropdown(loanTerm));
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.rateValue(rate));
    }

    static pickDppType (dppType: string | number) {
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppTypeDropdown);
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppTypeValue(dppType));
    }

    static pickDppPortion (itc = 30, customValue: string | number) { //Doesn't work. States that values of the dropdown has display:none
        if (!customValue) {
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdown);
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdownValue(itc));
        } else {
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdown);
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdownValue('Custom'));
            DOMHelper.typeInto.fieldByLocator(xpathLocator.installerPortal.projectBuilder.customDppPortion, customValue);
        }
    }
}



class InstallerPortalSteps extends InstallerPortalUtils {
    static login (email?: string, password?: string, host?: string) {
        email ??= Cypress.env('email_installer');
        password ??= Cypress.env('password_installer');
        host ??= Cypress.env(`url_installerPortal`);

        console.clear(); //Prevents out of memory error due to uncontrollable logs from Cypress
        cy.visit(host);
        cy.xpath(xpathLocator.installerPortal.login_email)
            .type(`${email}`);
        cy.xpath(xpathLocator.installerPortal.login_password)
            .type(`${password}`);
        DOMHelper.clickOn(xpathLocator.installerPortal.loginButton);
        cy.visit(`${host}/projects`);
        cy.log('Successfully logged in to Installer Portal');
    }
    
    static goTo (component: string, host = Cypress.env('url_installerPortal')) {
        if (component == "Project Builder") {
            cy.visit(`${host}/projects/ProjectOverview#/projectbuilder`); 
        }  
    }

    static clickDone () {
        DOMHelper.getElementById("done", "button").click();
    }

    static clickNext () {
        DOMHelper.getElementById("next", "button").click();
    }
}



class ProjectBuilderSteps extends InstallerPortalSteps {
    static fillPersonalInfo (PII: ProjectDetails["PII"]) {
        let fieldsPIIMap = new Map ([
            ["First Name", PII.firstName],
            ["Last Name", PII.lastName],
            ["Email", PII.email],
            ["Street", PII.street],
            ["City", PII.city],
            ["Zip", PII.ZIP]
        ])
        fieldsPIIMap.forEach(DOMHelper.typeInto.inputHavingAttribute);
        
        if (PII.Spanish === true) {
            DOMHelper.getElementById("Spanish").click();
        } 

        if (PII.state) {
            this.pickState(PII.state);
        }
    }

    static fillProjectData (projectDetails: ProjectDetails) {
        let project = projectDetails.projectData;

        projectDetails.loanType = projectDetails.loanType 
                                    ? projectDetails.loanType 
                                    : project?.solarCost 
                                        ? "Solar"
                                        : "Battery";
        let loanType = projectDetails.loanType;

        let fieldsMap: Map<string, number>;
        
        project.solarMountingLocation = project.solarMountingLocation || "Roof of Residence";

        if (loanType == "Solar" || loanType == "Solar+") {
            fieldsMap = new Map ([
                ["Solar Cost", project.solarCost ?? null],
                ["System size", project.solarSize ?? null],
                ["Down Payment", project.downPayment ?? null],
                ["Rebate Amount", project.solarRebate?.amount ?? null]
            ]);

            this.pickSolarMountingLocation(project.solarMountingLocation);

            if (project.batteryCost > 0 || project.batterySize > 0) {
                DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.addBattery);
                fieldsMap.set("Battery Cost", project.batteryCost ?? null);
                fieldsMap.set("Battery Capacity", project.batterySize ?? null);
                fieldsMap.set("Battery Rebate", project.batteryRebate?.amount ?? null);
            }

            if (project.roofCost > 0) {
                DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.addRoof);
                fieldsMap.set("Roof Cost", project.roofCost ?? null);
            }
            
        } else if (loanType == "Battery") {
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.batteryLoanType);
            fieldsMap = new Map ([
                ["Battery Cost", project.batteryCost ?? null],
                ["Battery Capacity", project.batterySize ?? null],
                ["Down Payment", project.downPayment ?? null],
                ["Battery Rebate Amount", project.batteryRebate?.amount ?? null]
            ]);
        }

        fieldsMap.forEach(DOMHelper.typeInto.followingSibling);
    }

    static fillLoanData (loanData: ProjectDetails["loanData"]) {
        if (loanData.rate) {
            this.pickRate(loanData.rate, loanData.term);
        }
        if (loanData.dppType) {
            this.pickDppType(loanData.dppType);
        }
        if (loanData.itc || loanData.customDppPortion) {
            this.pickDppPortion(loanData.itc, loanData.customDppPortion);
        }
        DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.term(loanData.term || 5));
    }
}



export { InstallerPortalSteps, ProjectBuilderSteps };