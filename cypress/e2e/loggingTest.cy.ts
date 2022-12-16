import DOMHelper from '../core/helpers/element-actions'



describe('', () => {
  before (() => {
    
    
    
  })
  it ('asd',  () => {
    
    cy.visit('https://google.com')
    // Logger.currentURL()
    DOMHelper.clickOn('//nonexistentelement')

  })

})
