module.exports = class GridPosition {
  constructor(column, row) {
    this.typeName = 'GridPosition';

    this.column = column || 0;
    this.row = row || 0;
  }

  toString() {
    return this.column + ', ' + this.row;
  }
}