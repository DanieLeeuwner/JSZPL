module.exports = class PrintDensity {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value + ' dpmm';
  }
}
