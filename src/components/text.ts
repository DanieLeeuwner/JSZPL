import { BaseVisualComponent } from './base-visual-component.ts';
import { FontFamily } from '../properties/font-family.ts';
import { Alignment } from '../properties/alignment.ts';
import { FontFamilyName } from '../enums/font-family-name.ts';
import { AlignmentValue } from '../enums/alignment-value.ts';

export class Text extends BaseVisualComponent {
  text: string = '';
  fontFamily: FontFamily = new FontFamily(FontFamilyName.A);
  lineSpacing: number = 0;
  verticalAlignment: Alignment = new Alignment(AlignmentValue.Start);
  horizontalAlignment: Alignment = new Alignment(AlignmentValue.Start);
  characterWidth: number = 0;
  characterHeight: number = 0;

  getTextLines(): string[] {
    const expression = /\\r\\n|\\n/g;
    return this.text.replace(expression, '\n').split('\n');
  }

  characterMap(): number[][][][] {
    const lineCharacters: number[][][][] = [];
    const charset = this.fontFamily.definition.characters;
    const textLines = this.getTextLines();

    for (const textLine of textLines) {
      const currentLineCharacters: number[][][] = [];
      lineCharacters.push(currentLineCharacters);

      for (let character of textLine) {
        if (charset[character] === undefined) {
          character = ' ';
        }
        currentLineCharacters.push(charset[character]);
      }
    }

    return lineCharacters;
  }

  calculateSize(): { width: number; height: number } {
    const characters = this.characterMap();
    const height =
      this.fontFamily.definition.spacing.top +
      this.fontFamily.definition.size.height +
      this.fontFamily.definition.spacing.bottom;
    let width = 0;

    for (const line of characters) {
      let lineWidth = 0;
      for (const character of line) {
        lineWidth += character[0].length;
        lineWidth += this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;
      }
      width = Math.max(lineWidth, width);
    }

    return { width, height };
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
    const size = this.calculateSize();

    if (this.verticalAlignment.value === AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value === AlignmentValue.Center) {
      position.top = position.top + (position.height / 2) - (size.height / 2);
    }

    let zpl = '';

    if (this.invert) {
      zpl += '^LRY\n';
    }

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

    const lines = this.getTextLines();
    let textOffsetTop = 0;

    for (const line of lines) {
      zpl += `^FO${Math.round(position.left)},${Math.round(position.top + textOffsetTop)}`;
      zpl += `^A${this.fontFamily.value},${this.characterHeight || ''},${this.characterWidth || ''},\n`;
      zpl += `^FB${Math.round(position.width)},1000,0,${horizontalAlignment},0\n`;
      zpl += `^FD${line}${lineSeparator}^FS\n`;

      textOffsetTop += this.fontFamily.definition.size.height + this.lineSpacing;
    }

    if (this.invert) {
      zpl += '^LRN\n';
    }

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
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const characters = this.characterMap();
    const size = this.calculateSize();

    if (this.horizontalAlignment.value === AlignmentValue.End) {
      position.left = position.left + position.width - size.width;
    } else if (this.horizontalAlignment.value === AlignmentValue.Center) {
      position.left = position.left + (position.width - size.width) / 2;
    }

    if (this.verticalAlignment.value === AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value === AlignmentValue.Center) {
      position.top = position.top + (position.height / 2) - (size.height / 2);
    }

    let textOffsetTop = 0;

    for (const line of characters) {
      let textOffsetLeft = 0;

      for (const character of line) {
        const top = position.top + textOffsetTop;
        const left = position.left + textOffsetLeft;

        textOffsetLeft += character[0].length +
          this.fontFamily.definition.spacing.left +
          this.fontFamily.definition.spacing.right;

        for (let y = 0; y < character.length; y++) {
          for (let x = 0; x < character[0].length; x++) {
            const value = character[y][x] === 1;

            const yIndex = Math.round(y + top);
            const xIndex = Math.round(x + left);

            if (!(yIndex > 0 && yIndex < binaryBase.length && xIndex > 0 && xIndex < binaryBase[yIndex].length)) continue;

            if (value) {
              if (this.invert) {
                binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
              } else {
                binaryBase[yIndex][xIndex] = value;
              }
            }
          }
        }
      }

      textOffsetTop += this.fontFamily.definition.size.height + this.lineSpacing;
    }
  }
}
