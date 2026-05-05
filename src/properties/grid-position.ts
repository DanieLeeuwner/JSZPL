export class GridPosition {
  column: number;
  row: number;

  constructor(column?: number, row?: number) {
    this.column = column ?? 0;
    this.row = row ?? 0;
  }

  toString(): string {
    return `${this.column}, ${this.row}`;
  }
}
