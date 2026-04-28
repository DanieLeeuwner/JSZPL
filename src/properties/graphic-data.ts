export class GraphicData {
  readonly typeName = 'GraphicData';
  data: number[];
  width: number;
  height: number;

  constructor(width?: number, height?: number, data?: number[]) {
    this.data = data ?? [];
    this.width = width ?? 0;
    this.height = height ?? 0;
  }

  toString(): string {
    return `${this.width} x ${this.height}`;
  }
}
