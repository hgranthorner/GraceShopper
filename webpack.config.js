const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'js', 'client', 'src', 'index.js'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'src', 'client', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}
