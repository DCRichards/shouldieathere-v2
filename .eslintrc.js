module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', 150],
    'vue/html-closing-bracket-newline': ['error', {
      multline: 'never',
      singleline: 'never',
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
