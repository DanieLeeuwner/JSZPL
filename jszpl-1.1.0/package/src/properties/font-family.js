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
