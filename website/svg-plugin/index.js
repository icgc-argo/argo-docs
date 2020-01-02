module.exports = function(context, options) {
  return {
    name: 'svg-plugin',
    configureWebpack(config, isServer, utils) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      });
      // return object doesn't work
      return () => config;
    },
  };
};
