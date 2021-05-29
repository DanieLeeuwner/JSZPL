module.exports = class Alignment {
  constructor(value) {
    this.typeName = 'Alignment';

    this.value = value;
  }

  toString() {
    return this.value;
  }
}
