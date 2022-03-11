const BaseVisualComponent = require('./base-visual-component.js');
const FontFamily = require('../properties/font-family.js');
const Alignment = require('../properties/alignment.js');
const FontFamilyName = require('../enums/font-family-name.js');
const AlignmentValue = require('../enums/alignment-value.js');

module.exports = class Text extends BaseVisualComponent {
  constructor() {
    super();

    this.typeName = 'Text';

    this.text = '';
    this.fontFamily = new FontFamily(FontFamilyName.A);
    this.lineSpacing = 0;

    // this.rotation = Rotation.Normal;
    this.verticalAlignment = new Alignment(AlignmentValue.Start);
    this.horizontalAlignment = new Alignment(AlignmentValue.Start);

    this.characterWidth = 0;
    this.characterHeight = 0;
  }

  getTextLines() {
    const expression = new RegExp('\\\\r\\\\n|\\\\n', 'g');
    return this.text.replace(expression, '\n').split('\n');
  }

  characterMap() {
    const lineCharacters = [];
    const charset = this.fontFamily.definition.characters;

    const textLines = this.getTextLines();

    for (let textLine of textLines) {
      const currentLineCharacters = [];
      lineCharacters.push(currentLineCharacters);

      for (let character of textLine) {
        if (charset[character] === undefined) {
          character = ' ';
        }

        currentLineCharacters.push(charset[character]);
      }
    }

    return lineCharacters;
  }

  calculateSize() {
    const characters = this.characterMap();
    const height = this.fontFamily.definition.spacing.top + this.fontFamily.definition.size.height + this.fontFamily.definition.spacing.bottom;
    let width = 0;

    for (let line of characters) {
      let lineWidth = 0;

      for (let character of line)
      {
        lineWidth += character[0].length;
        lineWidth += this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;
      }

      width = Math.max(lineWidth, width);
    }

    return {
      width: width,
      height: height
    }
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    const size = this.calculateSize();

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + (position.height / 2) - (size.height / 2);
    }

    let zpl = '';

    if (this.invert) {
      zpl += '^LRY\n';
    }

    let horizontalAlignment;
    let lineSeparator = '';
    switch (this.horizontalAlignment.value) {
      case AlignmentValue.Start:
        horizontalAlignment = 'L';
        break;
      case AlignmentValue.Center:
        horizontalAlignment = 'C';
        lineSeparator = '\\&';
        break;
      case AlignmentValue.End:
        horizontalAlignment = 'R';
        break;
    }

    const lines = this.getTextLines();

    let textOffsetTop = 0;

    for (let line of lines) {
      zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top + textOffsetTop);
      zpl += '^A' + this.fontFamily.value + ',' + (this.characterHeight || '') + ',' + (this.characterWidth || '') + ',' + '\n';
      zpl += '^FB' + Math.round(position.width) + ',1000,0,' + horizontalAlignment + ',0\n';
      zpl += '^FD' + line + lineSeparator + '^FS\n';

      textOffsetTop += this.fontFamily.definition.size.height + this.lineSpacing;
    }

    if (this.invert) {
      zpl += '^LRN\n';
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    const characters = this.characterMap();

    const size = this.calculateSize();

    if (this.horizontalAlignment == AlignmentValue.End) {
      position.left = position.left + position.width - (size.width);
    } else if (this.horizontalAlignment == AlignmentValue.Center) {
      position.left = position.left + (position.width - size.width) / 2;
    }

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + ((position.height) / 2) - (size.height / 2);
    }

    let textOffsetTop = 0;

    for (let line of characters) {
      let textOffsetLeft = 0;

      for (let character of line) {
        const top = position.top + textOffsetTop;
        const left = position.left + textOffsetLeft;

        textOffsetLeft += character[0].length
          + this.fontFamily.definition.spacing.left
          + this.fontFamily.definition.spacing.right;

        for (let y = 0; y < character.length; y++) {
          for (let x = 0; x < character[0].length; x++) {
            const value = character[y][x] == 1;

            const yIndex = Math.round(y + top);
            const xIndex = Math.round(x + left);

            if ((yIndex > 0 && yIndex < binaryBase.length && xIndex > 0 && xIndex < binaryBase[yIndex].length) == false) continue;

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

      textOffsetTop += this.fontFamily.definition.size.height + this.lineSpacing;
    }
  }
}
