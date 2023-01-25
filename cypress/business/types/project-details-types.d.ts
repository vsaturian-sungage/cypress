export type dppType = "None" | 18 | "18" | "One Tax Season";

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
        paidToHomeowner: boolean
    },
    solarMountingLocation?: string,

    downPayment?: number,

    batteryCost?: number,
    batterySize?: number,
    batteryRebate?: {
        amount: number,
        paidToHomeowner: boolean
    }

    roofCost?: number
}

export type loanData = {
    term?: number,
    rate?: string | number,
    // dppType?: dppType,
    dppType?: string | number,
    itc?: number,
    customDppPortion?: string | number
}

export interface ProjectDetails {
    PII: PII,
    projectData?: ProjectData,
    loanData?: loanData
}