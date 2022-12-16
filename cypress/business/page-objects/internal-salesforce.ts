import { InternalSalesforceSteps } from '../steps/internal-salesforce/internal-salesforce-steps';

class InternalSalesforce {

    static deleteSavedOpp () {
        cy.fixture('oppAttributes').then(attributes => {
            let oppId = attributes.oppId
        //    InternalSalesforceSteps.login_salesforce()
            InternalSalesforceSteps.goToOpp(oppId);
            InternalSalesforceSteps.clickDeleteButton();
        })
    }

}

class InternalSalesforceUtils {

    
    
}

export { InternalSalesforce, InternalSalesforceUtils };