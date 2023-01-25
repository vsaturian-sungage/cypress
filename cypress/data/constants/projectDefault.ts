export const projectDefault = {
    dppType: "One Tax Season",
    dppType_api: "June",
    min_loanAmount: 7500,
    max_loanAmount: 200000,
    max_loanAmount_batteryOnly: 50000,
    itc: 30,
    min_solarSize: 1,
    max_solarSize: 100,
    min_batterySize: 1.1,
    max_batterySize: 75,
    min_grossCostPerSize: 1,
    max_grossCostPerSize: 15,
    solarMountingLocation: ["Roof of Residence", "Ground Mount", "Roof of a separate structure on the property"]
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