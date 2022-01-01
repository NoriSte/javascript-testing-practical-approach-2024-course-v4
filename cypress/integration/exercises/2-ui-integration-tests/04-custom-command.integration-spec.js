/// <reference types="Cypress" />

/**
 * Main goals
 * - Create a custom command that gets the user authenticated
 *
 * Additional goals
 * - by creating the backbone for testing the Create New Post page, ensure that the custom command
 * doesn't contain useless interceptions
 *
 * What to think about
 * - The amazing speed of the current test
 *
 * Testing rules
 * - Tests must be fast, as fast as possible
 */

const headers = { 'Access-Control-Allow-Origin': '*' }

Cypress.Commands.add('visitAuthenticated', { prevSubject: 'optional' }, function (_subject, path) {
  // ...
})

beforeEach(() => {
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  cy.viewport(600, 900)
})

context('The home page', () => {
  it('Should work', () => {
    cy.visitAuthenticated('/')

    cy.findByText('No articles are here... yet.').should('be.visible')
  })
})
