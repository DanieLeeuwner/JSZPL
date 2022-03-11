module.exports = class Spacing {

  constructor(left, top, right, bottom) {
    this.typeName = 'Spacing';

    this.left = left || 0;
    this.top = (top == undefined ? this.left : top);
    this.right = (right == undefined ? this.left : right);
    this.bottom = (bottom == undefined ? this.top : bottom);
  }

  get horizontal() {
    return this.left + this.right;
  }

  get vertical() {
    return this.top + this.bottom;
  }

  get horizontalDifference() {
    return Math.abs(this.left - this.right);
  }

  get verticalDifference() {
    return Math.abs(this.top - this.bottom);
  }

  toString() {
    return this.left + ', ' + this.top + ', ' + this.right + ', ' + this.bottom;
  }
}