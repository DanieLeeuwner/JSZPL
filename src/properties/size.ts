import { SizeType } from '../enums/size-type.ts';

export class Size {
  value: number;
  sizeType: SizeType;

  constructor(value?: number, sizeType?: SizeType) {
    this.value = value ?? 0;
    this.sizeType = sizeType ?? SizeType.Absolute;
  }

  getValue(unitSize?: number): number {
    if (unitSize !== undefined && this.sizeType === SizeType.Relative) {
      return this.value * unitSize;
    }
    return this.value;
  }

  toString(): string {
    return this.value + (this.sizeType === SizeType.Relative ? '*' : '');
  }
}
