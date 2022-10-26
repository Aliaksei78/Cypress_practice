class AccessoriesPage {

    open() {
        return cy.visit('')                       // takes URL from cypress.config.js
    }                                             // baseUrl: "https://store.google.com/us/collection/accessories_wall?hl=en-US"

    getAllProducts() {
        return cy.get('.mqn2-aiv.ng-binding')
    }

}

export default new AccessoriesPage
