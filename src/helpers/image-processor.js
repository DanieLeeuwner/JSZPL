module.exports = class ImageProcessor {
  contstructor() {
    this.processor = undefined;
  }

  processImage(data, cb) {
    LabelTools.Logger("Image Processor not defined");
    cb([]);
  }

  processZplImage(width, height, data) {

  }
}