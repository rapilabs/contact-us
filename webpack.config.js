const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '../css/style.css',
    disable: process.env.NODE_ENV === 'development',
});

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
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
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
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    extractSass,
  ],
};
