/// <reference types="Cypress" />

/**
 * Main goals
 * - Leverage the app action exposed by the React application
 *
 * What to learn
 * - The importance of speeding up the tests
 * - Exposing 'shortcuts' from the front-end application
 * - Never using the UI to reach app state
 */

Cypress.Commands.add('register', { prevSubject: 'optional' }, function (_subject) {
  // ...
})

context('The New Post page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
  })

  // Skipped until implemented
  it,
    skip('Should get the user registered', () => {
      cy.register()
      cy.visit('/editor')
      cy.findByText('New Post').should('be.visible')
    })
})
