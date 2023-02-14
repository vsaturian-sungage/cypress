import { Utils } from "../../Utils/utils";
import * as CustomError from "../../../core/logger/error-handler";
import Logger from "../../../core/logger/logger";

class apiSalesforce {
    static apiLogin () {
        let options: object = {
            url: 'https://test.salesforce.com/services/oauth2/token',
            method: 'POST',
            auth: '',
            qs: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
                client_id: Cypress.env('client_id'),
                client_secret: Cypress.env('client_secret'),
                grant_type: "password"
            }
        }

        cy.request(options).its('body').as('response');
        return cy.get('@response').its('access_token').as('access_token');
    }

    //Use apiLogin() before this method
    static deleteSavedOpp (oppId?: string) {
        Utils.getOppAttributes().then((attributes) => {
            cy.get('@access_token').then(access_token => {

                oppId = oppId 
                        ? oppId
                        : (attributes && attributes.oppId) 
                            ? attributes.oppId 
                            : undefined;

                if (oppId === undefined) {
                    throw new CustomError.VariableError(oppId, `oppId is ${oppId}. Verify that oppId was correctly read from the file or corretly passed to the method.`)
                }

                Logger.log(`Initiating DELETE request with auth key.`)
                let options = {
                    url: `https://sungage--stg.sandbox.my.salesforce.com/services/data/v56.0/sobjects/Opportunity/${oppId}`,
                    method: 'DELETE',
                    auth: {
                        bearer: access_token
                    }
                }

                cy.request(options);          
            })
        });
    }
}

export default apiSalesforce;