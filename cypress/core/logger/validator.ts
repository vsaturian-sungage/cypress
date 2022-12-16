import * as CustomError from './error-handler'

class Validator {

    static elementLocator (elementLocator: string) {
        if (!elementLocator || elementLocator == "//") {
            throw new CustomError.LocatorError(elementLocator);
        }

        // cy.on('fail', () => {
        //     throw new CustomError.ElementNotFoundError(elementLocator);
        // })
    }

    static cleanseVariable (variable) {
        return variable.replace(',', '').replace('$', '').replace(' ', '')
    }

}

export default Validator