const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  lintOnSave: 'default',

  configureWebpack: {
    plugins: [
      new StylelintPlugin({
        emitErrors: true,
        files: '**/*.(vue|scss|css|html)',
      }),
    ],
  },

  css: {
    modules: true,
  },

  devServer: {
    clientLogLevel: 'warning',
    quiet: false,
  },
};
