module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // Choose one of the following:
    'plugin:vue/vue3-essential', // Vue 3
    // 'plugin:vue/essential',     // Vue 2
    'eslint:recommended',
    '@vue/typescript/recommended', // Use TypeScript rules for Vue
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
