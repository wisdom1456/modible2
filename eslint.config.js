import { defineConfig } from 'eslint-define-config';
import sveltePlugin from 'eslint-plugin-svelte3';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import svelteEslintParser from 'svelte-eslint-parser';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    files: ['src/**/*.{js,ts}', 'tests/**/*.{js,ts}'],
    ignores: ['.svelte-kit/**', 'node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs['recommended'].rules,
    },
  },
  {
    files: ['src/**/*.svelte'],
    ignores: ['.svelte-kit/**', 'node_modules/**', 'dist/**'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        parser: typescriptParser,
      },
    },
    plugins: {
      svelte3: sveltePlugin,
    },
    processor: 'svelte3/svelte3',
    rules: {
      // Add any Svelte-specific rules here
    },
  },
  {
    files: ['src/**/*.{js,ts,svelte}', 'tests/**/*.{js,ts,svelte}'],
    ignores: ['.svelte-kit/**', 'node_modules/**', 'dist/**'],
    languageOptions: {
      globals: {
        browser: 'readonly',
      },
    },
    rules: {
      // Add any project-wide rules here
    },
  },
]);
