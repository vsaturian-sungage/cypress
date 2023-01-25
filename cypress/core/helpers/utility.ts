class CoreUtils {

    static synchronizeWithCypress (method: Function) {
        cy.then(() => {
            method();
        })
    } 

}

export default CoreUtils;