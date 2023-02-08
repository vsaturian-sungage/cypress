import { projectDefault } from "../../constants/projectDefault";
import { TestCases } from "../../types/test-cases";


const testCases: TestCases = {
    emptyFields: [
        {
            id: 1,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "",
                    "lastName": "z",
                    "email": "A@z.aZ",
                    "street": "1",
                    "city": "0",
                    "state": "CA",
                    "ZIP": "92501"
                }
            }
        },
        {
            id: 2,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "a",
                    "lastName": "",
                    "email": "A@z.aZ",
                    "street": "1",
                    "city": "0",
                    "state": "CA",
                    "ZIP": "92501"
                }
            }
        },
        {
            id: 3,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "a",
                    "lastName": "z",
                    "email": "",
                    "street": "1",
                    "city": "0",
                    "state": "CA",
                    "ZIP": "92501"
                }
            }
        },
        {
            id: 4,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "a",
                    "lastName": "z",
                    "email": "A@z.aZ",
                    "street": "",
                    "city": "0",
                    "state": "CA",
                    "ZIP": "92501"
                }
            }
        },
        {
            id: 5,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "a",
                    "lastName": "z",
                    "email": "A@z.aZ",
                    "street": "1",
                    "city": "",
                    "state": "CA",
                    "ZIP": "92501"
                }
            }
        },
        {
            id: 6,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "a",
                    "lastName": "z",
                    "email": "A@z.aZ",
                    "street": "1",
                    "city": "0",
                    "state": "",
                    "ZIP": "92501"
                }
            }
        },
        {
            id: 7,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "a",
                    "lastName": "z",
                    "email": "A@z.aZ",
                    "street": "1",
                    "city": "0",
                    "state": "CA",
                    "ZIP": ""
                }
            }
        },
        {
            id: 8,
            desc: "Empty fields",
            projectDetails: {
                PII: {
                    "firstName": "",
                    "lastName": "",
                    "email": "",
                    "street": "",
                    "city": "",
                    "state": "",
                    "ZIP": ""
                }
            }
        },
        {
            id: 9,
            desc: "Empty fields",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.someCost,
                    "solarSize": null
                }
            }
        },
        {
            id: 10,
            desc: "Empty fields",
            projectDetails: {
                projectData: {
                    "solarCost": null,
                    "solarSize": projectDefault.someSize
                }
            }
        },
        {
            id: 11,
            desc: "Empty fields",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.someCost,
                    "solarSize": projectDefault.someSize,
                    "batteryCost": projectDefault.someCost,
                    "batterySize": null
                }
            }
        },
        {
            id: 12,
            desc: "Empty fields",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.someCost,
                    "solarSize": projectDefault.someSize,
                    "batteryCost": null,
                    "batterySize": projectDefault.someSize
                }
            }
        },
        {
            id: 13,
            desc: "Empty fields",
            projectDetails: {
                projectData: {
                    "batteryCost": projectDefault.someCost,
                    "batterySize": null
                }
            }
        },
        {
            id: 14,
            desc: "Empty fields",
            projectDetails: {
                projectData: {
                    "batteryCost": null,
                    "batterySize": projectDefault.someSize
                }
            }
        },
    ],



    validationsProjectDetails: [
        

        {
            id: 1,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.min_loanAmount - 0.01,
                    "solarSize": projectDefault.min_solarSize
                }
            }
        },
        {
            id: 2,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.min_loanAmount,
                    "solarSize": projectDefault.min_solarSize,
                    "solarRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 3,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.min_loanAmount,
                    "solarSize": projectDefault.min_solarSize,
                    "downPayment": 0.01
                }
            }
        },
        {
            id: 4,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.min_loanAmount + 0.01,
                    "solarSize": projectDefault.min_solarSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 5,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": 4500.02,
                    "solarSize": projectDefault.min_solarSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    },
                    "batteryCost": 2999.99,
                    "batterySize": projectDefault.min_batterySize
                }
            }
        },
        {
            id: 6,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": 4500.02,
                    "solarSize": projectDefault.min_solarSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    },
                    "batteryCost": 3000,
                    "batterySize": projectDefault.min_batterySize,
                    "batteryRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 7,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": 4500.02,
                    "solarSize": projectDefault.min_solarSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    },
                    "batteryCost": 2999,
                    "batterySize": projectDefault.min_batterySize,
                    "batteryRebate": {
                        "amount": 0.01
                    },
                    "roofCost": 1
                }
            }
        },
        {
            id: 8,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "downPayment": 0.01,
                    "batteryCost": projectDefault.min_loanAmount + 0.01,
                    "batterySize": projectDefault.min_batterySize,
                    "batteryRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 9,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "batteryCost": projectDefault.min_loanAmount,
                    "batterySize": projectDefault.min_batterySize,
                    "batteryRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 10,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "downPayment": 0.01,
                    "batteryCost": projectDefault.min_loanAmount,
                    "batterySize": projectDefault.min_batterySize
                }
            }
        },
        {
            id: 11,
            desc: "Low loan amount",
            projectDetails: {
                projectData: {
                    "batteryCost": projectDefault.min_loanAmount - 0.01,
                    "batterySize": projectDefault.min_batterySize
                }
            }
        },

        {
            id: 12,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.max_loanAmount + 0.01,
                    "solarSize": projectDefault.someSize
                }
            }
        },
        {
            id: 13,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.max_loanAmount,
                    "solarSize": projectDefault.someSize,
                    "downPayment": 0.01
                }
            }
        },
        {
            id: 14,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.max_loanAmount,
                    "solarSize": projectDefault.someSize,
                    "solarRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 15,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": projectDefault.max_loanAmount + 0.01,
                    "solarSize": projectDefault.someSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 16,
            desc: "High loan amount",
            projectDetails: {
                "projectData": {
                    "solarCost": 120000.01,
                    "solarSize": projectDefault.someSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    },
                    "batteryCost": 80000,
                    "batterySize": projectDefault.someSize
                }
            }
        },
        {
            id: 17,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": 100000.01,
                    "solarSize": projectDefault.someSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    },
                    "batteryCost": 100000.01,
                    "batterySize": projectDefault.someSize,
                    "batteryRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 18,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "solarCost": 120000.01,
                    "solarSize": projectDefault.someSize,
                    "downPayment": 0.01,
                    "solarRebate": {
                        "amount": 0.01
                    },
                    "batteryCost": 75000.01,
                    "batterySize": projectDefault.someSize,
                    "batteryRebate": {
                        "amount": 0.01
                    },
                    "roofCost": 5000
                }
            }
        },
        {
            id: 19,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "downPayment": 0.01,
                    "batteryCost": projectDefault.max_loanAmount_batteryOnly + 0.01,
                    "batterySize": projectDefault.someSize,
                    "batteryRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 20,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "batteryCost": projectDefault.max_loanAmount_batteryOnly,
                    "batterySize": projectDefault.someSize,
                    "batteryRebate": {
                        "amount": 0.01
                    }
                }
            }
        },
        {
            id: 21,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "downPayment": 0.01,
                    "batteryCost": projectDefault.max_loanAmount_batteryOnly,
                    "batterySize": projectDefault.someSize
                }
            }
        },
        {
            id: 22,
            desc: "High loan amount",
            projectDetails: {
                projectData: {
                    "batteryCost": projectDefault.max_loanAmount_batteryOnly + 0.1,
                    "batterySize": projectDefault.someSize
                }
            }
        },

        {
            id: 23,
            desc: "Invalid kW size",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.max_solarSize + 0.01,
                    batteryCost: projectDefault.someCost,
                    batterySize: projectDefault.min_batterySize - 0.01
                }
            }
        },
        {
            id: 24,
            desc: "Invalid kW size",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount,
                    solarSize: projectDefault.min_solarSize,
                    batteryCost: projectDefault.min_loanAmount,
                    batterySize: projectDefault.max_batterySize + 0.01
                }
            }
        },
        {
            id: 25,
            desc: "Invalid kW size",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.min_loanAmount,
                    solarSize: projectDefault.min_solarSize - 0.01
                }
            }
        },
        {
            id: 26,
            desc: "Invalid kW size",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.max_solarSize + 0.01,
                }
            }
        },
        {
            id: 27,
            desc: "Invalid kW size",
            projectDetails: {
                projectData: {
                    batteryCost: projectDefault.someCost,
                    batterySize: projectDefault.min_batterySize - 0.01
                }
            }
        },
        {
            id: 28,
            desc: "Invalid kW size",
            projectDetails: {
                projectData: {
                    batteryCost: projectDefault.someCost,
                    batterySize: projectDefault.max_batterySize + 0.01
                }
            }
        },

        {
            id: 29,
            desc: "R&B cost exceeds 50% cost of the loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.someSize,
                    batteryCost: projectDefault.someCost + 0.01,
                    batterySize: projectDefault.someSize
                }
            }
        },
        {
            id: 30,
            desc: "R&B cost exceeds 50% cost of the loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.someSize,
                    roofCost: projectDefault.someCost + 0.01
                }
            }
        },
        {
            id: 31,
            desc: "R&B cost exceeds 50% cost of the loan amount",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.someSize,
                    batteryCost: projectDefault.someCost/2,
                    batterySize: projectDefault.someSize,
                    roofCost: projectDefault.someCost/2 + 0.01
                }
            }
        },

        {
            id: 32,
            desc: "Unavailable roof for different mounting locations",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.someSize,
                    solarMountingLocation: "Ground Mount",
                    roofCost: projectDefault.someCost
                }
            }
        },
        {
            id: 33,
            desc: "Unavailable roof for different mounting locations",
            projectDetails: {
                projectData: {
                    solarCost: projectDefault.someCost,
                    solarSize: projectDefault.someSize,
                    solarMountingLocation: "Roof of a separate structure on the property",
                    roofCost: projectDefault.someCost
                }
            }
        },

        {
            id: 34,
            desc: "Gross cost per 1 kW is too high",
            projectDetails: {
                projectData: {
                    solarCost: 15000.01,
                    solarSize: 1
                }
            }
        },
        {
            id: 35,
            desc: "Gross cost per 1 kW is too high",
            projectDetails: {
                projectData: {
                    solarCost: 15000.01,
                    solarSize: 1,
                    batteryCost: 5000,
                    batterySize: projectDefault.min_batterySize,
                    roofCost: 5000
                }
            }
        },

        {
            id: 36,
            desc: "Gross cost per 1 kW is too low",
            projectDetails: {
                projectData: {
                    solarCost: 10000,
                    solarSize: 10.01
                }
            }
        },
        {
            id: 37,
            desc: "Gross cost per 1 kW is too low",
            projectDetails: {
                projectData: {
                    solarCost: 10000,
                    solarSize: 10.01,
                    batteryCost: 5000,
                    batterySize: projectDefault.min_batterySize,
                    roofCost: 5000
                }
            }
        },

        


    ]
}

export default testCases;