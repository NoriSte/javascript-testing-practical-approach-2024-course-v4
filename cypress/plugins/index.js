const { defineConfig } = require('vite')
const { devServer } = require('@cypress/vite-dev-server')
const reactPlugin = require('@vitejs/plugin-react')

module.exports = defineConfig({
  component: {
    devServer,
    devServerConfig: {
      plugins: [reactPlugin()],
    },
  },
})
