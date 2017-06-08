const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    __dirname + '/src/main.tsx',
  ],
  output: {
    filename: 'main.js',
    path: __dirname + '/dist/js',
    publicPath: '/js/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname + '/public',
    hot: true,
    publicPath: '/js/',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
