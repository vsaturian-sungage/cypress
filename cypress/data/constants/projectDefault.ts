export const projectDefault = {
    dppType: "One Tax Season",
    dppType_api: "June",
    minimum_loanAmount: 7500,
    maximum_loanAmount: 200000,
    maximum_loanAmount_batteryOnly: 50000,
    itc: 30,
    minimum_solarSize: 1,
    maximum_solarSilze: 100,
    minimum_batterySize: 1.1,
    maximum_batterySilze: 75,

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