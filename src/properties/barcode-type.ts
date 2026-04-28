import { BarcodeTypeName } from '../enums/barcode-type-name.ts';

export class BarcodeType {
  readonly typeName = 'BarcodeType';
  value: BarcodeTypeName;

  constructor(type: BarcodeTypeName) {
    this.value = type;
  }

  static get Code11(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Code11);
  }

  static get Interleaved25(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Interleaved25);
  }

  static get Code39(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Code39);
  }

  static get PlanetCode(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.PlanetCode);
  }

  static get PDF417(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.PDF417);
  }

  static get EAN8(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.EAN8);
  }

  static get UPCE(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.UPCE);
  }

  static get Code93(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Code93);
  }

  static get Code128(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Code128);
  }

  static get EAN13(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.EAN13);
  }

  static get Industrial25(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Industrial25);
  }

  static get Standard25(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Standard25);
  }

  static get ANSICodabar(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.ANSICodabar);
  }

  static get Logmars(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Logmars);
  }

  static get MSI(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.MSI);
  }

  static get Plessey(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.Plessey);
  }

  static get QRCode(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.QRCode);
  }

  static get DataMatrix(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.DataMatrix);
  }

  static get PostNet(): BarcodeType {
    return new BarcodeType(BarcodeTypeName.PostNet);
  }

  toString(): string {
    return this.value;
  }
}
