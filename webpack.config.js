var path = require('path');

module.exports = {
  // context: __dirname,
  entry: './webpack/assets/javascripts/main.jsx',
  output: {
    filename: 'bundle.js',
    path: 'app/assets/generated/javascripts',
  },
  resolve: {
    root: [path.join(__dirname, 'webpack/assets/javascripts')],
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: 'node_modules', loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},

      // make sure bootstrap can find jquery
      {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

      // needed to load bootstrap's css
      {test: /\.woff2?$/, loader: "file"},
      {test: /\.ttf$/, loader: "file"},
      {test: /\.eot$/, loader: "file"},
      {test: /\.svg$/, loader: "file"},
    ],
  },
};
