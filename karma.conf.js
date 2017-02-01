/* eslint no-var: "off" */

var path = require('path')
var webpackConfig = require('./webpack.config.js')

webpackConfig.module.rules[1].loader = ['babel-istanbul-loader']
webpackConfig.module.rules.unshift({
  test: /\.js$/,
  loaders: ['babel-loader'],
  include: [path.resolve('spec')],
})

module.exports = function (config) {
  config.set({
    singleRun: true,
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: ['spec/spec-index.js'],
    preprocessors: {
      'spec/spec-index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage'],
    webpack: webpackConfig,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },
  })
}
