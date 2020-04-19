const path = require('path');

const config = {
  mode: 'development',
  entry: './src/Editor.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Editor.js',
    library: 'Editor',
    libraryTarget: 'umd',
    libraryExport: 'default',
    auxiliaryComment: 'umd comment',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          path.join(__dirname, 'src/css/editor.css'),
        ]
      }]
  },
  resolve: {
    extensions: [
      '.js'
    ]
  }
}

module.exports = config;