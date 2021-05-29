const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/jszpl.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jszpl.bundle.js',
    libraryTarget: 'umd'
  },
};