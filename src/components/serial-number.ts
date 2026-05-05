import { Text } from './text.ts';
import { AlignmentValue } from '../enums/alignment-value.ts';

export class SerialNumber extends Text {
  format: string = '0001';
  increment: number = 1;
  printLeadingZeroes: boolean = true;

  getTextLines(): string[] {
    const expression = /\\r\\n|\\n/g;
    return this.format.replace(expression, '\n').split('\n');
  }

  generateZPL(
    offsetLeft: number,
    offsetTop: number,
    availableWidth: number,
    availableHeight: number,
    widthUnits?: number,
    heightUnits?: number,
    useLegacyPositioning?: boolean,
  ): string {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    let horizontalAlignment: string;
    let lineSeparator = '';
    switch (this.horizontalAlignment.value) {
      case AlignmentValue.Start:
        horizontalAlignment = 'L';
        break;
      case AlignmentValue.Center:
        horizontalAlignment = 'C';
        lineSeparator = '\\&';
        break;
      case AlignmentValue.End:
        horizontalAlignment = 'R';
        break;
      default:
        horizontalAlignment = 'L';
    }

    let zpl = `^FO${Math.round(position.left)},${Math.round(position.top)}`;
    zpl += `^A${this.fontFamily.value},${this.characterHeight || ''},${this.characterWidth || ''},\n`;
    zpl += `^FB${Math.round(position.width)},1000,0,${horizontalAlignment},0\n`;
    zpl += `^SN${this.format}${lineSeparator},${this.increment},${this.printLeadingZeroes ? 'Y' : 'N'}^FS\n`;

    return zpl;
  }
}
