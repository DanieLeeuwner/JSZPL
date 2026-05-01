import { BaseContainerComponent } from './base-container-component.ts';
import { PrintDensity } from '../properties/print-density.ts';
import { PrintDensityName } from '../enums/print-density-name.ts';

export class Label extends BaseContainerComponent {
  readonly typeName = 'Label';
  printDensity: PrintDensity = new PrintDensity(PrintDensityName['8dpmm']);
  useLegacyPositioning: boolean = false;

  generateZPL(): string {
    let zpl = '^XA\n';

    const width = this.getSize(this.width) * this.printDensity.value;
    const height = this.getSize(this.height) * this.printDensity.value;

    zpl += super.generateZPL(0, 0, width, height, undefined, undefined, this.useLegacyPositioning);
    zpl += '^XZ';

    return zpl;
  }

  generateBinaryImage(binaryBase: (boolean | number)[][]): void {
    const width = this.getSize(this.width) * this.printDensity.value;
    const height = this.getSize(this.height) * this.printDensity.value;

    for (let y = 0; y < height; y++) {
      binaryBase.push([]);
      for (let x = 0; x < width; x++) {
        (binaryBase[y] as boolean[]).push(false);
      }
    }

    super.generateBinaryImage(binaryBase, 0, 0, width, height, undefined, undefined, this.useLegacyPositioning);
  }
}
