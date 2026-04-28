export class Spacing {
  readonly typeName = 'Spacing';
  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor(left?: number, top?: number, right?: number, bottom?: number) {
    this.left = left ?? 0;
    this.top = top === undefined ? this.left : top;
    this.right = right === undefined ? this.left : right;
    this.bottom = bottom === undefined ? this.top : bottom;
  }

  get horizontal(): number {
    return this.left + this.right;
  }

  get vertical(): number {
    return this.top + this.bottom;
  }

  get horizontalDifference(): number {
    return Math.abs(this.left - this.right);
  }

  get verticalDifference(): number {
    return Math.abs(this.top - this.bottom);
  }

  toString(): string {
    return `${this.left}, ${this.top}, ${this.right}, ${this.bottom}`;
  }
}
