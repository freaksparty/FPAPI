const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch','./lib/fpapi.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fpapi.min.js',
    libraryTarget: 'umd',
    library: 'FPAPI'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({  Promise: 'es6-promise'  })
  ]
}
