export type dppType = "None" | 18 | "18" | "One Tax Season" | "June";
export type solarMountingLocation = "Roof of Residence" | "Ground Mount" | "Roof of a separate structure on the property";
export type term = 5 | 10 | 15 | 20 | 25;
export type itc = 22 | 26 | 30;

export type PII = {
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    ZIP: string | number,
    state: string
    Spanish?: boolean
}

export type ProjectData = {
    solarCost?: number,
    solarSize?: number,
    solarRebate?: {
        amount: number,
        paidToHomeowner?: boolean
    },
    solarMountingLocation?: solarMountingLocation,

    downPayment?: number,

    batteryCost?: number,
    batterySize?: number,
    batteryRebate?: {
        amount: number,
        paidToHomeowner?: boolean
    }

    roofCost?: number
}

export type loanData = {
    term?: term,
    rate?: string | number,
    dppType?: dppType,
    itc?: itc,
    customDppPortion?: string | number
}

export interface ProjectDetails {
    loanType?: "Solar" | "Battery",
    PII?: PII,
    projectData?: ProjectData,
    loanData?: loanData
}