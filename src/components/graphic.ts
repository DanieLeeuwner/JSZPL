import { BaseVisualComponent } from './base-visual-component.ts';
import { GraphicData } from '../properties/graphic-data.ts';
import { Box } from './box.ts';
import { LabelTools } from '../helpers/label-tools.ts';
import { generateHexAscii, encodeHexAscii } from '../helpers/zpl-image-tools.ts';

export class Graphic extends BaseVisualComponent {
  readonly typeName = 'Graphic';
  data: GraphicData = new GraphicData();
  border: number = 0;

  private generateContainer(): Box {
    const container = new Box();
    container.border = this.border;
    container.margin = this.margin;
    container.top = this.top;
    container.left = this.left;
    return container;
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
    const container = this.generateContainer();
    let zpl = container.generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits, useLegacyPositioning);

    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const imageData = LabelTools.ImageResizer.resize(
      position.width, position.height,
      this.data.width, this.data.height,
      this.data.data,
    );

    zpl += `^FO${Math.round(position.left)},${Math.round(position.top)}`;

    if (this.invert) {
      zpl += '^FR';
    }

    const widthBytes = Math.ceil(position.width / 8);
    const byteCount = widthBytes * position.height;
    let hexData = generateHexAscii(position.width, position.height, imageData);
    hexData = encodeHexAscii(hexData);

    zpl += `^GFA,${byteCount},${byteCount},${widthBytes},${hexData}^FS\n`;

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
    useLegacyPositioning?: boolean,
  ): void {
    const container = this.generateContainer();
    container.generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits, useLegacyPositioning);

    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const imageData = LabelTools.ImageResizer.resize(
      position.width, position.height,
      this.data.width, this.data.height,
      this.data.data,
    );

    for (let y = 0; y < position.height; y++) {
      for (let x = 0; x < position.width; x++) {
        const yIndex = y + position.top;
        const xIndex = x + position.left;
        const index = y * position.width + x;
        const value = imageData[index];

        if (value) {
          if (this.invert) {
            binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
          } else {
            binaryBase[yIndex][xIndex] = true;
          }
        }
      }
    }
  }
}
