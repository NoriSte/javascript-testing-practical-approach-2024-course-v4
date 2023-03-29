const { defineConfig } = require("cypress");
const { devServer } = require("@cypress/vite-dev-server");
const reactPlugin = require("@vitejs/plugin-react");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    baseUrl: "http://localhost:4100",
    specPattern: "cypress/e2e/**/*spec.{js,jsx,ts,tsx}",
  },
  component: {
    specPattern: "**/*spec.{js,jsx,ts,tsx}",
    devServer,
    devServerConfig: {
      plugins: [reactPlugin()],
    },
  },
});
