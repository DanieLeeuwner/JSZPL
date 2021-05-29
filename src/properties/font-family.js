module.exports = class FontFamily {
  constructor(value) {
    this.value = value;
  }

  get definition() {
    return FontFamilyDefinition[this.value];
  }

  toString() {
    return this.value;
  }
}
