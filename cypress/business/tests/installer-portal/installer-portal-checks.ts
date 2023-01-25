import { ProjectBuilder, ProjectBuilderUtils } from "../../page-objects/project-builder";
import Logger from "../../../core/logger/logger";
import DOMHelper from "../../../core/helpers/element-actions";
import Assert from "../../../core/helpers/assertions";
import xpathLocator from "../../../data/locators/xpath-locators";
import { ProjectDetails } from '../../types/project-details-types';
import { CalculationUtils, ProjectUtils } from "../../Utils/utils";
import { projectDefault } from "../../../data/constants/projectDefault";
import TestRunner from "../test-runner/test-runner";


class ProjectBuilderChecks {

    static Positive = {

        checkEmailText (PII: ProjectDetails["PII"]) {
            ProjectBuilderUtils.getElementByName("Email").should('have.text', PII.email.toLowerCase())
                .invoke('text').then((actualEmail) => {
                    Logger.logWithResults(PII.email.toLowerCase(), actualEmail, "Email is correct")
                }
            );
        },

        checkFullNameText (PII: ProjectDetails["PII"]) {
            cy.get('h1').should(($h1) => {
                expect($h1.get(0).innerText.toLowerCase()).to.include(PII.firstName.toLowerCase());
                expect($h1.get(0).innerText.toLowerCase()).to.include(PII.lastName.toLowerCase());
            })
                .invoke('text').then((fullName) => {
                    Logger.logWithResults(`${PII.firstName} ${PII.lastName}`, fullName, "Full name is correct")
                }
            );  
        },

        checkSungageId () {
            cy.xpath(xpathLocator.installerPortal.projectOverview.sungageID).invoke('text').then((ID) => {
                expect(ID).to.not.be.null;
                Logger.log(`Sungage ID is not null. Sungage ID: ${ID}`, 'Sungage ID check');
            })
        },

        checkProjectDetailsData (projectData: ProjectDetails["projectData"]) {
            let loanType: string;
            let havingBattery: boolean;
            let havingRoof: boolean;
            let actualProjectData = xpathLocator.installerPortal.projectOverview.projectDetails;
            let expectedBatterySize = projectData.batteryCost ? projectData.batterySize || projectDefault.minimum_batterySize : 0
    
            loanType = ProjectUtils.getLoanType(projectData); 
            havingBattery = ProjectUtils.isHavingBattery(projectData);
            havingRoof = ProjectUtils.isHavingRoof(projectData);
            
            if (loanType === "Solar") {
    
                //Additional fields
                Assert.includeValue(actualProjectData.loanType, loanType);
                if (loanType === "Solar" && havingBattery === true) {
                    Assert.includeValue(actualProjectData.additionalProducts, "Batteries");
                }
                if (loanType === "Solar" && havingRoof === true) {
                    Assert.includeValue(actualProjectData.additionalProducts, "Roof");
                }
                
                //Solar Only fields
                Assert.equalValues(actualProjectData.solarCost, projectData.solarCost || 0, "value");
                Assert.equalValues(actualProjectData.solarSize, projectData.solarSize || 0, "value");
                Assert.equalValues(actualProjectData.solarRebateAmount, projectData.solarRebate?.amount || 0, "value");
                Assert.equalValues(actualProjectData.downPayment, projectData.downPayment || 0, "value");
    
                //Solar+ fields
                if (havingBattery === true) {
                    Assert.equalValues(actualProjectData.batteryCost, projectData.batteryCost || 0, "value");
                    Assert.equalValues(actualProjectData.batterySize, expectedBatterySize, "value");
                    Assert.equalValues(actualProjectData.batteryRebateAmount, projectData.batteryRebate?.amount || 0, "value");
                }
                if (havingRoof === true) {
                    Assert.equalValues(actualProjectData.roofCost, projectData.roofCost || 0, "value");
                }
            } else {
                // Battery Only fields
                Assert.equalValues(actualProjectData.batteryCost, projectData.batteryCost || 0, "value");
                Assert.equalValues(actualProjectData.batterySize, expectedBatterySize, "value");
                Assert.equalValues(actualProjectData.batteryRebateAmount, projectData.batteryRebate?.amount || 0, "value");
                Assert.equalValues(actualProjectData.downPayment, projectData.downPayment || 0, "value");
            }
            Logger.log("Project details are verified.")
        },

        checkLoanData (projectDetails: ProjectDetails) {
            let actulLoanData = xpathLocator.installerPortal.projectOverview.financingDetails;
            let expectedLoanAmount = CalculationUtils.calculateLoanAmount(projectDetails.projectData);
            let expectedDppPortion = CalculationUtils.calculateDppPortion(projectDetails);
            let expectedDppType = ProjectUtils.getDppType(projectDetails.loanData);
            let actualTerm = xpathLocator.installerPortal.projectOverview.financingDetails.term
    
            Assert.equalValues(actulLoanData.loanAmount, expectedLoanAmount);
            Assert.greaterThanZero(actulLoanData.monthlyPayment);
            Assert.equalValues(actulLoanData.dppPortion, expectedDppPortion);
            Assert.includeValue(actulLoanData.dppType, expectedDppType);
            Assert.includeValue(actualTerm, String(projectDetails.loanData.term || 5))
        },

        checkAddress (PII: ProjectDetails["PII"]) {
            let actualAddress = xpathLocator.installerPortal.projectOverview.address
            Assert.includeValue(actualAddress, PII.street);
            Assert.includeValue(actualAddress, PII.city);
            Assert.includeValue(actualAddress, PII.state);
            Assert.includeValue(actualAddress, PII.ZIP);
        }

    }


    static Negative = {

        //Cover following validations
        ////loanAmount
        ////solarSize
        ////batterySize
        ////GrossCost per 1 kW (1 to 15$)
        ////50% for R&B
        ////Roof availability
        checkErrorPopUp (ProjectDetails: ProjectDetails) {
            let issue = new Set<string>();
            let project = ProjectDetails.projectData;

            let loanAmount = CalculationUtils.calculateLoanAmount(ProjectDetails.projectData);

            if (loanAmount > projectDefault.maximum_loanAmount) issue.add("loanAmount exceeds the maximum");
            if (loanAmount < projectDefault.minimum_loanAmount) issue.add("loanAmount is under the minimum");
            if (project.solarSize > projectDefault.maximum_solarSilze || project.solarSize < projectDefault.minimum_solarSize) issue.add("solarSize is out of range");
            if (project.batterySize > projectDefault.maximum_batterySilze || project.batterySize < projectDefault.minimum_batterySize) issue.add("batterySize is out of range");

            let message: string;
            let errorMessage = xpathLocator.installerPortal.projectBuilder.errorMessage
            Assert.includeValue(errorMessage, message)
        }

    }

}

class TestUtils {

    

}


export { ProjectBuilderChecks }