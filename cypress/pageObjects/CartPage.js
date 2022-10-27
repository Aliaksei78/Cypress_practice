class CartPage {

    open() {
        return cy.visit('https://store.google.com/us/cart?hl=en-US')
    }

    getProductName() {
        return cy.get('.XNnpOb')
    }

    getSelectorQuantity() {
        return cy.get('select')
    }

    getProductPrice() {
        return cy.get('.GehUpe')
    }

    getTotalPrice() {
        return cy.get('[data-test-price-subtotal=""]')
    }

    getAllProducts() {
        return cy.get('.kGEQJf')
    }

    getAllButtonsDelete() {
        return cy.get('.yjHiqb[jsaction="click:IY6UFe" ]')
    }

    getInscriptionAboutEmpty() {
        return cy.get('.RnH0Af')
    }
}

export default new CartPage