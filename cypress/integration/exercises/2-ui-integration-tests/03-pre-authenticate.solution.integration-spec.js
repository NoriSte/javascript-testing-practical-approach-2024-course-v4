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
    cy.visit('/register')

    // set up the jwt leveraging the fixture
    cy.fixture('private/users/signup')
      .its('user')
      // check the fixture content in order to have more direct feedback in case of failures
      .should(
        user => expect(user).to.have.property('token').and.to.be.a('string').and.not.to.be.empty,
      )
      .then(user => localStorage.setItem('jwt', user.token))

    cy.intercept('GET', '**/api/user', { fixture: 'private/users/user', headers }).as(
      'user-request',
    )
    cy.intercept('GET', '**/api/tags', { fixture: 'private/tags/empty-tags', headers }).as(
      'tags-request',
    )
    cy.intercept('GET', '**/api/articles/feed**', {
      fixture: 'private/articles/empty-articles',
      headers,
    }).as('feed-request')

    cy.visit('/')

    cy.wait(['@user-request', '@tags-request', '@feed-request'])
    // the user is authenticated
  })

  it('Should work', () => {
    cy.findByText('No articles are here... yet.').should('be.visible')
  })
})
