/// <reference types="Cypress" />

/**
 * Main goals
 * - Leverage Testing Library
 *
 * Additional goals
 * - Retrieve the button through its role
 *
 * What to learn
 * - Data-testid selectors don't help in case of debugging, is the property missing? Is it empty? Is it wrong?
 * - The importance of testing the same way the users use the app
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
