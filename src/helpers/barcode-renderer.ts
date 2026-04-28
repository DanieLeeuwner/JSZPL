import { Box } from '../components/box.ts';
import { Text } from '../components/text.ts';
import { FontFamilyName } from '../enums/font-family-name.ts';
import { AlignmentValue } from '../enums/alignment-value.ts';
import { Alignment } from '../properties/alignment.ts';
import { FontFamily } from '../properties/font-family.ts';
import { BarcodeType } from '../properties/barcode-type.ts';

export class BarcodeRenderer {
  render(width: number, height: number, _type: BarcodeType, _data: string): number[][] {
    const box = new Box();
    box.width = width;
    box.height = height;
    box.border = 2;

    const text = new Text();
    box.content.push(text);
    text.fontFamily = new FontFamily(FontFamilyName.B);
    text.text = 'BARCODE';
    text.verticalAlignment = new Alignment(AlignmentValue.Center);
    text.horizontalAlignment = new Alignment(AlignmentValue.Center);

    const data: number[][] = [];
    for (let y = 0; y < height; y++) {
      data.push([]);
      for (let x = 0; x < width; x++) {
        data[y].push(0);
      }
    }

    box.generateBinaryImage(data, 0, 0, width, height, width, height);

    return data;
  }
}
