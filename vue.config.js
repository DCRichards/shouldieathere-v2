const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  lintOnSave: 'default',

  chainWebpack: (config) => {
    const sr = config.module.rule('svg');
    sr.uses.clear();
    sr.use('vue-svg-loader').loader('vue-svg-loader');
  },

  configureWebpack: {
    plugins: [
      new StylelintPlugin({
        emitErrors: true,
        files: '**/*.(vue|scss|css|html)',
      }),
    ],
  },

  css: {
    requireModuleExtension: true,
  },

  devServer: {
    clientLogLevel: 'warning',
    quiet: false,
    // https: {
    //   key: readFileSync('./config/ssl/localhost.key'),
    //   cert: readFileSync('./config/ssl/localhost.crt'),
    // },
  },

  pwa: {
    workboxPluginMode: 'GenerateSW',
  },
};
