import { projectDefault } from "../../constants/project-default";
import { TestCases } from "../../types/test-cases";


const testCases: TestCases = {
    
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
                    email: "Lcremippsumdolorsitassssmetconsectetureffi@citur.ds",
                    street: "L09vre mi$psumdolor sita&met,#cons ectetur efficitur1",
                    city: "Lrrem90 i$psum dolor sit a&met, consectetur efficitur2",
                    state: "CA",
                    ZIP: "92501",
                    Spanish: false
                } 
            }   
        }
    ],

    withProjectData: [
        {
            id: 1,
            desc: "Solar only - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min,
                    solarSize: projectDefault.loanAmount.min / (projectDefault.grossCostPerSize.min*1000),
                    solarMountingLocation: "Roof of Residence"
                }
            }
        },
        {
            id: 2,
            desc: "Solar only - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min + 1,
                    solarSize: Math.ceil((projectDefault.loanAmount.min + 1) / (projectDefault.grossCostPerSize.max*1000)),
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
                    solarCost: projectDefault.loanAmount.min + 1,
                    solarSize: projectDefault.loanAmount.min / (projectDefault.grossCostPerSize.min*1000),
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
                    solarCost: (projectDefault.loanAmount.min + 1),
                    solarSize: Math.ceil((projectDefault.loanAmount.min + 1) / (projectDefault.grossCostPerSize.max*1000)),
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
                    solarCost: projectDefault.loanAmount.max,
                    solarSize: projectDefault.solarSize.max,
                    solarMountingLocation: "Roof of Residence"
                }
            }
        },
        {
            id: 6,
            desc: "Solar only - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max + 50000,
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
                    solarCost: projectDefault.loanAmount.max + 50000,
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
                    solarCost: projectDefault.loanAmount.max + 100000,
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
                    solarCost: projectDefault.loanAmount.min/2,
                    solarSize: 1,
                    batteryCost: projectDefault.loanAmount.min/2,
                    batterySize: projectDefault.batterySize.max,
                    solarMountingLocation: "Roof of Residence"

                }
            }
        },
        {
            id: 10,
            desc: "Solar+Battery - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min/2 + 2000,
                    solarSize: 1,
                    solarRebate: {
                        amount: 1000
                    },
                    downPayment: 1000,
                    batteryCost: projectDefault.loanAmount.min/2 + 1000,
                    batterySize: projectDefault.batterySize.min,
                    batteryRebate: {
                        amount: 1000
                    },
                    solarMountingLocation: "Ground Mount"
                }
            }
        },
        {
            id: 11,
            desc: "Solar+Battery - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max/2,
                    solarSize: 50,
                    batteryCost: projectDefault.loanAmount.max/2,
                    batterySize: projectDefault.batterySize.min,
                    solarMountingLocation: "Roof of a separate structure on the property"
                }
            }
        },
        {
            id: 12,
            desc: "Solar+Battery - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max/2 + 100000,
                    solarSize: 50,
                    solarRebate: {
                        amount: 50000
                    },
                    downPayment: 50000,
                    batteryCost: projectDefault.loanAmount.max/2 + 50000,
                    batterySize: projectDefault.batterySize.max,
                    batteryRebate: {
                        amount: 50000
                    }
                }
            }
        },

        {
            id: 13,
            desc: "Solar+Roof - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max/2,
                    solarSize: 50,
                    roofCost: projectDefault.loanAmount.max/2
                }
            }
        },
        {
            id: 14,
            desc: "Solar+Roof - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max/2 + 100000,
                    solarSize: 50,
                    solarRebate: {
                        amount: 50000
                    },
                    downPayment: 50000,
                    roofCost: projectDefault.loanAmount.max/2
                }
            }
        },
        {
            id: 15,
            desc: "Solar+Roof - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min/2,
                    solarSize: 1,
                    roofCost: projectDefault.loanAmount.min/2
                }
            }
        },
        {
            id: 16,
            desc: "Solar+Roof - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min/2 + 2000,
                    solarSize: 1,
                    solarRebate: {
                        amount: 1000
                    },
                    downPayment: 1000,
                    roofCost: projectDefault.loanAmount.min/2
                }
            }
        },

        {
            id: 17,
            desc: "Solar+Battery+Roof - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min/2,
                    solarSize: 1,
                    batteryCost: projectDefault.loanAmount.min/4,
                    batterySize: projectDefault.batterySize.max,
                    roofCost: projectDefault.loanAmount.min/4
                }
            }
        },
        {
            id: 18,
            desc: "Solar+Battery+Roof - Low loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.min/2 + 2000,
                    solarRebate: {
                        amount: 1000
                    },
                    downPayment: 1000,
                    solarSize: 1,
                    batteryCost: projectDefault.loanAmount.min/4 + 1000,
                    batterySize: projectDefault.batterySize.max,
                    batteryRebate: {
                        amount: 1000
                    },
                    roofCost: projectDefault.loanAmount.min/4
                }
            }
        },
        {
            id: 19,
            desc: "Solar+Battery+Roof - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max/2,
                    solarSize: 50,
                    batteryCost: projectDefault.loanAmount.max/4,
                    batterySize: projectDefault.batterySize.max,
                    roofCost: projectDefault.loanAmount.max/4
                }
            }
        },
        {
            id: 20,
            desc: "Solar+Battery+Roof - High loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.loanAmount.max/2 + 100000,
                    solarRebate: {
                        amount: 50000
                    },
                    downPayment: 50000,
                    solarSize: 50,
                    batteryCost: projectDefault.loanAmount.max/4 + 50000,
                    batterySize: projectDefault.batterySize.min,
                    batteryRebate: {
                        amount: 50000
                    },
                    roofCost: projectDefault.loanAmount.max/4
                }
            }
        },

        {
            id: 21,
            desc: "Battery Only - Low loan amount",
            projectDetails: {
                projectData: {
                    batteryCost: projectDefault.loanAmount.min,
                    batterySize: projectDefault.batterySize.max
                }
            }
        },
        {
            id: 22,
            desc: "Battery Only - Low loan amount",
            projectDetails: {
                projectData: {
                    batteryCost: projectDefault.loanAmount.min + 100000,
                    downPayment: 50000,
                    batteryRebate: {
                        amount: 50000
                    },
                    batterySize: projectDefault.batterySize.min
                }
            }
        },
        {
            id: 23,
            desc: "Battery Only - High loan amount",
            projectDetails: {
                projectData: {
                    batteryCost: projectDefault.loanAmount.maxBatteryOnly,
                    batterySize: projectDefault.batterySize.min
                }
            }
        },
        {
            id: 24,
            desc: "Battery Only - High loan amount",
            projectDetails: {
                projectData: {
                    batteryCost: projectDefault.loanAmount.maxBatteryOnly + 100000,
                    downPayment: 50000,
                    batteryRebate: {
                        amount: 50000
                    },
                    batterySize: projectDefault.batterySize.max
                }
            }
        },
    ],

    fullProject: [
        {
            id: 1,
            desc: "Solar project with full data",
            projectDetails: {
                loanType: "Solar",
                loanData: {
                    term: 5,
                    dppType: "One Tax Season"
                }
            }
        },
        {
            id: 2,
            desc: "Solar project with full data",
            projectDetails: {
                loanType: "Solar+",
                loanData: {
                    term: 10,
                    dppType: "18"
                }
            }
        },
        {
            id: 3,
            desc: "Solar project with full data",
            projectDetails: {
                loanType: "Solar",
                loanData: {
                    term: 15,
                    dppType: "None"
                }
            }
        },
        {
            id: 4,
            desc: "Solar project with full data",
            projectDetails: {
                loanType: "Solar+",
                loanData: {
                    term: 20,
                    dppType: "None"
                }
            }
        },
        {
            id: 5,
            desc: "Solar project with full data",
            projectDetails: {
                loanType: "Solar",
                loanData: {
                    term: 25,
                    dppType: "18"
                }
            }
        },
        {
            id: 6,
            desc: "Solar project with full data",
            projectDetails: {
                loanType: "Solar+",
                loanData: {
                    term: 20,
                    dppType: "One Tax Season"
                }
            }
        },

        {
            id: 7,
            desc: "Battery project with full data",
            projectDetails: {
                loanType: "Battery",
                loanData: {
                    term: 5,
                    dppType: "One Tax Season"
                }
            }
        },
        {
            id: 8,
            desc: "Battery project with full data",
            projectDetails: {
                loanType: "Battery",
                loanData: {
                    term: 10,
                    dppType: "18"
                }
            }
        },
        {
            id: 9,
            desc: "Battery project with full data",
            projectDetails: {
                loanType: "Battery",
                loanData: {
                    term: 5,
                    dppType: "None"
                }
            }
        },
    ]
    
}

export default testCases;