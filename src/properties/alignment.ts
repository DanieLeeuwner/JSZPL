import { AlignmentValue } from '../enums/alignment-value.ts';

export class Alignment {
  value: AlignmentValue;

  constructor(value: AlignmentValue) {
    this.value = value;
  }

  static get Start(): Alignment {
    return new Alignment(AlignmentValue.Start);
  }

  static get Center(): Alignment {
    return new Alignment(AlignmentValue.Center);
  }

  static get End(): Alignment {
    return new Alignment(AlignmentValue.End);
  }

  toString(): string {
    return this.value;
  }
}
