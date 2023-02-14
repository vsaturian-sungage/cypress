import Logger from "../../core/logger/logger";
import { projectDefault, stateDppPortionMap } from "../../data/constants/project-default";
import { OppAttributes } from "../types/opp-attributes-types";
import { ProjectDetails } from "../types/project-details-types";
import * as CustomError from '../../core/logger/error-handler';


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
        let dppType = loanData.dppType ? loanData.dppType : projectDefault.dppType_api;
        if (dppType == "One Tax Season") dppType = "June";
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

        let downPayment = project.downPayment || 0;
        let solarAmount = Calculate.costSolar(projectDetails, false);
        let RBAmount = Calculate.costRB(projectDetails);
        
        let loanAmount = solarAmount + RBAmount - downPayment;

        Logger.log(`Calculated loan amount. \nResult is ${loanAmount}`)
        return loanAmount;
    }

    static initialCost (projectDetails: ProjectDetails): number {
        let solarAmount = Calculate.costSolar(projectDetails, false);
        let batteryAmount = Calculate.costBattery(projectDetails);

        let initialCost = solarAmount + batteryAmount;
        Logger.log(`Calculated initial cost. \nResult is ${initialCost}`);
        return initialCost;
    }

    //Doesn't include logic for HO rebates, IL and HI specific calculations
    static dppPortion (projectDetails: ProjectDetails): number { 
        let dppType = this.getDppType(projectDetails.loanData);
        let dppPortion: number = 0;
        let itc = projectDetails.loanData?.itc ? projectDetails.loanData?.itc : projectDefault.itc;
        let customDppPortion = projectDetails.loanData.customDppPortion ? projectDetails.loanData.customDppPortion : 0;
        
        //Assign state DPP portion if state matches one of the states in the map
        let stateDppPortion: number = 0;
        stateDppPortionMap.forEach((value, key) => { 
            if (projectDetails.PII.state == key) {
                stateDppPortion = value;
            }
        });

        if (dppType === "None" || dppType === "0") {
            Logger.log(`Calculated expected DPP portion: ${dppPortion}.`);
            return dppPortion;
        } else if (customDppPortion) {
            Logger.log(`Calculated expected DPP portion: ${customDppPortion}.`);
            return Number(customDppPortion);
        } else {
            let initialCost = Calculate.initialCost(projectDetails);
            dppPortion = initialCost * itc/100 + (!Is.batteryOnly(projectDetails.projectData) ? stateDppPortion: 0);
            Logger.log(`Calculated expected DPP portion: ${dppPortion}.`);
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

        Logger.log(`Calculated Solar amount: ${solarAmount}`, 'Solar Loan Amount');
        return solarAmount;
    }

    static costBattery (projectDetails: ProjectDetails): number {
        let project = projectDetails.projectData;

        let batteryCost = project?.batteryCost || 0;
        let batteryRebate = (project?.batteryRebate?.amount > 0 && !project?.batteryRebate?.paidToHomeowner) ? project?.batteryRebate?.amount : 0;
        let batteryLoanAmount = (batteryCost > 0) ? batteryCost - batteryRebate : 0;

        Logger.log(`Calculated loan amount of Battery: ${batteryLoanAmount}.`, 'Battery Loan Amount');
        return batteryLoanAmount;
    }
    
    static costRB (projectDetails: ProjectDetails): number {
        let project = projectDetails.projectData;

        let batteryLoanAmount = this.costBattery(projectDetails);
        let roofCost = project?.roofCost || 0;

        let costRB = batteryLoanAmount + roofCost;
        
        Logger.log(`Calculated loan amount of R&B: ${costRB}.`, 'R&B Loan Amount');
        return costRB;
    }

    static grossCostPerSize (projectDetails: ProjectDetails): number {
        let project = projectDetails.projectData;
        if (!project.solarCost) return 0;
        if (project.solarCost && !project.solarSize) {
            throw new CustomError.VariableError(project.solarSize, 'solarSize is required in testing data', Calculate.grossCostPerSize.name);
        }

        let solarAmount = Calculate.costSolar(projectDetails);
        let solarSize = project.solarSize;

        let grossCostPerSize = solarAmount/(solarSize*1000);
        
        Logger.log(`Calculated gross cost per 1 kW: ${grossCostPerSize}.`, 'Gross Cost per 1 kW');
        return grossCostPerSize;
    }
}



class Is {
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