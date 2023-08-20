module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // Choose one of the following:
    'plugin:vue/vue3-essential', // Vue 3
    // 'plugin:vue/essential',     // Vue 2
    'eslint:recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    parser: '@babel/eslint-parser', // Include the parser here if not set globally
    babelOptions: {
      presets: ['@babel/preset-env']
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
