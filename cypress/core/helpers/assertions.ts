import DOMHelper from "./element-actions";
import Validator from "./validator";
import Logger from "../logger/logger";

class Assert {

    static equalValues (elementLocator: string, expectedValue: any, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(elementValue => {
            if (typeof expectedValue === "number") {
                elementValue = Validator.cleanseVariable(elementValue, true);
                Logger.logWithResults(expectedValue, elementValue, `Expected value is equal to actual value`)
                expect(Number(elementValue)).to.eql(Number(expectedValue));
            } else {
                elementValue = Validator.cleanseVariable(elementValue);
                Logger.logWithResults(expectedValue, elementValue, `Expected value is equal to actual value`)
                expect(elementValue).to.eql(expectedValue);
            }
        })
    }

    static includeValue (elementLocator: string, expectedValue: any, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(elementValue => {
            Logger.logWithResults(expectedValue, elementValue, `Expected value is included in actual value`)
            elementValue = Validator.cleanseVariable(elementValue);
            if (typeof expectedValue === "number") {
                expect(Number(elementValue)).to.include(Number(expectedValue));
            } else {
                expect(elementValue).to.include(expectedValue);
            }
            
        })
    }

    static greaterThanZero (elementLocator: string, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(elementValue => {
            Logger.logWithResults("Greater than 0", elementValue, "Actual value is greater than zero")
            elementValue = Validator.cleanseVariable(elementValue, true);
            expect(Number(elementValue)).to.be.above(0); 
        })
    }

}

export default Assert;