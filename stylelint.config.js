module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['mixin', 'if', 'else', 'content', 'include'],
    }],
    'rule-empty-line-before': 'always',
    'order/properties-alphabetical-order': true,

  },
};
