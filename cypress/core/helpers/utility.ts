class CoreUtils {
    static synchronizeWithCypress (method: Function) {
        cy.then(() => {
            method();
        })
    } 

    static makeScreenshot (waitTime = 1000) {
        cy.wait(waitTime).screenshot({overwrite: true});
    }
}


export default CoreUtils;