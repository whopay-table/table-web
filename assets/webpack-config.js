'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    app: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, '../build/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'font/',
              limit: 5000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.woff(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'font/',
              limit: 5000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              prefix: 'font/'
            }
          }
        ]
      },
      {
        test: /\.eot(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              prefix: 'font/'
            }
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              prefix: 'font/'
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../web/src/')
        ],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.jsx$/,
        use: [
          'babel-loader'
        ]
      }
    ],
    noParse: [/autoit\.js$/],
  },
  externals: {},
  plugins: []
};
