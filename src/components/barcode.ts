import { BaseVisualComponent } from './base-visual-component.ts';
import { BarcodeType } from '../properties/barcode-type.ts';
import { BarcodeTypeName } from '../enums/barcode-type-name.ts';
import { LabelTools } from '../helpers/label-tools.ts';

export class Barcode extends BaseVisualComponent {
  readonly typeName = 'Barcode';
  data: string = '';
  dataPrepend: string = '';
  maxLength: number = 32;
  type: BarcodeType = new BarcodeType(BarcodeTypeName.Code11);
  subset: string = '';
  interpretationLine: boolean = true;

  notImplemented = ['typeName', 'invert'];

  generateZPL(
    offsetLeft: number,
    offsetTop: number,
    availableWidth: number,
    availableHeight: number,
    widthUnits?: number,
    heightUnits?: number,
  ): string {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    let zpl = '';

    zpl += `^FO${Math.round(position.left)},${Math.round(position.top)}`;

    if (this.invert) {
      zpl += '^FR';
    }

    const interp = this.interpretationLine ? 'Y' : 'N';

    switch (this.type.value) {
      case BarcodeTypeName.Code11:
        zpl += `^B1N,N,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.Interleaved25:
        zpl += `^B2N,${position.height},${interp},N,N`;
        break;
      case BarcodeTypeName.Code39:
        zpl += `^B3N,N,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.PlanetCode:
        zpl += `^B5N,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.PDF417: {
        const rowHeight = 10;
        const rows = Math.ceil(position.height / rowHeight);
        const bytes = this.maxLength * rows;
        const columns = Math.ceil(bytes / rows);
        zpl += `^B7N,${rowHeight},0,${columns},${rows},N`;
        break;
      }
      case BarcodeTypeName.EAN8:
        zpl += `^B8N,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.UPCE:
        zpl += `^B9N,${position.height},${interp},N,Y`;
        break;
      case BarcodeTypeName.Code93:
        zpl += `^BAN,${position.height},${interp},N,N`;
        break;
      case BarcodeTypeName.Code128:
        zpl += `^BCN,${position.height},${interp},N,N,N`;
        if (this.dataPrepend === '') {
          switch (this.subset) {
            case 'A': this.dataPrepend += '>9'; break;
            case 'B': this.dataPrepend += '>:'; break;
            case 'C': this.dataPrepend += '>;'; break;
          }
        }
        break;
      case BarcodeTypeName.EAN13:
        zpl += `^BEN,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.Industrial25:
        zpl += `^BIN,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.Standard25:
        zpl += `^BJN,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.ANSICodabar:
        zpl += `^BKN,N,${position.height},${interp},N,A,A`;
        break;
      case BarcodeTypeName.Logmars:
        zpl += `^BLN,${position.height},N`;
        break;
      case BarcodeTypeName.MSI:
        zpl += `^BMN,B,${position.height},${interp},N,N`;
        break;
      case BarcodeTypeName.Plessey:
        zpl += `^BPN,N,${position.height},${interp},N`;
        break;
      case BarcodeTypeName.QRCode: {
        const magnification = Math.min(Math.floor(position.height / 25), 10);
        zpl += `^BQ,2,${magnification},Q,7`;
        if (this.dataPrepend === '') {
          this.dataPrepend = 'QA,';
        }
        break;
      }
      case BarcodeTypeName.DataMatrix:
        zpl += '^BXN,10,200,,,~,1';
        break;
      case BarcodeTypeName.PostNet:
        zpl += `^BZN,${position.height},${interp},N`;
        break;
    }

    zpl += `^FD${this.dataPrepend}${this.data}`;
    zpl += '^FS\n';

    return zpl;
  }

  generateBinaryImage(
    binaryBase: (boolean | number)[][],
    offsetLeft: number,
    offsetTop: number,
    availableWidth: number,
    availableHeight: number,
    widthUnits?: number,
    heightUnits?: number,
  ): void {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const barcodeData = LabelTools.BarcodeRenderer.render(position.width, position.height, this.type, this.data);

    for (let y = 0; y < position.height; y++) {
      for (let x = 0; x < position.width; x++) {
        const yIndex = y + position.top;
        const xIndex = x + position.left;
        binaryBase[yIndex][xIndex] = barcodeData[y][x] as unknown as boolean;
      }
    }
  }
}
