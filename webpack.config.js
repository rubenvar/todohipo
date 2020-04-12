const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// .js files
const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-env'] },
    },
  ],
};

// postCSS loader
// const postcss = {
//   loader: 'postcss-loader',
//   options: {
//     plugins: [],
//   },
// };

// sass/css loader
const styles = {
  test: /\.(scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    'css-loader?sourceMap',
    // postcss,
    'sass-loader?sourceMap',
  ],
};

// plugins
// const uglify = new webpack.optimize.UglifyJsPlugin({
//   compress: { warnings: false },
// });
const minMoment = new webpack.ContextReplacementPlugin(
  /moment[\/\\]locale$/,
  /en/
);
// new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)

// put it all together
const config = {
  entry: {
    App: './public/javascripts/th-app.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [javascript, styles],
  },
  plugins: [
    // uglify,
    minMoment,
    new MiniCssExtractPlugin('style.css'),
  ],
  mode: 'development',
};
// process.noDeprecation = true;

module.exports = config;
