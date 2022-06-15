const BaseGraphicComponent = require('./base-graphic-component.js');

module.exports = class Box extends BaseGraphicComponent {
  constructor() {
    super();

    this.typeName = 'Box';

    this.cornerRadius = 0;
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

    const shorterSide = Math.min(position.width, position.height);
    const roundingIndex = Math.round((this.cornerRadius * 16) / shorterSide);

    if (thickness > 0) {
      zpl += '^GB' + position.width + ',' + position.height + ',' + (thickness || '') + ',,' + roundingIndex + '^FS' + '\n';
    } else {
      zpl += '\n';
    }

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    const borderSize = (this.border || 0);

    const yTop = this.cornerRadius;
    const yBottom = position.height - this.cornerRadius - 1;
    const xLeft = this.cornerRadius;
    const xRight = position.width - this.cornerRadius - 1;

    if (this.fill || this.border > 0) {
      for (let y = 0; y < position.height; y++) {
        for (let x = 0; x < position.width; x++) {

          const xIndex = x + position.left;
          const yIndex = y + position.top;

          if (yIndex < 0 || xIndex < 0 || yIndex >= binaryBase.length || xIndex >= binaryBase[yIndex].length) continue;

          let center = undefined;
          if (this.cornerRadius > 0) {
            if (y < yTop) {
              if (x < xLeft) {
                // top left
                center = {
                  x: xLeft,
                  y: yTop,
                }
              } else if (x > xRight) {
                // top right
                center = {
                  x: xRight,
                  y: yTop,
                }
              }
            } else if (y > yBottom) {
              if (x < xLeft) {
                // bottom left
                center = {
                  x: xLeft,
                  y: yBottom,
                }
              } else if (x > xRight) {
                // bottom right
                center = {
                  x: xRight,
                  y: yBottom,
                }
              }
            }
          }

          if (center != undefined) {
            const distance = Math.sqrt(Math.pow(y - center.y, 2) + Math.pow(x - center.x, 2));
            if (distance <= this.cornerRadius + 1) {
              if (this.fill || distance >= this.cornerRadius - this.border) {
                if (this.invert) {
                  binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
                } else {
                  binaryBase[yIndex][xIndex] = true;
                }
              }
            }
            continue;
          }

          if ((this.fill) || (y < borderSize) || (y >= position.height - borderSize) || (x < borderSize) || (x >= position.width - borderSize)) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = true;
            }
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }
}
