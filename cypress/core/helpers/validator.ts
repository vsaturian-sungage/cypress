import * as CustomError from '../logger/error-handler';

class Validator {
    static elementLocator (elementLocator: string) {
        if (!elementLocator || elementLocator == "//" || elementLocator == "/") {
            throw new CustomError.LocatorError(elementLocator);
        }
    }

    static cleanse (variable: any) {
        if (typeof variable == "string") {
            return variable.replace(',', '').replace('$', '').replace(' ', '');
        } else {
            return variable;
        }
    }

    static cleanseVariable (variable: any, expectNumber: boolean = false) {
        let cleansedVariable = this.cleanse(variable);
        if (expectNumber && isNaN(Number(cleansedVariable))) {
            throw new CustomError.CleanseVariableError(variable);
        }
        return cleansedVariable;
    }

    static cleanseObject (object: Object) {
        Object.keys(object).forEach((key) => {
            object[key] = this.cleanse(object[key]);
        })
    }

    static cleanseArray (array: Array<string | number>) {
        array.forEach((key, index) => {
            array[index] = this.cleanse(key);
        });
    }
}

export default Validator