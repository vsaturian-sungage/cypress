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



class ProjectUtils {
    
    static getDppType (loanData: ProjectDetails["loanData"]) {
        let dppType = loanData.dppType ? loanData.dppType : [projectDefault.dppType, projectDefault.dppType_api];
        return String(dppType);
    } 

    static getLoanType (projectData: ProjectDetails["projectData"]) {
        let loanType = projectData.solarCost > 0 ? "Solar" : "Battery";
        return loanType;
    }

}



class Calculate extends ProjectUtils {

    static loanAmount (projectDetails: ProjectDetails): number {
        let project = projectDetails.projectData;

        // let solarCost = project.solarCost || 0;
        // let batteryCost = project.batteryCost || 0;
        // let roofCost = project.roofCost || 0;
        let downPayment = project.downPayment || 0;
        // let solarRebate = (project.solarRebate && !project.solarRebate.paidToHomeowner) ? project.solarRebate.amount : 0;
        // let batteryRebate = (project.batteryRebate && !project.batteryRebate.paidToHomeowner) ? project.batteryRebate.amount : 0;

        let solarAmount = Calculate.costSolar(projectDetails, false);
        let RBAmount = Calculate.costRB(projectDetails);
        
        let loanAmount = solarAmount + RBAmount - downPayment;
        // let loanAmount = solarCost + batteryCost + roofCost - downPayment - solarRebate - batteryRebate;
        Logger.log(`Calculated loan amount. Result is ${loanAmount}`)
        return loanAmount;
    }

    //Doesn't include logic for HO rebates, IL and HI specific calculations
    static dppPortion (projectDetails: ProjectDetails): number { 
        let dppType = this.getDppType(projectDetails.loanData)
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
            Logger.log(`Calculated expected DPP portion: ${dppPortion}.`)
            return dppPortion;
        } else if (customDppPortion) {
            Logger.log(`Calculated expected DPP portion: ${customDppPortion}.`)
            return Number(customDppPortion);
        } else {
            let loanAmount = Calculate.loanAmount(projectDetails);
            dppPortion = loanAmount * itc/100 + stateDppPortion;
            Logger.log(`Calculated expected DPP portion: ${dppPortion}.`)
            return dppPortion;
        }
    }

    //Only Solar part of the loan
    static costSolar (projectDetails: ProjectDetails, includeDownPayment = true): number {
        let project = projectDetails.projectData;

        let solarCost = project.solarCost || 0;
        let solarRebate = (project.solarRebate && !project.solarRebate.paidToHomeowner) ? project.solarRebate.amount : 0;
        let downPayment = (project.downPayment && includeDownPayment) ? project.downPayment : 0;

        let solarAmount = solarCost - solarRebate - downPayment;

        Logger.log(`Calculated Solar amount: ${solarAmount}`)
        return solarAmount;
    }

    //Only Roof + Battery part of the loan
    static costRB (projectDetails: ProjectDetails): number {
        let project = projectDetails.projectData;

        let batteryCost = project?.batteryCost || 0;
        let batteryRebate = (project?.batteryRebate?.amount > 0 && !project?.batteryRebate?.paidToHomeowner) ? project?.batteryRebate?.amount : 0;
        let batteryLoanAmount = (batteryCost > 0) ? batteryCost - batteryRebate : 0;
        let roofCost = project?.roofCost || 0;

        let costRB = batteryLoanAmount + roofCost;
        
        Logger.log(`Calculated amount of R&B: ${costRB}.`)
        return costRB;
    }

    static grossCostPerSize (projectDetails: ProjectDetails): number {
        let project = projectDetails.projectData;
        if (!project.solarCost) return 0;
        if (project.solarCost && !project.solarSize) throw "solarSize is required in testing data";

        let solarAmount = Calculate.costSolar(projectDetails);
        let solarSize = project.solarSize;

        let grossCostPerSize = solarAmount/solarSize;
        
        Logger.log(`Calculated gross cost per 1 kW: ${grossCostPerSize}.`)
        return grossCostPerSize;
    }

}



class Is extends ProjectUtils {

    static havingBattery (projectData: ProjectDetails["projectData"]): boolean {
        return (projectData.solarCost > 0 && projectData.batteryCost) > 0;
    }

    static havingRoof (projectData: ProjectDetails["projectData"]): boolean {
        return (projectData.solarCost > 0 && projectData.roofCost > 0);
    }

    static batteryOnly (projectData: ProjectDetails["projectData"]): boolean {
        return (!projectData.solarCost && projectData.batteryCost > 0);
    }

    static roofAvailable (projectData: ProjectDetails["projectData"]): boolean {
        let eligibleForRoofMountingLocation = projectDefault.solarMountingLocation[0];
        return eligibleForRoofMountingLocation.includes(projectData.solarMountingLocation);
    }

}



export { Utils, Calculate, ProjectUtils, Is };