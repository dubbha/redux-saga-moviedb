const path = require('path');

const extensions = ['.js', '.json', '.jsx'];

const rules = [
  {
    test: /\.jsx?$/,
    include: path.resolve(__dirname, 'src/js'),
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  },
  {
    test: /\.(ttf|eot|woff|svg|png|jpg|ico)$/,
    use: [
      {
        loader: 'file-loader',
        query: { name: '[name].[ext]' },
      },
    ],
  },
];


const plugins = [];

module.exports = {
  extensions,
  rules,
  plugins,
};
