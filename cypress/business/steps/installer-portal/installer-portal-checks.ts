import { ProjectBuilder, ProjectBuilderUtils } from "../../page-objects/project-builder";
import Logger from "../../../core/logger/logger";
import DOMHelper from "../../../core/helpers/element-actions";
import Assert from "../../../core/helpers/assertions";
import xpathLocator from "../../../data/locators/element-locators";

class ProjectBuilderChecks {

    static checkEmailText (PII) {
        ProjectBuilderUtils.getElementByName("Email").should('have.text', PII.email.toLowerCase())
            .invoke('text').then((actualEmail) => {
                Logger.logWithArguments("Email is correct", PII.email.toLowerCase(), actualEmail)
            }
        );
    }

    static checkFullNameText (PII) {
        cy.get('h1').should(($h1) => {
            expect($h1.get(0).innerText.toLowerCase()).to.include(PII.firstName.toLowerCase());
            expect($h1.get(0).innerText.toLowerCase()).to.include(PII.lastName.toLowerCase());
        })
            .invoke('text').then((fullName) => {
                Logger.logWithArguments("Full name is correct", `${PII.firstName} ${PII.lastName}`, fullName)
            }
        );  
    }

    static checkSungageId () {
        cy.xpath('//span[contains(text(), "ID")]/following-sibling::span').invoke('text').then((ID) => { //TODO place xpath in certain file
            expect(ID).to.not.be.null;
            cy.log(`Sungage ID is not null. Sungage ID: ${ID}`)
        })
    }

    static checkProjectDetailsData (projectData) {

        let loanType: string;
        let havingBattery: boolean;
        let havingRoof: boolean;

        loanType = projectData.solarCost > 0 ? "Solar" : "Battery";
        havingBattery = (projectData.solarCost > 0 && projectData.batteryCost) > 0 ? true : false; 
        havingRoof = (projectData.solarCost > 0 && projectData.roofCost > 0) ? true : false;
        
        if (loanType === "Solar") {
            //Solar Only fields
            Assert.includeValue(xpathLocator.installerPortal.projectOverview.loanType, loanType)
            Assert.equalValues(xpathLocator.installerPortal.projectOverview.solarCost, projectData.solarCost || 0, "value")
            Assert.equalValues(xpathLocator.installerPortal.projectOverview.solarSize, projectData.solarSize || 0, "value")
            Assert.equalValues(xpathLocator.installerPortal.projectOverview.downPayment, projectData.downPayment || 0, "value")
            Assert.equalValues(xpathLocator.installerPortal.projectOverview.solarRebateAmount, projectData.solarRebate.amount || 0, "value")

            if (havingBattery === true) {

            }
            if (havingRoof === true) {

            }
        } else {
            // Battery Only fields
        }

        //log
    }

    static checkLoanData (loanData) {

    }

    static checkAddress (PII) {

    }
      

}

export { ProjectBuilderChecks }