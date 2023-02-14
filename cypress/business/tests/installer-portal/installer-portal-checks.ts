import Logger from "../../../core/logger/logger";
import Assert from "../../../core/helpers/assertions";
import xpathLocator from "../../../data/locators/xpath-locators";
import { ProjectDetails } from '../../types/project-details-types';
import { Calculate, ProjectUtils } from "../../Utils/utils";
import { projectDefault } from "../../../data/constants/project-default";
import { Is } from "../../Utils/utils";


class ProjectBuilderChecks {
    static Positive = {
        checkProjectOverviewShown () {
            //If we're at Project Builder, "projectbuilder" property appears in the url
            cy.url().should('not.include', 'projectbuilder');
            cy.url().should('include', 'ProjectOverview');
        },

        checkEmailText (PII: ProjectDetails["PII"]) {
            cy.xpath(xpathLocator.installerPortal.projectOverview.email).should('have.text', PII.email.toLowerCase())
                .invoke('text').then((actualEmail) => {
                    Logger.logWithResults(PII.email.toLowerCase(), actualEmail, "Email is correct");
                }
            );
        },

        checkFullNameText (PII: ProjectDetails["PII"]) {
            cy.get('h1').should(($h1) => {
                expect($h1.get(0).innerText.toLowerCase()).to.include(PII.firstName.toLowerCase());
                expect($h1.get(0).innerText.toLowerCase()).to.include(PII.lastName.toLowerCase());
            })
                .invoke('text').then((fullName) => {
                    Logger.logWithResults(`${PII.firstName} ${PII.lastName}`, fullName, "Full name is correct");
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
            let expectedBatterySize = projectData.batteryCost ? projectData.batterySize || projectDefault.batterySize.min : 0;
    
            loanType = ProjectUtils.getLoanType(projectData); 
            havingBattery = Is.havingBattery(projectData);
            havingRoof = Is.havingRoof(projectData);
            
            if (loanType === "Solar") {
    
                //Additional fields
                Assert.includeValue(actualProjectData.loanType, loanType);
                if (loanType === "Solar" && havingBattery) {
                    Assert.includeValue(actualProjectData.additionalProducts, "Batteries");
                }
                if (loanType === "Solar" && havingRoof) {
                    Assert.includeValue(actualProjectData.additionalProducts, "Roof");
                }
                
                //Solar Only fields
                Logger.logAccented("Checking solar cost");
                Assert.equalValues(actualProjectData.solarCost, projectData.solarCost || 0, "value");
                Logger.logAccented("Checking solar size");
                Assert.equalValues(actualProjectData.solarSize, projectData.solarSize || 0, "value");
                Logger.logAccented("Checking solar rebate");
                Assert.equalValues(actualProjectData.solarRebateAmount, projectData.solarRebate?.amount || 0, "value");
                Logger.logAccented("Checking down payment");
                Assert.equalValues(actualProjectData.downPayment, projectData.downPayment || 0, "value");
    
                //Solar+ fields
                if (havingBattery) {
                    Logger.logAccented("Checking battery cost");
                    Assert.equalValues(actualProjectData.batteryCost, projectData.batteryCost || 0, "value");
                    Logger.logAccented("Checking battery size");
                    Assert.equalValues(actualProjectData.batterySize, expectedBatterySize, "value");
                    Logger.logAccented("Checking battery rebate");
                    Assert.equalValues(actualProjectData.batteryRebateAmount, projectData.batteryRebate?.amount || 0, "value");
                }
                if (havingRoof) {
                    Logger.logAccented("Checking roof cost");
                    Assert.equalValues(actualProjectData.roofCost, projectData.roofCost || 0, "value");
                }
            } else {
                // Battery Only fields
                Logger.logAccented("Checking battery cost");
                Assert.equalValues(actualProjectData.batteryCost, projectData.batteryCost || 0, "value");
                Logger.logAccented("Checking battery size");
                Assert.equalValues(actualProjectData.batterySize, expectedBatterySize, "value");
                Logger.logAccented("Checking battery rebate");
                Assert.equalValues(actualProjectData.batteryRebateAmount, projectData.batteryRebate?.amount || 0, "value");
                Logger.logAccented("Checking down payment");
                Assert.equalValues(actualProjectData.downPayment, projectData.downPayment || 0, "value");
            }
            Logger.log("Project details are verified.");
        },

        checkLoanData (projectDetails: ProjectDetails) {
            let actulLoanData = xpathLocator.installerPortal.projectOverview.financingDetails;
            let expectedLoanAmount = Calculate.loanAmount(projectDetails);
            let expectedDppPortion = Calculate.dppPortion(projectDetails);
            let expectedDppType = ProjectUtils.getDppType(projectDetails.loanData);
            let actualTerm = xpathLocator.installerPortal.projectOverview.financingDetails.term;
    
            Logger.logAccented("Checking loan amount");
            Assert.equalValues(actulLoanData.loanAmount, expectedLoanAmount);
            Logger.logAccented("Checking monthly paymnet");
            Assert.greaterThanZero(actulLoanData.monthlyPayment);
            Logger.logAccented("Checking DPP portion");
            Assert.equalValues(actulLoanData.dppPortion, expectedDppPortion);
            Logger.logAccented("Checking DPP type");
            Assert.includeValue(actulLoanData.dppType, expectedDppType);
            Logger.logAccented("Checking term");
            Assert.includeValue(actualTerm, String(projectDetails.loanData.term || 5));
        },

        checkAddress (PII: ProjectDetails["PII"]) {
            let actualAddress = xpathLocator.installerPortal.projectOverview.address;
            let actualStreet = xpathLocator.installerPortal.projectOverview.street;
            Assert.includeValue(actualStreet, PII.street);
            Assert.includeValue(actualAddress, PII.city);
            Assert.includeValue(actualAddress, PII.state);
            Assert.includeValue(actualAddress, String(PII.ZIP));
        }

    }


    static Negative = {
        checkEmptyFieldErrors (projectDetails: ProjectDetails) {
            Object.entries(projectDetails).forEach(([section, data]) => {
                let emptyFields: Array<string> = [];
                for (const [key, value] of Object.entries(data)) {
                    if (!value) {
                        emptyFields.push(key);
                        let fieldName = getSalesforceFieldName(key);
                        Assert.elementExists(xpathLocator.installerPortal.projectBuilder.requiredFieldError(fieldName)); 
                    }
                }
                
                if (emptyFields.length == 0) {
                    Logger.warn(`checkEmptyFieldErrors function didn't find any empty field.\nemptyFields: ${emptyFields}`);
                }
            })
        },

        checkPopUpErrors (projectDetails: ProjectDetails) {
            let errorMessage = xpathLocator.installerPortal.projectBuilder.errorMessage;
            let messages: Array<string> = [];

            let project = projectDetails.projectData;
            let loanAmount = Calculate.loanAmount(projectDetails);
            let solarAmount = Calculate.costSolar(projectDetails);
            let RBAmount = Calculate.costRB(projectDetails);
            let grossCost: number;
            if (projectDetails.projectData.solarSize) {
                grossCost = Calculate.grossCostPerSize(projectDetails);
            }

            if (loanAmount > projectDefault.loanAmount.max && !Is.batteryOnly(project)){
                messages.push(`total loan size cannot exceed $${projectDefault.loanAmount.max.toLocaleString("en-US")}`);
            } else if (loanAmount > projectDefault.loanAmount.maxBatteryOnly && Is.batteryOnly(project)) {
                messages.push(`total loan size cannot exceed $${projectDefault.loanAmount.maxBatteryOnly.toLocaleString("en-US")}`);
            }
            if (loanAmount < projectDefault.loanAmount.min) {
                messages.push(`Your loan ($${Math.round(loanAmount).toLocaleString("en-US")}) is under the minimum size`);
            } 
            if (project.solarSize > projectDefault.solarSize.max || project.solarSize < projectDefault.solarSize.min) {
                messages.push(`System Size is in kW and must be between 0 and ${projectDefault.solarSize.max}`);
            } 
            if (project.batterySize > projectDefault.batterySize.max || project.batterySize < projectDefault.batterySize.min) {
                messages.push(`Battery capacity is in kWh and must be between 1 and ${projectDefault.batterySize.max}`);
            }
            if (solarAmount > 0 && solarAmount < RBAmount) {
                messages.push("The sum of battery cost and roof cost cannot exceed 50%");
            }
            if (grossCost && (grossCost < projectDefault.grossCostPerSize.min || grossCost > projectDefault.grossCostPerSize.max)) {
                messages.push(`Gross cost must be between $${projectDefault.grossCostPerSize.min} and $${projectDefault.grossCostPerSize.max} per watt`);
            }
            if (!Is.roofAvailable(projectDetails["projectData"])) {
                messages.push("We can not finance a roof if the system is not located on the roof of the residence");
            }

            if (messages.length != 0) {
                Assert.includeArray(errorMessage, messages);
            } else {
                Logger.warn(`checkPopUpErrors function didn't find any errors`);
            }
        }
    }

}



function getSalesforceFieldName(field: string) {
    switch (field) {
        case "solarCost" || "solarcost":
            field = "Solar_Cost__c";
            break;
        case "solarSize" || "solarsize":
            field = "System_Size_kW_STC__c";
            break;
        case "batteryCost" || "batterycost":
            field = "Battery_Cost__c";
            break;
        case "batterySize" || "batterysize":
            field = "Battery_Size__c";
            break;
        default:
            Logger.warn(`getSalesforceFieldName function got the value with unmatched case`);
            break;
    }
    return field;
}



export { ProjectBuilderChecks }