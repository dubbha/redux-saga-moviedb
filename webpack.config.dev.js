const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharedConfig = require('./webpack.config.shared');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3001/',
      './src/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: sharedConfig.extensions,
  },
  module: {
    rules: [
      {
        test: /\.(css|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      ...sharedConfig.rules,
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/html/index.html',
      inject: true,
      favicon: 'src/img/favicon.ico',
    }),
    ...sharedConfig.plugins,
  ],
};
