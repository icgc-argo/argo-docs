const Dotenv = require('dotenv-webpack');

module.exports = function(context, options) {
  return {
    name: 'dotenv-plugin',
    configureWebpack(config) {
      config.plugins.push(new Dotenv());
      return () => config;
    },
  };
};
