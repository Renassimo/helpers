import typescriptEslint from '@typescript-eslint/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      // '@typescript-eslint/no-unused-vars': 2,
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-empty-function': 1,
      '@typescript-eslint/no-empty-interface': 1,
      '@typescript-eslint/ban-ts-comment': 1,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      "@typescript-eslint/no-empty-object-type": ['error', {'allowInterfaces': 'with-single-extends'}]
    },
  },
];

export default config;
