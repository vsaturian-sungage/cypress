import xpathLocator from '../../../data/locators/element-locators';
import DOMHelper from '../../../core/helpers/element-actions';

class InternalSalesforceSteps {
    
    static login_salesforce () {
        cy.visit(Cypress.env('url_internalSF'));
        cy.xpath(xpathLocator.salesforce.login_username)
            .type(Cypress.env('username'));
        cy.xpath(xpathLocator.salesforce.login_password)
            .type(Cypress.env('password'));
            DOMHelper.clickOn(xpathLocator.salesforce.loginButton);
    }

    static goToOpp (oppId: string) {
        cy.visit(`${Cypress.env('url_internalSF')}/${oppId}`);
    }

    static clickDeleteButton () {
        // Due to inability of Cypress to overcome confirms/alerts in this case we'll be using a workaround
        cy.get('input[value="Delete"]')
            .invoke('attr', 'onclick').then((attribute) => {
                let attributeSplit = attribute.split("'");
                let deleteURL = attributeSplit[5];
                cy.log(`URL: ${deleteURL}`);
                cy.visit(`${Cypress.env('url_internalSF')}/${deleteURL}`);
            }) 
    }

}

export { InternalSalesforceSteps }