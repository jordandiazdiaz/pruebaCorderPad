// ***********************************************
// Custom commands for SauceDemo E2E tests
// ***********************************************

/**
 * Login to SauceDemo
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('loginSauceDemo', (username, password) => {
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

/**
 * Add a product to the cart by its name
 * @param {string} productName
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.inventory_item', productName)
    .find('button')
    .click();
});
