/// <reference types="Cypress"/>
import CartPage from '../../../pageObjects/CartPage'


afterEach(function () {
    CartPage.getAllButtonsDelete().each(deleteButton => {
        cy.wrap(deleteButton).click()
    })
    CartPage.getInscriptionAboutEmpty().should('have.text', 'Your cart is empty')
})