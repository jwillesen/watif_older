/* eslint no-var: "off" */

var path = require('path')

module.exports = {
  entry: {
    story: path.join(__dirname, 'index.js'),
  },

  output: {
    path: path.join(__dirname, '../../public/stories'),
    publicPath: '/stories/',
    filename: 'house-sitting.js',
    library: 'WatifStory',
    libraryTarget: 'var',
  },

  resolve: {
    root: [
      path.join(__dirname, '../../lib'),
    ],
  },

  devtool: '#inline-source-map',

  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: [path.resolve('.'), path.resolve('items')],
    }],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.resolve('.')],
      },
      { test: /\.json$/, loader: 'json' },
    ],
  },

}
