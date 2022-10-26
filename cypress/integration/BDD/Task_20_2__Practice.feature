Feature: End-2-End tests


    Scenario: User is able to change the quantity of products in the cart
        Given User is at Cart page

        When Data product is presented in the cart
        And The color of product is equal to the selected one
        And The quantity of product is equal to the selected one
        And The price of product is equal to the selected one
        And The total price for one product is equal to the price of product
        And There is only one chosen product in the cart

        Then User can change quantity of products in the cart
        And The total price is equal to the price of the product multiplayed on quantity
