import Logger from './logger';
import StateUtils from '../helpers/state-utils';



class ErrorName extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
    }
}

class ElementNotFoundError extends ErrorName {
    constructor (locator: string) {
        let message = `Element not found. Check that locator is correct and element is actually exists on the page or correct page is visited. 
            \nLocator: ${locator}
            \nURL: ${StateUtils.getCurrentURL}`
        super(message)
    }
}

class LocatorError extends ErrorName {
    constructor(locator: string) {
        super(`Locator is not set for the method. Locator: ${locator}`);
        // this.locator = locator;
        
    }

}

class VariableError extends ErrorName {
    constructor (variable: any, message: string) {
        super(`Variable provided to the method is ${variable}. ${message}`)
    }
}

export { ElementNotFoundError, LocatorError, VariableError };