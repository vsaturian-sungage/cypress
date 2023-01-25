import DOMHelper from "./element-actions";
import Validator from "./validator";
import Logger from "../logger/logger";

class Assert {

    static equalValues (elementLocator: string, expectedValue: any, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(actualValue => {
            if (typeof expectedValue === "number") {
                actualValue = Validator.cleanseVariable(actualValue, true);
                Logger.logWithResults(expectedValue, actualValue, `Expected value is equal to actual value`);
                expect(Number(actualValue)).to.eql(Number(expectedValue));
            } else {
                actualValue = Validator.cleanseVariable(actualValue);
                Logger.logWithResults(expectedValue, actualValue, `Expected value is equal to actual value`);
                expect(actualValue).to.eql(expectedValue);
            }
        })
    }

    static includeValue (elementLocator: string, expectedValue: any, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(actualValue => {
            Logger.logWithResults(expectedValue, actualValue, `Expected value is included in actual value`);
            actualValue = Validator.cleanseVariable(actualValue);
            if (typeof expectedValue === "number") {
                expect(Number(actualValue)).to.include(Number(expectedValue));
            } else {
                expect(actualValue).to.include(expectedValue);
            }
            
        })
    }

    //Todo add logger showing expectedArray
    static includeArray (elementLocator: string, expectedArray: Array<string>, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(actualValue => {
            Logger.logWithResults(expectedArray, actualValue, `Expected array of elements is included in the actual value`)
            expectedArray.forEach((expectedValue, index) => {
                console.group('includeArray expanded method log');
                console.log(`Actual Value: ${actualValue}`);
                console.log(`Expected Value: ${expectedValue}.`)
                console.log(`Result: ${actualValue.includes(expectedValue)}`)
                console.log(`Index of the value: ${expectedArray[index]}`)
                console.groupEnd();
                expect(actualValue).to.include(expectedValue);
            });
        })
    }

    static greaterThanZero (elementLocator: string, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(actualValue => {
            Logger.logWithResults("Greater than 0", actualValue, "Actual value is greater than zero");
            actualValue = Validator.cleanseVariable(actualValue, true);
            expect(Number(actualValue)).to.be.above(0); 
        })
    }

}

export default Assert;