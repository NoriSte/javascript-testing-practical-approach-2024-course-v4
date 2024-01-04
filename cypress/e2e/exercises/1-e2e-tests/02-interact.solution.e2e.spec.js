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
    cy.visit('/#/register')

    // `cy.get` accepts all DOM selectors plus everything offered by jQuery
    // you can type faster by passing options to cy.type
    cy.get('.form-control').eq(0).type('Foo')
  })

  // not a useful test, just for fun
  it('Playground: setting the input value without leveraging cy.type ', () => {
    cy.visit('/#/register')

    cy.get('.form-control')
      .eq(0)
      .then($el => {
        $el.attr('value', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      })
  })
})
