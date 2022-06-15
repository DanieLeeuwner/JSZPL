const Text = require('./text.js');
const AlignmentValue = require('../enums/alignment-value.js');

module.exports = class SerialNumber extends Text {
  constructor() {
    super();

    this.typeName = 'SerialNumber';

    this.format = '0001';
    this.increment = 1;
    this.printLeadingZeroes = true;
  }

  getTextLines() {
    const expression = new RegExp('\\\\r\\\\n|\\\\n', 'g');
    return this.format.replace(expression, '\n').split('\n');
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    let zpl = '';

    let horizontalAlignment;
    let lineSeparator = '';
    switch ( this.horizontalAlignment.value ) {
      case AlignmentValue.Start:
        horizontalAlignment = 'L'
        break;
      case AlignmentValue.Center:
        horizontalAlignment = 'C'
        lineSeparator = '\\&'
        break;
      case AlignmentValue.End:
        horizontalAlignment = 'R'
        break;
    }
    
    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);
    zpl += '^A' + this.fontFamily.value + ',' + (this.characterHeight || '') + ',' + (this.characterWidth || '') + ',' + '\n';
    zpl += '^FB' + Math.round(position.width) + ',1000,0,' + horizontalAlignment + ',0\n';
    zpl += '^SN' + this.format + lineSeparator + ',' + this.increment + ',' + (this.printLeadingZeroes ? 'Y': 'N') + '^FS\n';
    
    return zpl;
  }
}
