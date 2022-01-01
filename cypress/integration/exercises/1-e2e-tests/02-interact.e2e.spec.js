/// <reference types="Cypress" />

/**
 * Main goals
 * - Visit the registration page
 * - Type something into it
 *
 *
 * Additional goals
 * - Speed up typing
 * - Change the input value without using the type command
 *
 * What to learn
 * - Basic interactions with the app under test
 * - Using the devtools to find out the right selector to retrieve DOM elements
 * - Cypress uses jQuery
 */

context('The sign up page', () => {
  beforeEach(() => {
    cy.viewport(600, 900)
  })

  it('Should allow typing into the input field', () => {
    // ...
  })
})
