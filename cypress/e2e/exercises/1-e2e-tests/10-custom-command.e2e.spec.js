/// <reference types="Cypress" />

/**
 * Main goals
 * - Write a custom command that abstracts away the authentication code
 *
 * Additional goals
 * - Control logging instead of using Cypress' default one
 *
 * What to learn
 * - Shortening the test
 * - Abstracting away the repetitive code
 *
 * What to think about
 * - Keeping the abstraction level as low as possible (let's talk about the PageObject model...)
 * - How could you speed up the test without using `type`?
 *
 * Testing rules
 * - Keep the test code simple, stupid! DRY it as few as possible
 */

const noLog = { log: false }

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
    cy.findByText('New Article').should('be.visible')
  })
})
