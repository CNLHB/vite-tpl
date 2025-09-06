import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import autoImport from './.eslintrc-auto-import.json' with { type: 'json' };
import configPrettier from '@vue/eslint-config-prettier';
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...autoImport.globals },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  pluginVue.configs['flat/essential'],
  configPrettier,
  // 自定义规则
  {
    rules: {
      // Vue 相关规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-multiple-template-root': 'off',

      // JavaScript 规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    // Note: there should be no other properties in this object
    ignores: ['node_modules'],
  },
]);
