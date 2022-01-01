# Adding Cypress to an existing project

1. Install Cypress and start-server-and-test: `$ npm install -D cypress start-server-and-test @testing-library/cypress`

2. add some scripts to the package.json
```json
"cy:open":"cypress open",
"cy:run":"cypress run"
```
3. delete cypress/integration/examples

4. create a smoke test: create a `cypres/integration/smoke.spec.js` file containing the following content code
  ```js
  /// <reference types="Cypress" />

  context('smoke', () => {
    it('Should work', ()=>{
      cy.visit('/')
    })
  });
  ```

5. edit the `cypress.json` adding the baseUrl (`"baseUrl": "http://localhost:<YOUR_PORT>",`)

6. add the `test` script to the package.json
  ```json
  "test": "start-server-and-test start http://localhost:<YOUR_PORT> cy:run",
  ```

That's it! You're ready to:
- launch `$ npm run cy:open` that allows to use Cypress locally
- launch `$ npm test` that allows to start the application and test it in CI pipelines
