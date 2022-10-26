/// <reference types="Cypress" />
import { Chance } from "chance";
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import CartPage from '../../../pageObjects/CartPage';

Cypress.on('uncaught:exception', (err, runnable) => {                   // returning false here prevents Cypress from failing the test
    return false
})


var productQuantitySelected;

Given('User is at Cart page', () => {
    CartPage.open()
})


When('Data product is presented in the cart', function () {             // function() because Mocha does not support () => for Hooks
    CartPage.getProductName().then(nameInCart => {
        var productNameInCart = nameInCart.text()
        if (this.productColor === "No variant color") {
            expect(productNameInCart).to.equal(this.productName)
        } else {
            productNameInCart = productNameInCart.split(' ')
            productNameInCart.pop()
            productNameInCart = productNameInCart.join(' ')
            expect(productNameInCart).to.equal(this.productName)
        }
    })
})
And('The color of product is equal to the selected one', function () {   // function() because Mocha does not support () => for Hooks
    CartPage.getProductName().then(nameInCart => {
        var productNameInCart = nameInCart.text()
        if (this.productColor === "No variant color") {
            expect("No variant color").to.equal(this.productColor)
        } else {
            var temp = productNameInCart.split(' ')
            var productColorInCart = temp.pop()
            expect(productColorInCart).to.equal(this.productColor)
        }
    })
})
And('The quantity of product is equal to the selected one', () => {
    CartPage.getSelectorQuantity().should('have.value', 1)
})
And('The price of product is equal to the selected one', function () {   // function() because Mocha does not support () => for Hooks
    CartPage.getProductPrice().then(priceInCart => {
        var productPriceInCart = priceInCart.text()
        expect(productPriceInCart).to.equal(this.productPrice)
    })
})
And('The total price for one product is equal to the price of product', function () {    // function() because Mocha does not support () => for Hooks
    CartPage.getTotalPrice().then(totalPriceInCart => {
        var productsTotalPriceInCart = totalPriceInCart.text()
        expect(productsTotalPriceInCart).to.equal(this.productPrice)
    })
})
And('There is only one chosen product in the cart', () => {
    CartPage.getAllProducts().then(list => {
        let quantity = list.length
        expect(quantity).to.equal(1)
    })
})


Then('User can change quantity of products in the cart', () => {
    productQuantitySelected = Chance().integer({ min: 2, max: 10 })
    CartPage.getSelectorQuantity().select(`${productQuantitySelected}`).should('have.value', productQuantitySelected)
    cy.wait(1000)    // because field with the total price updates too slowly
})
And('The total price is equal to the price of the product multiplayed on quantity', function () {
    CartPage.getTotalPrice().then(totalPriceInCart => {
        var productsTotalPriceInCart = totalPriceInCart.text()
        productsTotalPriceInCart = productsTotalPriceInCart.slice(1)
        this.productPrice = this.productPrice.slice(1)
        expect((+productsTotalPriceInCart).toFixed(2)).to.equal((this.productPrice * productQuantitySelected).toFixed(2))
    })
})



/* Just for practice have made step 'Then' with my own Promise
 Then('User can change quantity of products in the cart', () => {
    productQuantitySelected = new Promise(resolve => {
        var number = Chance().integer({ min: 2, max: 10 })
        CartPage.getSelectorQuantity().select(`${number}`).should('have.value', number)
        cy.wait(1000)          // because field with the total price updates too slowly
        resolve(number)
    })
})
And('The total price is equal to the price of the product multiplayed on quantity', function () {
    productQuantitySelected
        .then(productQuantitySelected => {
            CartPage.getTotalPrice().then(totalPriceInCart => {
                var productsTotalPriceInCart = totalPriceInCart.text()
                productsTotalPriceInCart = productsTotalPriceInCart.slice(1)
                this.productPrice = this.productPrice.slice(1)
                expect((+productsTotalPriceInCart).toFixed(2)).to.equal((this.productPrice * productQuantitySelected).toFixed(2))
            })
        })
}) */