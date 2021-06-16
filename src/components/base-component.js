module.exports = class BaseComponent {
  constructor() {
    this.notImplemented = ['typeName'];
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    return '';
  }

  generateXML(availableWidth, availableHeight) {
    return '';
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

  }
}