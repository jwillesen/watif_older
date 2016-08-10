/* eslint no-var: "off" */

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    bundle: './lib/index.js',
    universe: './lib/watif/master/index.js',
  },

  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/js/',
    filename: '[name].js',
  },

  resolve: {
    root: [
      path.join(__dirname, 'lib'),
    ],
  },

  postcss: function () {
    return [autoprefixer]
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version),
    }),
  ],

  devtool: '#inline-source-map',

  // React 15 externals for enzyme. See http://airbnb.io/enzyme/docs/guides/webpack.html
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: [path.resolve('lib'), path.resolve('spec')],
    }],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.resolve('lib')],
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: 'style!css!postcss!sass', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css!postcss', exclude: /node_modules/ },
    ],
  },

}
