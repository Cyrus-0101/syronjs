// @ts-check
import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import esLintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import { config, configs } from 'typescript-eslint';

export default config(
    eslint.configs.recommended,
    esLintConfigPrettier,
    ...configs.strict,
    ...configs.stylisticTypeChecked,
    ...configs.recommendedTypeChecked,
    configs.eslintRecommended,
    {
        // ignores: ['dist/**', 'examples/vanilla/**'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json', 'tsconfig.eslint.json'],
                sourceType: 'module',
                tsconfigRootDir: import.meta.dirname,

            },
        },
        plugins: {
            jsdoc: jsdoc,
        },
        rules: {
            indent: 'error',
            quotes: [
                'error',
                'single',
                { 'avoidEscape': true, 'allowTemplateLiterals': true }
            ],            
            'jsdoc/require-jsdoc': 'error',
            'jsdoc/check-values': 'error'

        }
    }
);