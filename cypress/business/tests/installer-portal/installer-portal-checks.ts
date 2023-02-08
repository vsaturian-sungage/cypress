// import { ProjectBuilderUtils } from "../../page-objects/project-builder";
import Logger from "../../../core/logger/logger";
import Assert from "../../../core/helpers/assertions";
import xpathLocator from "../../../data/locators/xpath-locators";
import { ProjectDetails } from '../../types/project-details-types';
import { Calculate, ProjectUtils } from "../../Utils/utils";
import { projectDefault } from "../../../data/constants/projectDefault";
import { Is } from "../../Utils/utils";
import CoreUtils from "../../../core/helpers/utility";


class ProjectBuilderChecks {

    static Positive = {

        checkEmailText (PII: ProjectDetails["PII"]) {
            cy.xpath(xpathLocator.installerPortal.projectOverview.email).should('have.text', PII.email.toLowerCase())
                .invoke('text').then((actualEmail) => {
                    Logger.logWithResults(PII.email.toLowerCase(), actualEmail, "Email is correct")
                }
            );
        },

        //TODO delete once main method is tested
        // checkEmailText_old (PII: ProjectDetails["PII"]) {
        //     ProjectBuilderUtils.getElementByName("Email").should('have.text', PII.email.toLowerCase())
        //         .invoke('text').then((actualEmail) => {
        //             Logger.logWithResults(PII.email.toLowerCase(), actualEmail, "Email is correct")
        //         }
        //     );
        // },

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
            let expectedBatterySize = projectData.batteryCost ? projectData.batterySize || projectDefault.min_batterySize : 0
    
            loanType = ProjectUtils.getLoanType(projectData); 
            havingBattery = Is.havingBattery(projectData);
            havingRoof = Is.havingRoof(projectData);
            
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
            let expectedLoanAmount = Calculate.loanAmount(projectDetails);
            let expectedDppPortion = Calculate.dppPortion(projectDetails);
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
            Assert.includeValue(actualAddress, String(PII.ZIP));
        }

    }


    static Negative = {

        checkEmptyFieldErrors (projectDetails: ProjectDetails) {
            Object.entries(projectDetails).forEach(([section, data]) => {
                let emptyFields: Array<string> = [];
                for (const [field, value] of Object.entries(data)) {
                    if (!value) {
                        emptyFields.push(field);
                        let fieldName = processField(field);
                        Assert.elementExists(xpathLocator.installerPortal.projectBuilder.requiredFieldError(fieldName)); 
                    }
                }
                
                if (emptyFields.length == 0) {
                    Logger.warn(`checkEmptyFieldErrors function didn't find any empty field.\nemptyFields: ${emptyFields}`);
                }
            })
        },

        checkPopUpErrors (projectDetails: ProjectDetails) {
            let errorMessage = xpathLocator.installerPortal.projectBuilder.errorMessage;;
            let message: Array<string> = [];

            let project = projectDetails.projectData;
            let loanAmount = Calculate.loanAmount(projectDetails);
            let solarAmount = Calculate.costSolar(projectDetails);
            let RBAmount = Calculate.costRB(projectDetails);
            let grossCost: number;
            if (projectDetails.projectData.solarSize) {
                grossCost = Calculate.grossCostPerSize(projectDetails);
            }

            if (loanAmount > projectDefault.max_loanAmount && !Is.batteryOnly(project)){
                message.push(`total loan size cannot exceed $${projectDefault.max_loanAmount.toLocaleString("en-US")}`);
            } else if (loanAmount > projectDefault.max_loanAmount_batteryOnly && Is.batteryOnly(project)) {
                message.push(`total loan size cannot exceed $${projectDefault.max_loanAmount_batteryOnly.toLocaleString("en-US")}`);
            }
            if (loanAmount < projectDefault.min_loanAmount) {
                message.push(`Your loan ($${Math.round(loanAmount).toLocaleString("en-US")}) is under the minimum size`);
            } 
            if (project.solarSize > projectDefault.max_solarSize || project.solarSize < projectDefault.min_solarSize) {
                message.push(`System Size is in kW and must be between 0 and ${projectDefault.max_solarSize}`);
            } 
            if (project.batterySize > projectDefault.max_batterySize || project.batterySize < projectDefault.min_batterySize) {
                message.push(`Battery capacity is in kWh and must be between 1 and ${projectDefault.max_batterySize}`);
            }
            if (solarAmount > 0 && solarAmount < RBAmount) {
                message.push("The sum of battery cost and roof cost cannot exceed 50%");
            }
            if (grossCost && (grossCost < projectDefault.min_grossCostPerSize || grossCost > projectDefault.max_grossCostPerSize)) {
                message.push(`Gross cost must be between $${projectDefault.min_grossCostPerSize} and $${projectDefault.max_grossCostPerSize} per watt`);
            }
            if (!Is.roofAvailable(projectDetails["projectData"])) {
                message.push("We can not finance a roof if the system is not located on the roof of the residence");
            }

            if (message.length != 0) {
                Assert.includeArray(errorMessage, message);
            } else {
                Logger.warn(`checkPopUpErrors function didn't find any errors`);
            }
        }

    }

}



function processField(field: string) {
    switch (field) {
        case "solarCost" || "solarcost":
            field = "Solar_Cost__c";
            break;
        case "solarSize" || "solarSize":
            field = "System_Size_kW_STC__c";
            break;
        case "batteryCost" || "batterycost":
            field = "Battery_Cost__c";
            break;
        case "batterySize" || "batterysize":
            field = "Battery_Size__c";
            break;
    }
    return field;
}



export { ProjectBuilderChecks }