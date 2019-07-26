module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'rule-empty-line-before': 'always',
    'order/properties-alphabetical-order': true,
  },
};
