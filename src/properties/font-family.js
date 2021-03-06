const FontFamilyDefinition = require('../b64-fonts.js');

module.exports = class FontFamily {
  constructor(value) {
    this.typeName = 'FontFamily';

    this.value = value;
  }

  get definition() {
    return FontFamilyDefinition[this.value];
  }

  toString() {
    return this.value;
  }
}
