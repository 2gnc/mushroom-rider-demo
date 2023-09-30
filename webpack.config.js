const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

  module.exports = {
  entry: './js/index.ts',
   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
      }
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: isDev ? 'dev' : 'NDA Runndev - mvp',
        template: 'index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'assets'),
            to: '.'
          }
        ]
      })
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'assets'),
      },
    },
  };