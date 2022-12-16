

const OppAttributes_fileName = 'oppAttributes.json';
const OppAttributes_path = `cypress/fixtures/${OppAttributes_fileName}`;



type ID = string | number;
interface OppAttributes {
    oppId?: ID,
    apiId?: ID,
    appId?: ID,
    sungageId?: ID
}

class Utils {

    static oppAttributesAssign ({
        oppId, 
        apiId,
        appId,
        sungageId}: OppAttributes) {

            cy.readFile(OppAttributes_path)
                .then(function (attributes) { 
                    attributes.oppId = oppId || attributes.oppId;
                    attributes.apiId = apiId || attributes.apiId;
                    attributes.appId = appId || attributes.appId;
                    attributes.sungageId = sungageId || attributes.sungageId;
                    cy.writeFile(OppAttributes_path, attributes);
            })

    }

    static getOppAttributes () {  

        return cy.readFile(OppAttributes_path);
    
    }

    
    
}

export default Utils;