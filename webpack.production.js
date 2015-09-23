var webpack = require('webpack');

module.exports = {
  entry: [
    './index.html',
    './src/main.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.js?$/, loaders: ['babel?stage=1'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
      { test: /\.(png|woff|eot|ttf|woff2|svg)$/, loader: 'file-loader?limit=100000' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
