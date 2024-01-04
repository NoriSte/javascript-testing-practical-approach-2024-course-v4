/// <reference types="Cypress" />

/**
 * Main goals
 * - Navigate the home page and get the user already logged in by stubbing the back-end
 *
 * Additional goals
 * - If you use a fixture, assert about it to check it contains the data you need
 *
 * What to learn
 * - We don't need to pass through the registration page anymore
 */

const headers = { 'Access-Control-Allow-Origin': '*' }

context('The home page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/#/register')

    // ...
  })

  // Skipped until implemented
  it.skip('Should work', () => {
    cy.findByText('No articles are here... yet.').should('be.visible')
  })
})
