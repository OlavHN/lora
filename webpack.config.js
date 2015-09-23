var webpack = require('webpack');
module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    "./src/main.js"
  ],
  output: {
    publicPath: '/',
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|woff|eot|ttf|woff2|svg)$/, loader: 'file-loader?limit=100000' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
