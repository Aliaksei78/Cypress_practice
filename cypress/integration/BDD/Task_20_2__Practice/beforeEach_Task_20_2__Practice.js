import Chance from 'chance'
import AccessoriesPage from '../../../pageObjects/AccessoriesPage';
import ProductPage from '../../../pageObjects/ProductPage';
import ConfigurationPage from '../../../pageObjects/ConfigurationPage';

beforeEach(function () {
    cy.fixture('products').then((products) => {
        this.products = Chance().pickone(products)
    })

    this.productName;
    this.productColor = "No variant color";
    this.productPrice;

    AccessoriesPage.open()
    AccessoriesPage.getAllProducts().each(function (element) {
        if (element.text() === this.products.name) {
            this.productName = element.text()
            cy.log('Selected product: ' + this.productName)
            cy.wrap(element).click()
        }
    })

    cy.get('.X4eHfd .JO0Atc [data-test="financing"] .TUGUrd span').then(price => {
        this.productPrice = price.text()
        cy.log('Product price: ' + this.productPrice)
    })

    ProductPage.getBigButtonBuyOrAddToCart().then(button => {
        var buttonText = button.text()
        if (buttonText === 'Add to cart') {
            cy.log(`The product "${this.productName}" does not have color options`)
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
                this.productColor = text.split(': ')[1]
                cy.log('Selected color: ' + this.productColor)
            })
            ConfigurationPage.getButtonAddToCart().click()
        }
        cy.wait(2000)
    })
})