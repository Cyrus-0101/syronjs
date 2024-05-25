const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = [
  {
    languageOptions: { globals: globals.es2021 },
    plugins: {
      prettier: {
        enabled: true,
        config: 'recommended',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    }
  },
  ...tseslint.configs.recommended,
  ];