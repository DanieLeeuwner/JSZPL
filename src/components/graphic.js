const BaseVisualComponent = require('./base-visual-component.js');
const GraphicData = require('../properties/graphic-data.js');
const { ImageProcessor } = require('../helpers/label-tools.js');
const Box = require('./box.js');
const LabelTools = require('../helpers/label-tools.js');
const ZPLImageTools = require('../helpers/zpl-image-tools.js');

module.exports = class Graphic extends BaseVisualComponent {
  constructor() {
    super();

    this.typeName = 'Graphic';

    this.data = new GraphicData();
    this.border = 0;
  }

  generateContainer() {
    const container = new Box();
    container.border = this.border;
    container.margin = this.margin;
    container.top = this.top;
    container.left = this.left;
    return container;
  }

  extractImageData(cb) {
    const processor = LabelTools.ImageProcessor || new ImageProcessor();
    const imageData = processor.processImage(this.data);
    cb(imageData);
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const container = this.generateContainer();
    let zpl = container.generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const imageData = LabelTools.ImageResizer.resize(position.width, position.height, this.data.width, this.data.height, this.data.data);

    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert)
    {
      zpl += "^FR";
    }

    const widthBytes = Math.ceil(position.width / 8);
    const byteCount = widthBytes * position.height;
    let hexData = ZPLImageTools.generateHexAscii(position.width, position.height, imageData);
    hexData = ZPLImageTools.encodeHexAscii(hexData);

    zpl += '^GFA,' + byteCount + ',' + byteCount + ',' + widthBytes + ',' + hexData + '^FS\n';

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const container = this.generateContainer();
    container.generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const imageData = LabelTools.ImageResizer.resize(position.width, position.height, this.data.width, this.data.height, this.data.data);

    for (let y = 0; y < position.height; y++) {
      for (let x = 0; x < position.width; x++) {

        const yIndex = y + position.top;
        const xIndex = x + position.left;

        const index = y * position.width + x;

        let value = imageData[index];

        if (value) {
          if (this.invert) {
            binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
          } else {
            binaryBase[yIndex][xIndex] = true;
          }
        }
      }
    }
  }
}
