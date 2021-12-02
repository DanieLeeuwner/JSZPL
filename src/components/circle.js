const BaseGraphicComponent = require('./base-graphic-component.js');

module.exports = class Circle extends BaseGraphicComponent {
  constructor() {
    super();

    this.typeName = 'Circle';
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    let zpl = '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert) {
      zpl += '^FR';
    }

    let thickness = this.border;

    if (this.fill) {
      thickness = Math.min(position.width, position.height);
    }

    if (thickness > 0) {
      if (position.width != position.height) {
        // ellipse
        zpl += '^GE' + position.width + ',' + position.height + ',' + (thickness || '') + ',B' + '^FS' + '\n';
      } else {
        // circle
        zpl += '^GC' + position.width + ',' + (thickness || '') + ',B' + '^FS' + '\n';
      }
    } else {
      zpl += '\n';
    }

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    const yCenter = position.height / 2;
    const xCenter = position.width / 2;

    const widthHalf = position.width / 2;
    const heightHalf = position.height / 2;

    const widthHalfBorder = widthHalf - this.border;
    const heightHalfBorder = heightHalf - this.border;

    if (this.fill || this.border > 0) {
      for (let y = 0; y < position.height; y++) {
        for (let x = 0; x < position.width; x++) {

          const yIndex = Math.round(y + position.top);
          const xIndex = Math.round(x + position.left);

          let value = false;

          value = (Math.pow(x - xCenter, 2) / Math.pow(widthHalf, 2)) + (Math.pow(y - yCenter, 2) / Math.pow(heightHalf, 2)) <= 1;
          if (this.fill == false) {
            value &= (Math.pow(x - xCenter, 2) / Math.pow(widthHalfBorder, 2)) + (Math.pow(y - yCenter, 2) / Math.pow(heightHalfBorder, 2)) >= 1;
          }

          if (value) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = value;
            }
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }
}
