require('dotenv').config();
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
  test: /\.(sa|sc|c)ss$/,
  use: [
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#recommended
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
  entry: './js/app.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
  },
  target: 'web',
  module: {
    rules: [javascript, styles, fonts],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [].concat(
    isDevMode ? [] : [new MiniCssExtractPlugin({ filename: 'app.style.css' })]
  ),
  // stats: { errorDetails: true, children: false },
};

console.log('🚀 isDevMode?', isDevMode);

module.exports = config;
