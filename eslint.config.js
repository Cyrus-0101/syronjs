import config from "eslint-config-standard";

export default [
  {
    env: {
      es2021: true,
    },
    extends: [
      // "eslint:recommended", Airbnb overrides eslint:recommended
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:pretter/recommended",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: ["eslint.config.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
    },
    ...[].concat(config),
  },
];