/* eslint no-var: "off" */

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    bundle: './lib/index.js',
    'universe-bundle': './lib/watif/master/index.js',
  },

  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/js/',
    filename: '[name].js',
  },

  resolve: {
    modules: [path.join(__dirname, 'lib'), 'node_modules'],
  },

  // postcss: function () {
  //   return [autoprefixer]
  // },

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
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [path.resolve('lib'), path.resolve('spec')],
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('lib')],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // ident is temporary until webpack 2.3
              ident: 'postcss',
              plugins: () => [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
        exclude: /node_modules/ },
    ],
  },
}
