module.exports = class GridPosition {
  constructor(column, row) {
    this.column = column || 0;
    this.row = row || 0;
  }

  toString() {
    return this.column + ', ' + this.row;
  }
}