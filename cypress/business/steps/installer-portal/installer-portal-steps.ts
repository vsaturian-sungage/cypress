import DOMHelper from '../../../core/helpers/element-actions';
import { projectDefault } from '../../../data/constants/projectDefault';
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

    static pickDppPortion (itc = 30, customValue: string | number) { //Doesn't work. States that values of the dropdown has display:none. Force clicking doesn't do anything
        if (!customValue) {
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdown);
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdownValue(itc));
        } else {
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdown);
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.dppPortionDropdownValue('Custom'));
            DOMHelper.typeInto.fieldByLocator(xpathLocator.installerPortal.projectBuilder.customDppPortion, customValue)
        }
    }

}



class InstallerPortalSteps extends InstallerPortalUtils {
    
    static login_installerPortal (
        email = Cypress.env('email_installer'), 
        password = Cypress.env('password_installer'),
        host = Cypress.env(`url_installerPortal`)
    ) {
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
        if (component = "Project Builder")
            cy.visit(`${host}/projects/ProjectOverview#/projectbuilder`);
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

        this.pickState(PII.state);

        cy.log(`Set all PII fields.`);

    }

    static fillProjectData (projectData: ProjectDetails["projectData"]) {

        let loanType: "Solar" | "Battery";
        let fieldsMap: Map<string, number>;
        projectData.solarMountingLocation = projectData.solarMountingLocation || "Roof of Residence";

        if (projectData && projectData.solarCost) {
            loanType = "Solar";
        } else if (projectData && !projectData.solarCost) {
            loanType = "Battery";
        } else {
            throw "Loan type is not set. Verify that projectData are correct.";
        }

        if (loanType = "Solar") {
            fieldsMap = new Map ([
                ["Solar Cost", Number(projectData.solarCost) || 0],
                ["System size", Number(projectData.solarSize) || 0],
                ["Down Payment", Number(projectData.downPayment) || 0],
                ["Rebate Amount", Number(projectData.solarRebate?.amount) || 0]
            ]);

            this.pickSolarMountingLocation(projectData.solarMountingLocation);

            if (projectData.batteryCost > 0) {
                DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.addBattery);
                fieldsMap.set("Battery Cost", Number(projectData.batteryCost));
                fieldsMap.set("Battery Capacity", Number(projectData.batterySize) || projectDefault.min_batterySize);
                fieldsMap.set("Battery Rebate", Number(projectData.batteryRebate?.amount) || 0);
            }

            if (projectData.roofCost > 0) {
                DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.addRoof);
                fieldsMap.set("Roof Cost", Number(projectData.roofCost));
            }
            
        } else if (loanType = "Battery") {
            DOMHelper.clickOn(xpathLocator.installerPortal.projectBuilder.batteryLoanType);

            fieldsMap = new Map ([
                ["Battery Cost", Number(projectData.solarCost) || 0],
                ["Battery Capacity", Number(projectData.solarSize) || 0],
                ["Down Payment", Number(projectData.downPayment) || 0],
                ["Battery Rebate Amount", Number(projectData.solarRebate.amount) || 0]
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