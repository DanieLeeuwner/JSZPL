import { PrintDensityValue } from '../enums/print-density-name.ts';

export class PrintDensity {
  readonly typeName = 'PrintDensity';
  value: PrintDensityValue;

  constructor(value: PrintDensityValue) {
    this.value = value;
  }

  static get dpmm6(): PrintDensity {
    return new PrintDensity(6);
  }

  static get dpmm8(): PrintDensity {
    return new PrintDensity(8);
  }

  static get dpmm12(): PrintDensity {
    return new PrintDensity(12);
  }

  static get dpmm24(): PrintDensity {
    return new PrintDensity(24);
  }

  toString(): string {
    return `${this.value} dpmm`;
  }
}
