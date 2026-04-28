import { AlignmentValue } from '../enums/alignment-value.ts';

export class Alignment {
  readonly typeName = 'Alignment';
  value: AlignmentValue;

  constructor(value: AlignmentValue) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
