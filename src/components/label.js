const BaseContainerComponent = require('./base-container-component.js');
const PrintDensity = require('../properties/print-density.js');
const PrintDensityName = require('../enums/print-density-name.js');

module.exports = class Label extends BaseContainerComponent {
  constructor() {
    super();

    this.typeName = 'Label';

    this.printDensity = new PrintDensity(PrintDensityName['8dpmm']);

    this.notImplemented = ['typeName', 'fixed', 'grid', 'margin', 'left', 'top']
  }

  generateZPL() {
    let zpl = '^XA';

    zpl += '\n';

    const width = this.getSize(this.width) * this.printDensity.value;
    const height = this.getSize(this.height) * this.printDensity.value;

    zpl += super.generateZPL(0, 0, width, height);

    zpl += '^XZ';

    return zpl;
  }

  generateBinaryImage(binaryBase) {
    const width = this.getSize(this.width) * this.printDensity.value;
    const height = this.getSize(this.height) * this.printDensity.value;

    for (let y = 0; y < height; y++) {
      binaryBase.push([]);
      for (let x = 0; x < width; x++) {
        binaryBase[y].push(false);
      }
    }

    super.generateBinaryImage(binaryBase, 0, 0, width, height);
  }
}
