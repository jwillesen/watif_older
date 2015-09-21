/* eslint no-var: 0 */

var path = require('path')

module.exports = {
  root: [
    path.join(__dirname, 'app/javascripts'),
    path.join(__dirname, 'app/css'),
    path.join(__dirname, 'app/html'),
  ],

  extensions: ['', '.js', '.jsx', '.json'],

  alias: {
    'gsap/TweenLite': 'gsap/src/uncompressed/TweenLite',
    'gsap/ScrollToPlugin': 'gsap/src/uncompressed/plugins/ScrollToPlugin',
    'gsap/EasePack': 'gsap/src/uncompressed/easing/EasePack',
  },

  preLoaders: [{
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
  }],

  loaders: [{
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      optional: ['runtime', 'es7.asyncFunctions', 'es7.objectRestSpread'],
    },
  }],
}
