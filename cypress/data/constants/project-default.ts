export const projectDefault = {
    dppType: "One Tax Season",
    dppType_api: "June",
    loanAmount: {
        min: 7500,
        max: 200000,
        maxBatteryOnly: 50000
    },
    itc: 30,
    solarSize: {
        min: 0.01,
        max: 100,
    },
    batterySize: {
        min: 1.1,
        max: 75
    },
    grossCostPerSize: {
        min: 1,
        max: 15
    },
    solarMountingLocation: ["Roof of Residence", "Ground Mount", "Roof of a separate structure on the property"],
    someCost: 30000,
    someSize: 20 
}

export const stateDppPortionMap = new Map([
    ['AZ', 1000], 
    ['MA', 1000], 
    ['NM', 6000],
    ['NY', 5000],
    ['OR', 1500],
    ['SC', 3500],
    ['UT', 400]
]);