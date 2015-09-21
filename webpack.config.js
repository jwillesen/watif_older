/* eslint no-var: 0 */

var path = require('path')
var autoprefixer = require('autoprefixer')
var common = require('./webpack.common')

module.exports = {
  entry: './app/javascripts/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'javascripts/bundle.js',
  },

  resolve: {
    root: common.root,
    extensions: common.extensions,
    alias: common.alias,
  },

  postcss: function () {
    return [autoprefixer]
  },

  module: {
    preLoaders: common.preLoaders,

    loaders: common.loaders.concat([
      {test: /\.scss$/, loader: 'style!css!postcss!sass', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css!postcss', exclude: /node_modules/},

      // needed to load bootstrap's css
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.woff2?$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.ttf$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.eot$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.svg$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
    ]),
  },
}
