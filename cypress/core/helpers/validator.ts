import * as CustomError from '../logger/error-handler'

class Validator {

    static elementLocator (elementLocator: string) {
        if (!elementLocator || elementLocator == "//") {
            throw new CustomError.LocatorError(elementLocator);
        }
    }

    static cleanseVariable (variable: any, expectNumber: boolean = false) {
        let cleansedVariable = variable.replace(',', '').replace('$', '').replace(' ', '');
        if (expectNumber === true && isNaN(Number(cleansedVariable))) {
            throw new CustomError.CleanseVariableError(variable, Number(cleansedVariable));
        }
        return cleansedVariable;
    }

    static cleanseObject (object: Object) {
        Object.keys(object).forEach((key) => {
            object[key] = object[key].replace(',', '').replace('$', '').replace(' ', '');
        })
    }

}

export default Validator