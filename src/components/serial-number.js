const BaseVisualComponent = require('./base-visual-component.js');
const FontFamily = require('../properties/font-family.js');
const Alignment = require('../properties/alignment.js');
const FontFamilyName = require('../enums/font-family-name.js');
const AlignmentValue = require('../enums/alignment-value.js');

module.exports = class Text extends BaseVisualComponent {
  constructor() {
    super();

    this.typeName = 'SerialNumber';
    this.fontFamily = new FontFamily(FontFamilyName.A);
    this.characterWidth = 0;
    this.characterHeight = 0;
    this.horizontalAlignment = new Alignment(AlignmentValue.Start);

    this.prependText = '';
    this.startValue = '1';
    this.increment = 1;
    this.leadingZeroes = false;
  }

  getTextLines() {
    const expression = new RegExp('\\\\r\\\\n|\\\\n', 'g');
    return this.prependText.replace(expression, '\n').split('\n');
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
    zpl += '^FB' + Math.round(position.width) + ',1,0,' + horizontalAlignment + ',0\n';

    zpl += '^SN' + this.prependText + this.startValue + lineSeparator + ',' + this.increment + ',' + (( this.leadingZeroes )? 'Y': 'N' ) + '^FS\n';
    return zpl;
  }
}
