const BaseGraphicComponent = require('./base-graphic-component.js');

module.exports = class Circle extends BaseGraphicComponent {
  constructor() {
    super();
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert) {
      zpl += '^FR';
    }

    var thickness = this.border;

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
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var yCenter = position.height / 2;
    var xCenter = position.width / 2;

    var widthHalf = position.width / 2;
    var heightHalf = position.height / 2;

    var widthHalfBorder = widthHalf - this.border;
    var heightHalfBorder = heightHalf - this.border;

    if (this.fill || this.border > 0) {
      for (var y = 0; y < position.height; y++) {
        for (var x = 0; x < position.width; x++) {

          var yIndex = Math.round(y + position.top);
          var xIndex = Math.round(x + position.left);

          var value = false;

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
