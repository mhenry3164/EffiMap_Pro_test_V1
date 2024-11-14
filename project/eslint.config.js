import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint'; // Importing ESLint package for parser
import typescriptEslint from '@typescript-eslint/eslint-plugin'; // Correct plugin for TypeScript

export default {
  extends: [
    js.configs.recommended, 
    'plugin:react/recommended', // React plugin for React-specific rules
    'plugin:@typescript-eslint/recommended', // TypeScript plugin for TypeScript-specific rules
  ],
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // Allows the use of imports
  },
  globals: {
    ...globals.browser, // Allow browser globals
  },
  plugins: [
    'react-hooks',
    'react-refresh',
    'react', // React plugin
    '@typescript-eslint', // TypeScript plugin
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn', { allowConstantExport: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable module boundary types if not needed
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused variables
    'react/prop-types': 'off', // Disable prop-types since we're using TypeScript
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // TypeScript specific rules
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
      },
    },
  ],
};
