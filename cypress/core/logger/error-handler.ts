import Validator from "../helpers/validator";


class ErrorName extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
    }
}

class ElementNotFoundError extends ErrorName {
    constructor (locator: string, additionalError?: any) {
        let message = `Element not found. Check that locator is correct and element is actually exists on the page or correct page is visited. 
            \nLocator: ${locator}`
        super(message + additionalError ? `\n\nError:\n${additionalError}`: '')
    }
}

class LocatorError extends ErrorName {
    constructor(locator: string) {
        super(`Locator is not set for the method. Locator: ${locator}`);
        // this.locator = locator;
        
    }

}

class VariableError extends ErrorName {
    constructor (variable: any, message: string, method?: string) {
        super(`${method ? `Function: ${method}\n` : ''}Variable provided to the method is ${variable}. \n${message}`)
    }
}

class CleanseVariableError extends ErrorName {
    constructor (variable: any) {
        super(`Variable is not cleansed properly. \n\nVariable type if converted into Number: ${Number(Validator.cleanse(variable))}.\nVariable value: ${variable}.\nVariable after cleansing:${Validator.cleanse(variable)}`)
    }
}

export { ElementNotFoundError, LocatorError, VariableError, CleanseVariableError };