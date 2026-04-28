import fonts, { FontDefinition } from '../b64-fonts.ts';
import { FontFamilyName } from '../enums/font-family-name.ts';

export class FontFamily {
  readonly typeName = 'FontFamily';
  value: FontFamilyName;

  constructor(value: FontFamilyName) {
    this.value = value;
  }

  static get A(): FontFamily {
    return new FontFamily(FontFamilyName.A);
  }

  static get B(): FontFamily {
    return new FontFamily(FontFamilyName.B);
  }

  static get D(): FontFamily {
    return new FontFamily(FontFamilyName.D);
  }

  static get E(): FontFamily {
    return new FontFamily(FontFamilyName.E);
  }

  static get F(): FontFamily {
    return new FontFamily(FontFamilyName.F);
  }

  get definition(): FontDefinition {
    return fonts[this.value];
  }

  toString(): string {
    return this.value;
  }
}
