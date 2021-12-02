module.exports = class ImageResizer {
  constructor() {
  }

  resize(targetWidth, targetHeight, width, height, data) {
    const result = [];

    const dx = width / targetWidth;
    const dy = height / targetHeight;

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const iy = Math.floor(dy * y);
        const ix = Math.floor(dx * x);

        const value = data[(iy * width) + ix];

        result.push(value ? 1 : 0);
      }
    }

    return result;
  }
}