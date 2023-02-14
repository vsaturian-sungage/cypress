import CoreUtils from "../helpers/utility";


const LogLevel = {
    INFO: '🥦 INFO',
    ACCENTED: '🍆 INFO',
    WARNING: '🍋 WARN',
    ERROR: '🍅 ERROR'
}

class Logger {
    static log (message: string, name?: string) {
        CoreUtils.synchronizeWithCypress(() => {
            Cypress.log({
                displayName: `${LogLevel.INFO}: ${name ? name : 'Log message'}`,
                message: message,
                consoleProps: () => {
                    return {
                        Message: message
                    }
                }
            })
        }) 
    }

    static logAccented (message: string, name?: string) {
        CoreUtils.synchronizeWithCypress(() => {
            Cypress.log({
                displayName: `${LogLevel.ACCENTED}: ${name ? name : 'Log message'}`,
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
                displayName: `${LogLevel.INFO}: Current URL`,
                message: `URL: ${url}. ${message ? `\nmessage: ${message}` : ''}`,
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
            displayName: `${LogLevel.INFO}: Results Comparison`,
            message: `${message ? `${message}.\n` : ''} **Expected Value**: ${expected} \n**Actual Value**: ${actual}`,
            consoleProps: () => {
                return {
                    ExpectedResult: expected,
                    ActualResult: actual,
                    Message: message || undefined
                }
            }
        })
    }



    static warn (message: any) {
        CoreUtils.synchronizeWithCypress(() => {
            Cypress.log({
                displayName: `${LogLevel.WARNING}: Warn message`,
                message: message,
                consoleProps: () => {
                    return {
                        Message: message
                    }
                }
            })
        })
    } 
}

export default Logger;