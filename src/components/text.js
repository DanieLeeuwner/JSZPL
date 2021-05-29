const BaseVisualComponent = require('./base-visual-component.js');

module.exports = class Text extends BaseVisualComponent {
  constructor() {
    super();

    this.text = '';
    this.fontFamily = new FontFamily(FontFamilyName.A);

    // this.rotation = Rotation.Normal;
    this.verticalAlignment = new Alignment(AlignmentValue.Start);
    this.horizontalAlignment = new Alignment(AlignmentValue.Start);
  }

  characterMap() {
    var characters = [];
    for (var c_id in this.text) {
      let character = this.text[c_id];
      let charset = this.fontFamily.definition.characters;

      if (charset[character] === undefined) {
        character = ' ';
      }

      characters.push(charset[character]);
    }
    return characters;
  }

  calculateSize() {
    var characters = this.characterMap();
    var height = characters[0].length + this.fontFamily.definition.spacing.top + this.fontFamily.definition.spacing.bottom;
    var width = 0;

    for (var c_id in characters)
    {
      var character = characters[c_id];
      width += character[0].length;
      width += this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;
    }

    return {
      width: width,
      height: height
    }
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var size = this.calculateSize();

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + (position.height / 2) - (size.height / 2);
    }

    var zpl = '';

    if (this.invert) {
      zpl += '^LRY\n';
    }

    var horizontalAlignment;
    switch (this.horizontalAlignment.value) {
      case AlignmentValue.Start:
        horizontalAlignment = 'L'
        break;
      case AlignmentValue.Center:
        horizontalAlignment = 'C'
        break;
      case AlignmentValue.End:
        horizontalAlignment = 'R'
        break;
    }

    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);
    zpl += '^A' + this.fontFamily.value + ',' + 'N' + ',,' + '\n';
    zpl += '^FB' + Math.round(position.width) + ',1,0,' + horizontalAlignment + ',0\n';
    zpl += '^FD' + this.text + '^FS\n';

    if (this.invert) {
      zpl += '^LRN\n';
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var characters = this.characterMap();

    var size = this.calculateSize();

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

    for (var c_id in characters) {
      var character = characters[c_id];

      var top = position.top;
      var left = position.left;

      position.left += character[0].length + this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;

      for (var y = 0; y < character.length; y++) {
        for (var x = 0; x < character[0].length; x++) {
          var value = character[y][x] == 1;

          var yIndex = Math.round(y + top);
          var xIndex = Math.round(x + left);

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
  }
}
