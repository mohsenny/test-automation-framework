// webpack.config.js
const path = require('path');

module.exports = {
  target: 'node',  
  entry: './dist/index.js',                 // Entry point of your code
  mode: 'development',                      // or 'production'
  output: {
    filename: 'bundle.js',                  // Name of the output bundle
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  resolve: {
    fallback: {
      "fs": false,          // You can use an empty module
      "zlib": false,        // You can use an empty module
      "http": false,        // You can use an empty module
      "https": false,       // You can use an empty module
    },
  },
};
