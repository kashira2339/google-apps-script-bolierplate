const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GasPlugin = require('gas-webpack-plugin')
const dayjs = require('dayjs')

const destination = 'dist'
const mode = 'none' // or production
const getFileName = () => {
  const dt = dayjs().format('YYYYMMDDHHmm')
  return `code-${dt}.gs`
}

module.exports = {
  mode,
  context: __dirname,
  entry: './src/index.ts',
  output: {
    filename: getFileName(),
    path: path.resolve(__dirname, destination)
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          cache: true,
          failOnError: false
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './src/**/*.html',
        flatten: true,
        to: path.resolve(__dirname, destination)
      },
      {
        from: './appsscript.json',
        to: path.resolve(__dirname, destination)
      }
    ]),
    new GasPlugin()
  ]
}
