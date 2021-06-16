const BaseComponent = require('./base-component.js');

module.exports = class Raw extends BaseComponent {
  constructor() {
    super();

    this.typeName = 'Raw';

    this.data = '';
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    if (!this.data || this.data === '') {
      return '';
    }

    return this.data + '\n';
  }
}