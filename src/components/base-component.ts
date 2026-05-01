export abstract class BaseComponent {
  generateZPL(
    _offsetLeft: number,
    _offsetTop: number,
    _availableWidth: number,
    _availableHeight: number,
    _widthUnits?: number,
    _heightUnits?: number,
    useLegacyPositioning?: boolean,
  ): string {
    return '';
  }

  generateXML(_availableWidth: number, _availableHeight: number): string {
    return '';
  }

  generateBinaryImage(
    _binaryBase: (boolean | number)[][],
    _offsetLeft: number,
    _offsetTop: number,
    _availableWidth: number,
    _availableHeight: number,
    _widthUnits?: number,
    _heightUnits?: number,
    useLegacyPositioning?: boolean,
  ): void {
    // override in subclasses
  }
}
