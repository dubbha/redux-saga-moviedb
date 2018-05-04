const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node', // ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // ignore modules in node_modules directory
  entry: {
    index: path.resolve(__dirname, 'src'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../src/js'),
        ],
        use: ['babel-loader'],
      },
      {
        test: /\.(ttf|eot|woff|svg|png|jpg|ico)$/,
        use: ['null-loader'],
      },
      {
        test: /\.(css|sass)$/,
        use: ['null-loader'],
      },
    ],
  },
  plugins: [],
};
