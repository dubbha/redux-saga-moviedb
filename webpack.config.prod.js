const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sharedConfig = require('./webpack.config.shared');

module.exports = {
  mode: 'production',
  entry: {
    bundle: [
      'babel-polyfill',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      ...sharedConfig.rules,
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    ...sharedConfig.plugins,
  ],
  devtool: 'cheap-module-source-map',
};
