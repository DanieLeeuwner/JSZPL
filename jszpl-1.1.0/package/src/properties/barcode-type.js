module.exports = class BarcodeType {
  constructor(type) {
    this.typeName = 'BarcodeType';

    this.value = type;
  }

  toString() {
    return this.value;
  }
}