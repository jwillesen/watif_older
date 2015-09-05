/* eslint no-var: 0 */
var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: './app/javascripts/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'javascripts/bundle.js',
  },

  resolve: {
    root: [
      path.join(__dirname, 'app/javascripts'),
      path.join(__dirname, 'app/css'),
      path.join(__dirname, 'app/html'),
    ],
    extensions: ['', '.js', '.jsx', '.json'],
  },

  postcss: function () {
    return [autoprefixer]
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          optional: ['runtime', 'es7.asyncFunctions', 'es7.objectRestSpread'],
        },
      },

      {test: /\.scss$/, loader: 'style!css!postcss!sass', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css!postcss', exclude: /node_modules/},

      // needed to load bootstrap's css
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.woff2?$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.ttf$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.eot$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.svg$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
    ],
  },
}
