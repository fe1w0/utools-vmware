const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  mode: 'none',
  target: 'node',
  entry: './src/index.jsx',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public', to: ''},
      ],
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    filename: 'preload.js',
  },
}
