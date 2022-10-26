import Chance from 'chance'


beforeEach(function () {                               // it is Hook
    cy.fixture('products').then((products) => {        // take data from 'products.json' in the folder cypress/fixtures
        this.products = Chance().pickone(products)     // now this.data visible for tests
    })
})