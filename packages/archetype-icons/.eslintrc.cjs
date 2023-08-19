module.exports = {
  root: true,
  env: { es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "import", "react"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": ["error", { "prefer-inline": true }],
    "no-duplicate-imports": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports" },
    ],
    "react/display-name": "off",
    "react/prop-types": "off",
    // https://stackoverflow.com/a/76511985
    "@typescript-eslint/no-empty-function": "off",
  },
  settings: {
    react: { version: "detect" },
  },
};
