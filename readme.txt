================================================================================
PRUEBA QA - AUTOMATIZACION E2E Y APIS
Herramienta: Cypress 13.x
================================================================================

ESTRUCTURA DEL PROYECTO
-----------------------
pruebaCorderPad/
├── cypress/
│   ├── e2e/
│   │   ├── saucedemo/
│   │   │   └── flujo-compra.cy.js      --> Test E2E (Opcion 2)
│   │   └── api/
│   │       └── petstore.cy.js           --> Test APIS (Opcion 2)
│   ├── support/
│   │   ├── commands.js                  --> Comandos personalizados
│   │   └── e2e.js                       --> Configuracion de soporte
│   └── fixtures/
├── cypress.config.js                    --> Configuracion de Cypress
├── package.json
├── readme.txt                           --> Este archivo
└── conclusiones.txt                     --> Hallazgos y conclusiones

PRERREQUISITOS
--------------
- Node.js v18+ instalado
- npm v8+ instalado

INSTRUCCIONES PASO A PASO DE EJECUCION
---------------------------------------

1. Clonar el repositorio:
   git clone https://github.com/jordandiazdiaz/pruebaCorderPad.git
   cd pruebaCorderPad

2. Instalar dependencias:
   npm install

3. Ejecutar TODOS los tests (E2E + APIS):
   npm test

4. Ejecutar solo los tests E2E (SauceDemo):
   npm run cy:run:e2e

5. Ejecutar solo los tests de APIS (Petstore):
   npm run cy:run:api

6. Abrir Cypress en modo interactivo (con interfaz grafica):
   npm run cy:open

DESCRIPCION DE LOS EJERCICIOS
-------------------------------

--- AUTOMATIZACION E2E (Opcion 2) ---
Archivo: cypress/e2e/saucedemo/flujo-compra.cy.js
Pagina: https://www.saucedemo.com/
Flujo probado:
  1. Autenticarse con usuario: standard_user / password: secret_sauce
  2. Agregar dos productos al carrito (Sauce Labs Backpack y Sauce Labs Bike Light)
  3. Visualizar el carrito y verificar los productos
  4. Completar el formulario de compra (Checkout)
  5. Finalizar la compra y verificar el mensaje "Thank you for your order!"

--- APIS (Opcion 2) ---
Archivo: cypress/e2e/api/petstore.cy.js
Pagina: https://petstore.swagger.io/
Casos probados:
  1. Anadir una mascota a la tienda (POST /v2/pet)
     - Entrada: Objeto JSON con id, name, category, photoUrls, tags, status
     - Salida: Status 200, objeto de la mascota creada
  2. Consultar la mascota por ID (GET /v2/pet/{petId})
     - Entrada: Pet ID
     - Salida: Status 200, datos de la mascota
  3. Actualizar nombre y estatus a "sold" (PUT /v2/pet)
     - Entrada: Objeto JSON con nombre actualizado y status "sold"
     - Salida: Status 200, objeto de la mascota actualizada
  4. Consultar mascota por estatus (GET /v2/pet/findByStatus?status=sold)
     - Entrada: Query parameter status=sold
     - Salida: Status 200, array de mascotas con status "sold"

REPORTES
--------
Al ejecutar los tests se generan videos automaticamente en:
  cypress/videos/

Si algun test falla, se generan capturas de pantalla en:
  cypress/screenshots/
