/// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Chance from 'chance';
import AccessoriesPage from '../../../pageObjects/AccessoriesPage';
import ProductPage from '../../../pageObjects/ProductPage';
import ConfigurationPage from '../../../pageObjects/ConfigurationPage';
import CartPage from '../../../pageObjects/CartPage';

var productName;
var productColor = "No variant color";
var productPrice;

Cypress.on('uncaught:exception', (err, runnable) => {                  // returning false here prevents Cypress from failing the test
    return false
})


Given('User is at Accessories page', () => {
    AccessoriesPage.open()
})


When('User selects a product', function () {                           // function() because Mocha does not support () => for Hooks
    AccessoriesPage.getAllProducts().each(function (element) {
        if (element.text() === this.products.name) {
            productName = element.text()
            cy.log('Selected product: ' + productName)
            cy.wrap(element).click()
        }
    })
})
And('Add the product to the cart', () => {
    cy.get('.X4eHfd .JO0Atc [data-test="financing"] .TUGUrd span').then(price => {
        productPrice = price.text()
        cy.log('Product price: ' + productPrice)
    })
    ProductPage.getBigButtonBuyOrAddToCart().then(button => {
        var buttonText = button.text()
        if (buttonText === 'Add to cart') {
            cy.log(`The product "${productName}" does not have color options`)
            ProductPage.getBigButtonBuyOrAddToCart().click({ force: true })
        }
        else {
            ProductPage.getBigButtonBuyOrAddToCart().click({ force: true })
            ConfigurationPage.getColorOptions().each((element, index, list) => {
                var randomColor = Chance().pickone(list)
                cy.wrap(randomColor).click()
                return false                                           // interrupts cycle 'each' after first iteration
            })
            cy.wait(1000)                                              // because field with the color name updates too slowly
            ConfigurationPage.getFieldColorName().then(color => {
                var text = color.text()
                productColor = text.split(': ')[1]
                cy.log('Selected color: ' + productColor)
            })
            ConfigurationPage.getButtonAddToCart().click()
        }
    })
})


Then('Data product is presented in the cart', () => {
    CartPage.getProductName().then(nameInCart => {
        var productNameInCart = nameInCart.text()
        if (productColor === "No variant color") {
            expect(productNameInCart).to.equal(productName)
        } else {
            productNameInCart = productNameInCart.split(' ')
            productNameInCart.pop()
            productNameInCart = productNameInCart.join(' ')
            expect(productNameInCart).to.equal(productName)
        }
    })

})
And('The color of product is equal to the selected one', () => {
    CartPage.getProductName().then(nameInCart => {
        var productNameInCart = nameInCart.text()
        if (productColor === "No variant color") {
            expect("No variant color").to.equal(productColor)
        } else {
            var temp = productNameInCart.split(' ')
            var productColorInCart = temp.pop()
            expect(productColorInCart).to.equal(productColor)
        }
    })
})
And('The quantity of product is equal to the selected one', () => {
    CartPage.getSelectorQuantity().should('have.value', 1)
})
And('The price of product is equal to the selected one', () => {
    CartPage.getProductPrice().then(priceInCart => {
        var productPriceInCart = priceInCart.text()
        expect(productPriceInCart).to.equal(productPrice)
    })
})
And('The total price for one product is equal to the price of product', () => {
    CartPage.getTotalPrice().then(totalPriceInCart => {
        var productsTotalPriceInCart = totalPriceInCart.text()
        expect(productsTotalPriceInCart).to.equal(productPrice)
    })
})
And('There is only one chosen product in the cart', () => {
    CartPage.getAllProducts().then(list => {
        let quantity = list.length
        expect(quantity).to.equal(1)
    })
})