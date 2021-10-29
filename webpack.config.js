require('dotenv').config();
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

// .js files
const javascript = {
  test: /\.(js)$/,
  exclude: '/node_modules/',
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-env'] },
    },
  ],
};

// sass/css loader
const styles = {
  test: /\.(scss)$/,
  use: [
    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [autoprefixer()],
        },
      },
    },
    'sass-loader',
  ],
};

const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
};

// put it all together
const config = {
  entry: {
    App: './public/javascripts/th-app.js',
  },
  devtool: 'source-map',
  // this replaces the uglify plugin
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js',
  },
  target: 'web',
  module: {
    rules: [javascript, styles, fonts],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new MiniCssExtractPlugin({filename: 'style.css'})],
  stats: {errorDetails: true}
};

module.exports = config;
