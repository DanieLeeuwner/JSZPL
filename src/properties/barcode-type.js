module.exports = class BarcodeType {
  constructor(type) {
    this.value = type;
  }

  toString() {
    return this.value;
  }
}