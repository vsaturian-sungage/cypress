import Validator from './validator';



const typeDelay = 100

type Input = string | number;



class DOMHelper { 
    static getElementById (input: Input, node = "input") {
        return cy.xpath(`//${node}[contains(@id, "${input}")]`);
    }

    static getElementByInnerValue (input: Input, node = "input") {
        return cy.xpath(`(//${node}[contains(@value, "${input}")])[1]`);
    }

    static getElementsText (elementLocator: string, invoke = 'text') {
        Validator.elementLocator(elementLocator);
        if (invoke !== 'text') {
            return cy.xpath(elementLocator).invoke('attr', invoke);
        }
        return cy.xpath(elementLocator).invoke(invoke);
    }

    static clickOn (elementLocator: string) {
        Validator.elementLocator(elementLocator);
        cy.xpath(`(${elementLocator})[1]`).click();
    }

    static forceClickOn (elementLocator: string) {
        Validator.elementLocator(elementLocator);
        cy.xpath(`(${elementLocator})[1]`).click({force: true}) ;
    }

    static typeInto = {
        fieldByLocator (elementLocator: string, value: Input) {
            Validator.elementLocator(elementLocator);
            cy.xpath(`(${elementLocator})[1]`).type(`{backspace}${value}`, {delay: typeDelay});
        },

        followingSibling (value: Input, inputElement: string) {
            cy.xpath(`(//div[contains(*, "${inputElement}")]/following-sibling::div//input)[1]`).type(`{backspace}${value}`, {delay: typeDelay});
        },

        inputHavingAttribute (value: Input, inputElement: string) {
            cy.xpath(`(//input[attribute::*[contains(., "${inputElement}")]])[1]`).type(`{backspace}${value}`, {delay: typeDelay});
        }
    }
}

export default DOMHelper;