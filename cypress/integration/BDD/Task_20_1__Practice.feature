Feature: End-2-End tests


    Scenario: User is able to add single and multiple color product to the cart
        Given User is at Accessories page

        When User selects a product
        And Add the product to the cart

        Then Data product is presented in the cart
        And The color of product is equal to the selected one
        And The quantity of product is equal to the selected one
        And The price of product is equal to the selected one
        And The total price for one product is equal to the price of product
        And There is only one chosen product in the cart