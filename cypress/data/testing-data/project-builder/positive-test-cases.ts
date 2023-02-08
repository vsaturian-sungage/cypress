import { projectDefault } from "../../constants/projectDefault";
import { TestCases } from "../../types/test-cases";


const testCases: TestCases = {
    simple: [
        {
            id: 1,
            desc: "Minimal values",
            projectDetails: {
                loanData: {
                    term: 10
                }

            }
        }
    ],
    
    onlyPII: [
        {
            id: 1,
            desc: "Minimal values",
            projectDetails: {
                PII: {
                    firstName: "a",
                    lastName: "z",
                    email: "A@z.aZ",
                    street: "1",
                    city: "0",
                    state: "CA",
                    ZIP: "92501",
                    Spanish: true
                }

            }
        },
        {
            id: 2,
            desc: "Maximum values",
            projectDetails: {
                PII: {
                    firstName: "Larem ipsum dolor456",
                    lastName: "Lbrem ipsum dolor123",
                    email: "Lcremi$psumdolorsitassssmetconsectetureffi@citur.ds",
                    street: "Lvrem i$psum dolor sit a&met, consectetur efficitur.",
                    city: "Lrrem i$psum dolor sit a&met, consectetur efficitur.",
                    state: "CA",
                    ZIP: "92501",
                    Spanish: false
                } 
            }   
        }
    ],

    onlyProjectData: [
        {
            id: 1,
            desc: "Solar only - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount,
                    solarSize: projectDefault.min_loanAmount / (projectDefault.min_grossCostPerSize*1000),
                    solarMountingLocation: "Roof of Residence"
                }
            }
        },
        {
            id: 2,
            desc: "Solar only - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount + 1,
                    solarSize: projectDefault.min_loanAmount / (projectDefault.max_grossCostPerSize*1000),
                    downPayment: 1,
                    solarMountingLocation: "Ground Mount"
                }
            }
        },
        {
            id: 3,
            desc: "Solar only - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount + 1,
                    solarSize: projectDefault.min_loanAmount / (projectDefault.min_grossCostPerSize*1000),
                    solarRebate: {
                        amount: 1
                    },
                    solarMountingLocation: "Roof of a separate structure on the property"
                }
            }
        },
        {
            id: 4,
            desc: "Solar only - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount + 1,
                    solarSize: projectDefault.min_loanAmount / (projectDefault.max_grossCostPerSize*1000),
                    downPayment: 0.5,
                    solarRebate: {
                        amount: 0.5
                    }
                }
            }
        },

        {
            id: 5,
            desc: "Solar only - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.max_loanAmount,
                    solarSize: projectDefault.max_loanAmount / (projectDefault.min_grossCostPerSize*1000),
                    solarMountingLocation: "Roof of Residence"
                }
            }
        },
        {
            id: 6,
            desc: "Solar only - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.max_loanAmount + 50000,
                    solarSize: 100,
                    downPayment: 50000,
                    solarMountingLocation: "Ground Mount"
                }
            }
        },
        {
            id: 7,
            desc: "Solar only - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.max_loanAmount + 50000,
                    solarSize: 100,
                    solarRebate: {
                        amount: 50000
                    },
                    solarMountingLocation: "Roof of a separate structure on the property"
                }
            }
        },
        {
            id: 8,
            desc: "Solar only - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.max_loanAmount + 100000,
                    solarSize: 100,
                    solarRebate: {
                        amount: 50000
                    },
                    downPayment: 50000
                }
            }
        },



        {
            id: 9,
            desc: "Solar+Battery - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount/2,
                    solarSize: 1,
                    batteryCost: projectDefault.min_loanAmount/2,
                    batterySize: projectDefault.max_batterySize
                }
            }
        },
        {
            id: 10,
            desc: "Solar+Battery - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount/2,
                    solarSize: 1,
                    
                    batteryCost: projectDefault.min_loanAmount/2,
                    batterySize: projectDefault.max_batterySize
                }
            }
        },
    ],

    fullProjectData: [

    ]
    
}

export default testCases;