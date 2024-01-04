module.exports = {
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "prettier",
    "plugin:playwright/recommended",
  ],
  plugins: ["react", "react-hooks", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    "no-unsafe-optional-chaining": [
      "error",
      { disallowArithmeticOperators: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": ["error"],
    "no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
