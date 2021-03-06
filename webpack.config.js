const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [{
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/'
          }
        }]
      }
    ],
  },
  // Below is needed for webpack-dev-server
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'admin-login.html',
      template: './src/admin-login.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'user-login.html',
      template: './src/user-login.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'user.html',
      template: './src/user.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './src/admin.html'
    }),
  ],
  devServer: {
    contentBase: './dist'
  }
};