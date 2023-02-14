import { ExampleCases } from "../../types/test-cases";



const exampleProject: ExampleCases = {   
    solar: {
        id: 0,
        desc: "Example of a solar project",
        projectDetails: {
            PII: {
                firstName: "STEVE",
                lastName: "MICHAEL",
                email: "cypress_sungage@email.ghostinspector.com",
                street: "63101 ALDERTON ST # 2",
                city: "FLUSHING",
                state: "NY",
                ZIP: 11374
            },
            projectData: {
                solarCost: 30000,
                solarSize: 20
            },
            loanData: {
                term: 10
            }
        }
    },
    battery: {
        id: 1,
        desc: "Example of a battery project",
        projectDetails: {
            projectData: {
                batteryCost: 30000,
                batterySize: 20
            },
            loanData: {
                term: 10
            }
        }
    },
    solarPlus: {
        id: 2,
        desc: "Example of a full solar+ project",
        projectDetails: {
            projectData: {
                solarCost: 30000,
                solarSize: 20,
                solarRebate: {
                    amount: 1000,
                    paidToHomeowner: false
                },
                solarMountingLocation: "Roof of Residence",
                downPayment: 500,
                batteryCost: 10000,
                batterySize: 20,
                batteryRebate: {
                    amount: 800,
                    paidToHomeowner: false
                },
                roofCost: 5000
            },
            loanData: {
                term: 10,
                dppType: "None",
                itc: 30,
                // customDppPortion: "",
                // rate: 3.99
            }
        }
    }
    


}

export default exampleProject;