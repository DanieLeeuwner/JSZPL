const ImageProcessor = require('./image-processor.js');
const ImageResizer = require('./image-resizer.js');

module.exports = {
  ImageProcessor: new ImageProcessor(),
  ImageResizer: new ImageResizer(),
  Logger: function(msg) { console.log(msg); },
}