/// <reference types="Cypress" />

/**
 * Main goals
 * - Stub the server
 *
 * Additional goals
 * - Clean up the test removing everything unneeded
 *
 * What to learn
 * - What's stubbing
 * - When to leverage E2E tests and when not
 * - That working without a back-end parallelize FE/BE development
 * - That the back-end slows down the front-end development
 */

const headers = { 'Access-Control-Allow-Origin': '*' }

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/#/register')
  })

  it('Should allow registering and redirects the user to the home page', () => {
    // stub the server by returning static responses
    cy.intercept('POST', '**/api/users', {
      body: {
        user: {
          username: 'Tester',
          email: 'user@realworld.io',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2ZhZjc4YTkzNGFiMDRhZjRhMzE0MCIsInVzZXJuYW1lIjoidGVzdGVyNzk1MzYiLCJleHAiOjE1NzM4MzY2ODAsImlhdCI6MTU2ODY0OTA4MH0.zcHxMz2Vx5h-EoiUZlRyUw0z_A_6AIZ0LzQgROvsPqw',
        },
      },
      headers,
    }).as('signup-request')
    cy.intercept('GET', '**/api/tags', { body: { tags: [] }, headers }).as('tags-request')
    cy.intercept('GET', '**/api/articles**', {
      body: { articles: [], articlesCount: 0 },
      headers,
    }).as('articles-request')

    cy.findByPlaceholderText('Username').type('Tester', { delay: 0 })
    cy.findByPlaceholderText('Email').type('user@realworld.io', { delay: 0 })
    cy.findByPlaceholderText('Password').type('mysupersecretpassword', { delay: 0 })

    cy.get('form').within(() => cy.findByText('Sign up').click())

    cy.wait('@signup-request').then(interception => {
      // assert about the request payload
      expect(interception.request.body).to.deep.eq({
        user: {
          username: 'Tester',
          email: 'user@realworld.io',
          password: 'mysupersecretpassword',
        },
      })
    })

    // the home page performs more than one request
    cy.wait(['@tags-request', '@articles-request'])

    cy.findByText('No articles are here... yet.').should('be.visible')
  })
})
