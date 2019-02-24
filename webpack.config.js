const path                = require('path')
const webpack             = require('webpack')
const CleanWebpackPlugin  = require('clean-webpack-plugin')
const HtmlWebpackPlugin   = require('html-webpack-plugin')
const ExtractTextPlugin   = require('extract-text-webpack-plugin')

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css',
  publicPath: '/'
})

const config = {
  entry: './app.js',
  output: {
    filename  : 'app.bundle.js',
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  context: path.resolve(__dirname, "src"),
  devServer: {
    contentBase: path.resolve(__dirname, "dist/assets/media"),
    stats: 'errors-only',
    open: true,
    port: 12000,
    compress: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractPlugin
  ],
}

module.exports = config

// plugins: [
//     new CleanWebpackPlugin(['dist']),
//     new HtmlWebpackPlugin({
//       template: 'index.html'
//     }),
//     extractPlugin
//   ],