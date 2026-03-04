/// <reference types="cypress" />

/**
 * OPCION 2 DE APIS
 * Pruebas de servicios REST en https://petstore.swagger.io/
 *
 * Casos:
 * 1. Anadir una mascota a la tienda
 * 2. Consultar la mascota ingresada previamente (Busqueda por ID)
 * 3. Actualizar el nombre de la mascota y el estatus de la mascota a "sold"
 * 4. Consultar la mascota modificada por estatus (Busqueda por estatus)
 */

describe('Petstore API - CRUD de Mascotas', () => {
  const BASE_URL = 'https://petstore.swagger.io/v2';
  const PET_ID = Math.floor(Math.random() * 900000) + 100000; // ID aleatorio para evitar colisiones

  const newPet = {
    id: PET_ID,
    category: {
      id: 1,
      name: 'Dogs',
    },
    name: 'Firulais',
    photoUrls: ['https://example.com/firulais.jpg'],
    tags: [
      {
        id: 1,
        name: 'test-qa',
      },
    ],
    status: 'available',
  };

  it('1. Anadir una mascota a la tienda (POST /pet)', () => {
    cy.log('**Entrada:** Objeto pet con id, name, category, photoUrls, tags, status');
    cy.log(`**Pet ID:** ${PET_ID}`);
    cy.log(`**Pet Name:** ${newPet.name}`);
    cy.log(`**Pet Status:** ${newPet.status}`);

    cy.request({
      method: 'POST',
      url: `${BASE_URL}/pet`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: newPet,
    }).then((response) => {
      cy.log('**Salida:**');
      cy.log(`Status Code: ${response.status}`);
      cy.log(`Response Body: ${JSON.stringify(response.body)}`);

      // Validaciones
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(PET_ID);
      expect(response.body.name).to.eq('Firulais');
      expect(response.body.status).to.eq('available');
      expect(response.body.category.name).to.eq('Dogs');
      expect(response.body.tags[0].name).to.eq('test-qa');
    });
  });

  it('2. Consultar la mascota ingresada previamente - Busqueda por ID (GET /pet/{petId})', () => {
    cy.log(`**Entrada:** Pet ID = ${PET_ID}`);

    cy.request({
      method: 'GET',
      url: `${BASE_URL}/pet/${PET_ID}`,
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      cy.log('**Salida:**');
      cy.log(`Status Code: ${response.status}`);
      cy.log(`Response Body: ${JSON.stringify(response.body)}`);

      // Validaciones
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(PET_ID);
      expect(response.body.name).to.eq('Firulais');
      expect(response.body.status).to.eq('available');
      expect(response.body.category.name).to.eq('Dogs');
    });
  });

  it('3. Actualizar el nombre y el estatus de la mascota a "sold" (PUT /pet)', () => {
    const updatedPet = {
      ...newPet,
      name: 'Firulais Updated',
      status: 'sold',
    };

    cy.log('**Entrada:** Objeto pet actualizado');
    cy.log(`**Nuevo nombre:** ${updatedPet.name}`);
    cy.log(`**Nuevo status:** ${updatedPet.status}`);

    cy.request({
      method: 'PUT',
      url: `${BASE_URL}/pet`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: updatedPet,
    }).then((response) => {
      cy.log('**Salida:**');
      cy.log(`Status Code: ${response.status}`);
      cy.log(`Response Body: ${JSON.stringify(response.body)}`);

      // Validaciones
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(PET_ID);
      expect(response.body.name).to.eq('Firulais Updated');
      expect(response.body.status).to.eq('sold');
    });
  });

  it('4. Consultar la mascota modificada por estatus - Busqueda por estatus (GET /pet/findByStatus)', () => {
    cy.log('**Entrada:** status = sold');

    cy.request({
      method: 'GET',
      url: `${BASE_URL}/pet/findByStatus`,
      qs: {
        status: 'sold',
      },
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      cy.log('**Salida:**');
      cy.log(`Status Code: ${response.status}`);
      cy.log(`Cantidad de mascotas con status "sold": ${response.body.length}`);

      // Validaciones
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      // Buscar nuestra mascota en los resultados
      const ourPet = response.body.find((pet) => pet.id === PET_ID);
      cy.log(`Mascota encontrada: ${JSON.stringify(ourPet)}`);

      expect(ourPet).to.not.be.undefined;
      expect(ourPet.name).to.eq('Firulais Updated');
      expect(ourPet.status).to.eq('sold');
    });
  });
});
