// @ts-check
import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { config, configs } from 'typescript-eslint';

export default config(
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylisticTypeChecked,
  ...configs.recommendedTypeChecked,
  {
    // ignores: ['dist/**', 'examples/vanilla/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
    
      },
    },
  }
);