/// <reference types="cypress" />

/**
 * OPCION 2 DE AUTOMATIZACION E2E
 * Prueba funcional automatizada (Prueba E2E) de un flujo de compra
 * en la pagina https://www.saucedemo.com/
 *
 * Flujo:
 * 1. Autenticarse con el usuario: standard_user y password: secret_sauce
 * 2. Agregar dos productos al carrito
 * 3. Visualizar el carrito
 * 4. Completar el formulario de compra
 * 5. Finalizar la compra hasta la confirmacion: "THANK YOU FOR YOUR ORDER"
 */

describe('SauceDemo - Flujo de compra E2E', () => {
  const BASE_URL = 'https://www.saucedemo.com';
  const USERNAME = 'standard_user';
  const PASSWORD = 'secret_sauce';

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('Debe completar el flujo de compra exitosamente', () => {
    // =====================================================
    // PASO 1: Autenticarse con credenciales validas
    // =====================================================
    cy.log('**PASO 1: Login con standard_user**');
    cy.loginSauceDemo(USERNAME, PASSWORD);

    // Verificar que el login fue exitoso
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');

    // =====================================================
    // PASO 2: Agregar dos productos al carrito
    // =====================================================
    cy.log('**PASO 2: Agregar dos productos al carrito**');

    // Producto 1: Sauce Labs Backpack
    cy.addProductToCart('Sauce Labs Backpack');
    cy.log('Producto 1 agregado: Sauce Labs Backpack');

    // Producto 2: Sauce Labs Bike Light
    cy.addProductToCart('Sauce Labs Bike Light');
    cy.log('Producto 2 agregado: Sauce Labs Bike Light');

    // Verificar que el badge del carrito muestra 2
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // =====================================================
    // PASO 3: Visualizar el carrito
    // =====================================================
    cy.log('**PASO 3: Visualizar el carrito**');
    cy.get('.shopping_cart_link').click();

    // Verificar que estamos en la pagina del carrito
    cy.url().should('include', '/cart.html');
    cy.get('.title').should('have.text', 'Your Cart');

    // Verificar que ambos productos estan en el carrito
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('.cart_item', 'Sauce Labs Backpack').should('be.visible');
    cy.contains('.cart_item', 'Sauce Labs Bike Light').should('be.visible');

    // =====================================================
    // PASO 4: Completar el formulario de compra
    // =====================================================
    cy.log('**PASO 4: Completar el formulario de compra (Checkout)**');

    // Click en Checkout
    cy.get('[data-test="checkout"]').click();

    // Verificar que estamos en el formulario de checkout
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('.title').should('have.text', 'Checkout: Your Information');

    // Completar el formulario
    cy.get('[data-test="firstName"]').type('Jordan');
    cy.get('[data-test="lastName"]').type('Diaz');
    cy.get('[data-test="postalCode"]').type('15001');

    // Continuar al resumen
    cy.get('[data-test="continue"]').click();

    // Verificar que estamos en el resumen de la orden
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.title').should('have.text', 'Checkout: Overview');

    // Verificar que los productos estan en el resumen
    cy.contains('.cart_item', 'Sauce Labs Backpack').should('be.visible');
    cy.contains('.cart_item', 'Sauce Labs Bike Light').should('be.visible');

    // Verificar que se muestra el total
    cy.get('.summary_total_label').should('be.visible');

    // =====================================================
    // PASO 5: Finalizar la compra
    // =====================================================
    cy.log('**PASO 5: Finalizar la compra**');

    // Click en Finish
    cy.get('[data-test="finish"]').click();

    // Verificar la confirmacion del pedido
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.title').should('have.text', 'Checkout: Complete!');

    // Verificar el mensaje de exito "THANK YOU FOR YOUR ORDER"
    cy.get('.complete-header')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');

    cy.log('**COMPRA FINALIZADA EXITOSAMENTE**');
  });
});
