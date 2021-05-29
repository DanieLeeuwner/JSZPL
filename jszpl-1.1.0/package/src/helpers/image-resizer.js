module.exports = class ImageResizer {
  constructor() {
  }

  resize(targetWidth, targetHeight, width, height, data) {
    var result = [];

    var dx = width / targetWidth;
    var dy = height / targetHeight;

    for (var y = 0; y < targetHeight; y++) {
      for (var x = 0; x < targetWidth; x++) {
        var iy = Math.floor(dy * y);
        var ix = Math.floor(dx * x);

        var value = data[(iy * width) + ix];

        result.push(value ? 1 : 0);
      }
    }

    return result;
  }
}