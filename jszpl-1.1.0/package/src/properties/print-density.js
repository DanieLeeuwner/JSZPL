module.exports = class PrintDensity {
  constructor(value) {
    this.typeName = 'PrintDensity';

    this.value = value;
  }

  toString() {
    return this.value + ' dpmm';
  }
}
