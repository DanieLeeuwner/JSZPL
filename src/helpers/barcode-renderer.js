const Box = require('../components/box.js');
const Text = require('../components/text.js');
const FontFamilyName = require('../enums/font-family-name.js');
const AlignmentValue = require('../enums/alignment-value.js');
const Alignment = require('../properties/alignment.js');
const FontFamily = require('../properties/font-family.js');

module.exports = class BarcodeRenderer {
  constructor() {

  }

  render(width, height, type, data) {
    const box = new Box();
    box.width = width;
    box.height = height;
    box.border = 2;

    const text = new Text();
    box.content.push(text);
    text.fontFamily = new FontFamily(FontFamilyName.B);
    text.text = 'BARCODE';

    text.verticalAlignment = new Alignment(AlignmentValue.Center);
    text.horizontalAlignment = new Alignment(AlignmentValue.Center);

    data = [];
    for (let y = 0; y < height; y++) {
      data.push([]);
      for (let x = 0; x < width; x++) {
        data[y].push(0);
      }
    }

    box.generateBinaryImage(data, 0, 0, width, height, width, height);

    return data;
  }
}