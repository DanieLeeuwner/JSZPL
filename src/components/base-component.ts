export abstract class BaseComponent {
  notImplemented: string[] = ['typeName'];

  generateZPL(
    _offsetLeft: number,
    _offsetTop: number,
    _availableWidth: number,
    _availableHeight: number,
    _widthUnits?: number,
    _heightUnits?: number,
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
  ): void {
    // override in subclasses
  }
}
