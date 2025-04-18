// eslint.config.js
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    ignores: ['node_modules', '.vscode'],
    rules: {
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-console': 'off'
    }
  }
];
