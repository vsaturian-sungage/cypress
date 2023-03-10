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
            if (typeof expectedValue === "number") {
                actualValue = Validator.cleanseVariable(actualValue);
                expect(Number(actualValue)).to.include(Number(expectedValue));
            } else {
                expect(actualValue).to.include(expectedValue);
            }
        })
    }

    static includeArray (elementLocator: string, expectedArray: Array<string>, invoke?: string) {
        DOMHelper.getElementsText(elementLocator, invoke).then(actualValue => {
            expectedArray.forEach((expectedValue) => {
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

    static elementExists (elementLocator: string) {
        Validator.elementLocator(elementLocator);
        Logger.log(`Check if element exists and visible on this path: ${elementLocator}`, `Element exists`)
        return cy.xpath(elementLocator).should('be.visible');
    }

}

export default Assert;