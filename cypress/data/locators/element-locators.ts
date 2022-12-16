const xpathLocator = { 
    salesforce: {
        loginButton: '//input[@id="Login"]',
        login_username: '//input[@id="username"]',
        login_password: '//input[@id="password"]',
    },
    installerPortal: {
        loginButton: '//input[@type="submit"]',
        login_email: '//label[contains(text(), "Username")]/following-sibling::input',
        login_password: '//label[contains(text(), "Password")]/following-sibling::input',
        projectBuilder: {
            solarMountingLocationDropdown: '//*[@id="projectbuilder_System_mounting__c"]',
            solarMountingLocationValue (solarMountingLocation) {
                return `//li[contains(text(), "${solarMountingLocation}")]`
            },
            addBattery: '//button[contains(span, "Add Battery")]',
            addRoof: '//button[contains(span, "Add Roof")]',
            batteryLoanType: '//span[contains(text(), "Battery")]',
            term (loanTerm = 5) {
                return `//*[@id="${loanTerm}trmTopOutput"]//input`;
            },
            rateDropdown (loanTerm = 5) {
                return `//*[@id="${loanTerm}trmTopOutput"]/strong[contains(text(), "Interest Rate")]/following-sibling::div`;
            },
            rateValue (rate) {
                return `(//li[@role="option"])[contains(text(), "${rate}")]`;
            },
            dppTypeDropdown: '//*[@id="projectbuilder_Bridge_Loan_Term_D_I__c"]',
            dppTypeValue (dppType) {
                return `//li[contains(text(), "${dppType}")]`;
            },
            dppPortionDropdown: '//*[@id="projectbuilder_Zip_Portion_Amount__c"]',
            dppPortionDropdownValue (itc) {
                return `//li[contains(text(), "${itc}")]`
            },
            customDppPortion: '//*[@id="projectbuilder_Custom_Tax_Loan_Amount__c"]'
        },
        projectOverview: {
            email: '//p[contains(text(), "Email")]//a[text()]',
            fullName: '//h1/text()[1]',
            loanType: '//strong[contains(text(), "Financing Product")]/following-sibling::span',
            solarCost: '//strong[contains(text(), "Solar Cost")]/following-sibling::input[1]',
            solarSize: '//strong[contains(text(),"System Size")]/following-sibling::input[1]',
            downPayment: '//strong[contains(text(),"Down Payment")]/following-sibling::input[1]',
            solarRebateAmount: '//strong[contains(text(),"Solar Rebate")]/following-sibling::input[1]'
        }
    }
}

export default xpathLocator;