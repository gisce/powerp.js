const path = require('path');

module.exports = {
  entry: './src/powerp/index.js',
  output: {
    filename: 'powerp.js',
    path: path.resolve(__dirname, 'dist')
  }
};