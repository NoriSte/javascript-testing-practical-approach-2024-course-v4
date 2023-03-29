/// <reference types="Cypress" />

/**
 * Main goals
 * - Store the jwt token of the first test and reuse it in the next tests
 *
 * What to learn
 * - Again: speeding up the test
 * - Tests must work independently from other tests
 *
 * Testing rules
 * - Deterministic tests means also that you should not rely on their execution order
 */

let previousJwt
let previousCredentials = {}

Cypress.Commands.add('register', { prevSubject: 'optional' }, function (_subject) {
  // ...
})

context('The New Post page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
  })

  // Skipped until implemented
  it.skip('Should get the user registered', () => {
    cy.register()
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })

  it.skip('Should get the user registered (leveraging the previous user)', () => {
    cy.register()
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })
})
