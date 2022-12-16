import DOMHelper from "./element-actions";
import Validator from "../logger/validator";
import Logger from "../logger/logger";

class Assert {

    static equalValues (elementLocator: string, expectedValue: any, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(elementValue => {
            elementValue = Validator.cleanseVariable(elementValue);
            Logger.logWithArguments(expectedValue, elementValue, `Expected value is equal to actual`)
            if (typeof expectedValue === "number") {
                expect(Number(elementValue)).to.eql(Number(expectedValue));
            } else {
                expect(elementValue).to.eql(expectedValue);
            }
        })
    }

    static includeValue (elementLocator: string, expectedValue: any, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(elementValue => {
            Logger.logWithArguments(expectedValue, elementValue, `Expected value is included in actual`)
            elementValue = Validator.cleanseVariable(elementValue);
            if (typeof expectedValue === "number") {
                expect(Number(elementValue)).to.include(Number(expectedValue));
            } else {
                expect(elementValue).to.include(expectedValue);
            }
            
        })
    }

}

export default Assert;