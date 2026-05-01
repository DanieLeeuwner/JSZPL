import { BaseComponent } from './base-component.ts';

export class Raw extends BaseComponent {
  readonly typeName = 'Raw';
  data: string = '';

  generateZPL(
    _offsetLeft: number,
    _offsetTop: number,
    _availableWidth: number,
    _availableHeight: number,
    _widthUnits?: number,
    _heightUnits?: number,
    useLegacyPositioning?: boolean,
  ): string {
    if (!this.data || this.data === '') {
      return '';
    }
    return this.data + '\n';
  }
}
