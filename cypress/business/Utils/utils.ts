import Logger from "../../core/logger/logger";
import { projectDefault, stateDppPortionMap } from "../../data/constants/projectDefault";
import { OppAttributes } from "../types/opp-attributes-types";
import { ProjectDetails } from "../types/project-details-types";



const OppAttributes_fileName = 'oppAttributes.json';
const OppAttributes_path = `cypress/fixtures/${OppAttributes_fileName}`;



class Utils {

    static oppAttributesAssign (newAttributes: OppAttributes) {

            cy.readFile(OppAttributes_path)
                .then(function (oldAttributes) { 
                    oldAttributes.oppId = newAttributes.oppId || oldAttributes.oppId;
                    oldAttributes.apiId = newAttributes.apiId || oldAttributes.apiId;
                    oldAttributes.appId = newAttributes.appId || oldAttributes.appId;
                    oldAttributes.sungageId = newAttributes.sungageId || oldAttributes.sungageId;
                    cy.writeFile(OppAttributes_path, oldAttributes);
            })

    }

    static getOppAttributes () {  

        return cy.readFile(OppAttributes_path);
    
    }
    
}



class CalculationUtils {

    static calculateLoanAmount (projectData: ProjectDetails["projectData"]) {
        let solarCost = projectData.solarCost || 0;
        let batteryCost = projectData.batteryCost || 0;
        let roofCost = projectData.roofCost || 0;
        let downPayment = projectData.downPayment || 0;
        let solarRebate = (projectData.solarRebate && !projectData.solarRebate.paidToHomeowner) ? projectData.solarRebate.amount : 0;
        let batteryRebate = (projectData.batteryRebate && !projectData.batteryRebate.paidToHomeowner) ? projectData.batteryRebate.amount : 0;
        
        let loanAmount = solarCost + batteryCost + roofCost - downPayment - solarRebate - batteryRebate;
        Logger.log(`Calculated loan amount. Result is ${loanAmount}`)
        return loanAmount;
    }

    //Doesn't include logic for HO rebates, IL and HI specific calculations
    static calculateDppPortion (projectDetails: ProjectDetails) { 
        let dppType = ProjectUtils.getDppType(projectDetails.loanData)
        let dppPortion: number = 0;
        let itc = projectDetails.loanData?.itc ? projectDetails.loanData?.itc : projectDefault.itc;
        let customDppPortion = projectDetails.loanData.customDppPortion ? projectDetails.loanData.customDppPortion : 0;
        
        //Assign state DPP portion if state matches one of the states in the map
        let stateDppPortion: number = 0;
        stateDppPortionMap.forEach((value, key) => { 
            if (projectDetails.PII.state == key) {
                stateDppPortion = value
            }
        });

        if (dppType.includes("None") || dppType === "0") {
            Logger.log(`Calculated expected DPP portion as ${dppPortion}.`)
            return dppPortion;
        } else if (customDppPortion) {
            Logger.log(`Calculated expected DPP portion as ${customDppPortion}.`)
            return Number(customDppPortion);
        } else {
            let loanAmount = this.calculateLoanAmount(projectDetails.projectData);
            dppPortion = loanAmount * itc/100 + stateDppPortion;
            Logger.log(`Calculated expected DPP portion as ${dppPortion}.`)
            return dppPortion;
        }
    }

    static calculateCostRB (projectDetails: ProjectDetails) {
        let project = projectDetails.projectData;

        let batteryCost = project?.batteryCost || 0;
        let batteryRebate = (project?.batteryRebate?.amount > 0 && !project?.batteryRebate?.paidToHomeowner) ? project?.batteryRebate?.amount : 0;
        let batteryLoanAmount = (batteryCost > 0) ? batteryCost - batteryRebate : 0;
        let roofCost = project?.roofCost || 0;

        let costRB = batteryLoanAmount + roofCost;
        
        Logger.log(`Calcilated cost of R&B: ${costRB}.`)
        return costRB;
    }
}



class ProjectUtils {
    
    static getDppType (loanData: ProjectDetails["loanData"]) {
        let dppType = loanData.dppType ? loanData.dppType : [projectDefault.dppType, projectDefault.dppType_api];
        return String(dppType);
    } 

    static getLoanType (projectData: ProjectDetails["projectData"]) {
        let loanType = projectData.solarCost > 0 ? "Solar" : "Battery";
        return loanType;
    }

    static isHavingBattery (projectData: ProjectDetails["projectData"]) {
        return (projectData.solarCost > 0 && projectData.batteryCost) > 0 ? true : false;
    }

    static isHavingRoof (projectData: ProjectDetails["projectData"]) {
        return (projectData.solarCost > 0 && projectData.roofCost > 0) ? true : false;;
    }

}



export { Utils, CalculationUtils, ProjectUtils };