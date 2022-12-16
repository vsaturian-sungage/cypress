class Logger {

    static logWithURL (message: string) {
        cy.url().then((url) => {
            cy.log(`URL: ${url}; message: ${message}`)
            console.log(`URL: ${url}; message: ${message}`)
        })
    }

    static logWithArguments (expected: any, actual: any, message?: string) {
        if (actual == null) {
            actual = "[Error: Value for the log is set incorrectly]";
        } else if (typeof actual == "object" && actual != null) {
            actual = JSON.stringify(actual);
        }
        cy.log(`${message ? message + '.' : ''} **Expected Value**: ${expected}; **Actual Value**: ${actual}`)
        console.log(`${message ? message + '.' : ''} \n**Expected Value**: ${expected}; **Actual Value**: ${actual}`)
    }

}

export default Logger;