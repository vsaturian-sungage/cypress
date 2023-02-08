import * as CustomError from '../../core/logger/error-handler'
import Validator from './validator';



const typeDelay = 100

type Locator = string;
type Node = string;
type Input = string | number;



class DOMHelper { //DOMHelper
    
    static getElementById (input: Input, node = "input") {
        return cy.xpath(`//${node}[contains(@id, "${input}")]`);
    }

    static getElementByInnerValue (input: Input, node = "input") {
        return cy.xpath(`(//${node}[contains(@value, "${input}")])[1]`);
    }

    static getElementsText (elementLocator: Locator, invoke = 'text') {
        Validator.elementLocator(elementLocator);
        if (invoke !== 'text') {
            return cy.xpath(elementLocator).invoke('attr', invoke);
        }
        return cy.xpath(elementLocator).invoke(invoke);
    }

    static clickOn (elementLocator: Locator) {
        Validator.elementLocator(elementLocator);
        cy.xpath(`(${elementLocator})[1]`).click();
    }

    static forceClickOn (elementLocator: Locator) {
        Validator.elementLocator(elementLocator);
        cy.xpath(`(${elementLocator})[1]`).click({force: true}) ;
    }

    static typeInto = {

        fieldByLocator (elementLocator: Locator, value: Input) {
            Validator.elementLocator(elementLocator);
            cy.xpath(`(${elementLocator})[1]`).type(`{backspace}${value}`, {delay: typeDelay});
        },

        followingSibling (value: Input, inputElement: Node) {
            cy.xpath(`(//div[contains(*, "${inputElement}")]/following-sibling::div//input)[1]`).type(`{backspace}${value}`, {delay: typeDelay});
        },

        inputHavingAttribute (value: Input, inputElement: Node) {
            cy.xpath(`(//input[attribute::*[contains(., "${inputElement}")]])[1]`).type(`{backspace}${value}`, {delay: typeDelay});
        }

    }
}

export default DOMHelper;