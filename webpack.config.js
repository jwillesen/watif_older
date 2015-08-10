var path = require('path');

module.exports = {
  // context: __dirname,
  entry: './webpack/assets/javascripts/main.jsx',
  output: {
    filename: 'bundle.js',
    path: 'generated/assets/javascripts',
  },
  resolve: {
    root: [path.join(__dirname, 'webpack/assets/javascripts')],
    extensions: ['', '.js', '.jsx', '.json'],
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
          optional: ["runtime", "es7.asyncFunctions", "es7.objectRestSpread"],
        },
      },

      {test: /\.css$/, loader: 'style-loader!css-loader'},

      // make sure bootstrap can find jquery
      {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

      // needed to load bootstrap's css
      {test: /\.woff2?$/, loader: "file", query: {name: "../../assets/fonts/[hash].[ext]"}},
      {test: /\.ttf$/,    loader: "file", query: {name: "../../assets/fonts/[hash].[ext]"}},
      {test: /\.eot$/,    loader: "file", query: {name: "../../assets/fonts/[hash].[ext]"}},
      {test: /\.svg$/,    loader: "file", query: {name: "../../assets/fonts/[hash].[ext]"}},
    ],
  },
};
