const BaseVisualComponent = require('./base-visual-component.js');

module.exports = class Line extends BaseVisualComponent {
  constructor() {
    super();

    this.typeName = 'Line';

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.thickness = 1;
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    if (this.thickness <= 0) {
      return '';
    }

    let zpl = '^FO' + Math.round(position.left + Math.min(this.x1, this.x2)) + ',' + Math.round(position.top + Math.min(this.y1, this.y2));

    if (this.invert) {
      zpl += '^FR';
    }

    const width = Math.abs(this.x1 - this.x2);
    const height = Math.abs(this.y1 - this.y2);

    let orientation = 'R';

    if ((this.x1 < this.x2 && this.y1 < this.y2) || (this.x2 < this.x1 && this.y1 < this.y2)) {
      orientation = 'L';
    }

    zpl += `^GD${width},${height},${this.thickness},B,${orientation}^FS\n`;

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }


  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    if (this.thickness > 0) {
      const yDiff = this.y1 < this.y2 ? 1 : -1;
      const xDiff = this.x1 < this.x2 ? 1 : -1;

      const lineAngle = Math.atan2(this.y1 - this.y2, this.x1 - this.x2);

      for (let y = this.y1; y != this.y2; y += yDiff) {
        for (let x = this.x1; x != this.x2; x += xDiff) {

          const xIndex = x + position.left;
          const yIndex = y + position.top;

          if (yIndex < 0 || xIndex < 0 || yIndex >= binaryBase.length || xIndex >= binaryBase[yIndex].length) {
            continue;
          }

          const distance = Math.sqrt(Math.pow(this.x1 - x, 2) + Math.pow(this.y1 - y, 2));
          const angle = Math.atan2(this.y1 - y, this.x1 - x);
          const t = Math.abs(Math.sin(angle - lineAngle) * distance);

          if (t > this.thickness / 2) {
            continue;
          }

          if (this.invert) {
            binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
          } else {
            binaryBase[yIndex][xIndex] = true;
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }

}