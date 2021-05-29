module.exports = class Size {
  constructor(value, sizeType) {
    this.value = value || 0;
    this.sizeType = sizeType || SizeType.Absolute;
  }

  getValue(unitSize) {
    if (typeof(unitSize) == 'number' && this.sizeType == SizeType.Relative)
    {
      return this.value * unitSize;
    }
    return this.value;
  }

  toString() {
    return this.value + (this.sizeType == SizeType.Relative ? '*' : '');
  }
}