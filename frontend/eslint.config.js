import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier'; // 👈 import plugin prettier

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: prettierPlugin, // 👈 khai báo plugin ở đây
    },
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs['recommended-latest'], reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-refresh/only-export-components': 'warn',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
]);
