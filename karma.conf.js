/* eslint no-var: 0 */
var webpack = require('webpack') // eslint-disable-line no-unused-vars
var path = require('path')

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
        root: [path.join(__dirname, 'app/javascripts')],
      },
      module: {
        loaders: [
          { test: /\.jsx?$/, loader: 'babel-loader' },
        ],
      },
    },
    webpackServer: {
      noInfo: true,
    },
  })
}
