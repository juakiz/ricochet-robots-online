const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // entry: ['webpack-hot-middleware/client', './src/main'],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  // mode: 'development',
  target: 'web',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|ogg)$/i,
        use: 'file-loader',
      },
      {
        test: /\.woff$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000,
          },
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      excludeChunks: ['server'],
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
