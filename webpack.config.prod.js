const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
        //     { loader: 'postcss-loader', options: { sourceMap: true } },
        //     { loader: 'sass-loader', options: { sourceMap: true } },
        //   ],
        // }),
      },
      ...sharedConfig.rules,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    ...sharedConfig.plugins,
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'source-map',
};
