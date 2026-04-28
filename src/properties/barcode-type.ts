import { BarcodeTypeName } from '../enums/barcode-type-name.ts';

export class BarcodeType {
  readonly typeName = 'BarcodeType';
  value: BarcodeTypeName;

  constructor(type: BarcodeTypeName) {
    this.value = type;
  }

  toString(): string {
    return this.value;
  }
}
