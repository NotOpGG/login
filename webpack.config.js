const path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, './client/login/src');
var DIST_DIR = path.join(__dirname, './client/login/dist');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
