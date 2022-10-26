class ConfigurationPage {

    getColorOptions() {
        return cy.get('section button')
    }

    getFieldColorName() {
        return cy.get('.aq8kHf')
    }

    getButtonAddToCart() {
        return cy.get('.mXipTc')
    }
}

export default new ConfigurationPage