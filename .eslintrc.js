module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": "off",
    "noo-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
};
