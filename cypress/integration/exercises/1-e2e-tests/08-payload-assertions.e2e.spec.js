/// <reference types="Cypress" />

/**
 * Main goals
 * - Assert about the request payload
 *
 * Additional goals
 * - Check even the response status
 * - Log a custom string if the status doesn't match the expected one
 *
 * What to learn
 * - Why reducing the amount of possible errors is useful
 * - Leverage every automatic Cypress's waiting
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
