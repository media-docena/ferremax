import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      quotes: ['error', 'single'], // 👈 fuerza uso de comillas simples
    },
    languageOptions: { globals: {
      ...globals.node, 
      ...globals.jest} },
  },
]);
