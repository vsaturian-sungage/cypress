import CoreUtils from "../helpers/utility"


const LogType = {
    INFO: '🥦 INFO',
    WARNING: '🍋 WARN',
    ERROR: '🍅 ERROR'
}

class Logger {

    //Logs

    static log (message: string, name?: string) {
        CoreUtils.synchronizeWithCypress(() => {
            Cypress.log({
                displayName: `${LogType.INFO}: ${name ? name : 'Log message'}`,
                message: message,
                consoleProps: () => {
                    return {
                        Message: message
                    }
                }
            })
        }) 
    }

    static logWithURL (message?: string) {
        cy.url().then((url) => {
            Cypress.log({
                displayName: `${LogType.INFO}: Current URL`,
                message: `URL: ${url}; ${message ? `message: ${message}` : ''}`,
                consoleProps: () => {
                    return {
                        URL: url,
                        Message: message || undefined
                    }
                }
            })
        })
    }

    static logWithResults (expected: any, actual: any, message?: string) {
        if (actual == null) {
            actual = "[Error: Value for the log is set incorrectly]";
        } else if (typeof actual == "object" && actual != null) {
            actual = JSON.stringify(actual);
        }

        Cypress.log({

            displayName: `${LogType.INFO}: Results Comparison`,
            message: `${message ? message + '.' : ''} **Expected Value**: ${expected}; **Actual Value**: ${actual}`,
            consoleProps: () => {
                return {
                    ExpectedResult: expected,
                    ActualResult: actual,
                    Message: message || undefined
                }
            }

        })
        
    }



    //Warnings
    static warn (message: any) {
        cy.then(() => {
            Cypress.log({
                displayName: `${LogType.WARNING}: Warn message`,
                message: message,
                consoleProps: () => {
                    return {
                        Message: message
                    }
                }
            })
        })
    } 



    //Errors

}

export default Logger;