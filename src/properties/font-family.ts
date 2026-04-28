import fonts, { FontDefinition } from '../b64-fonts.ts';
import { FontFamilyName } from '../enums/font-family-name.ts';

export class FontFamily {
  readonly typeName = 'FontFamily';
  value: FontFamilyName;

  constructor(value: FontFamilyName) {
    this.value = value;
  }

  get definition(): FontDefinition {
    return fonts[this.value];
  }

  toString(): string {
    return this.value;
  }
}
