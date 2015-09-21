/* eslint no-var: 0 */
var webpack = require('webpack') // eslint-disable-line no-unused-vars
var common = require('./webpack.common')

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ],
    },
    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: common.root,
        extensions: common.extensions,
        alias: common.alias,
      },
      module: {
        preLoaders: common.preLoaders,

        loaders: common.loaders.concat([
          { test: /\.s?css$/, loader: 'null-loader' },
        ]),
      },
    },
    webpackServer: {
      noInfo: true,
    },
  })
}
