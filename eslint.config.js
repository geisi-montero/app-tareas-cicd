const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['coverage/**', 'node_modules/**', 'public/**'] },
  js.configs.recommended,
  {
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: { ...globals.node } },
    rules: { 'no-unused-vars': 'error', eqeqeq: 'error', 'no-var': 'error' }
  },
  { files: ['tests/**/*.js'], languageOptions: { globals: { ...globals.jest } } }
];
