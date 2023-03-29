/// <reference types="Cypress" />

/**
 * Main goals
 * - Leverage data-testid selectors
 *
 * What to learn
 * - Why element/id/class-based selectors aren't stable
 */

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/register')
  })

  it('Should allow registering and redirects the user to the home page', () => {
    // ...
  })
})
