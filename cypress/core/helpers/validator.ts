import * as CustomError from '../logger/error-handler'

class Validator {
    
    static elementLocator (elementLocator: string) {
        if (!elementLocator || elementLocator == "//") {
            throw new CustomError.LocatorError(elementLocator);
        }
    }

    static cleanse (variable: any) {
        return variable.replace(',', '').replace('$', '').replace(' ', '');
    }

    static cleanseVariable (variable: any, expectNumber: boolean = false) {
    //    let cleansedVariable = variable.replace(',', '').replace('$', '').replace(' ', '');
        let cleansedVariable = this.cleanse(variable);
        if (expectNumber === true && isNaN(Number(cleansedVariable))) {
            throw new CustomError.CleanseVariableError(variable, Number(cleansedVariable));
        }
        return cleansedVariable;
    }

    static cleanseObject (object: Object) {
        Object.keys(object).forEach((key) => {
        //    object[key] = object[key].replace(',', '').replace('$', '').replace(' ', '');
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