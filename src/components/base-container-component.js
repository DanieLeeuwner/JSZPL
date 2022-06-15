const BaseVisualComponent = require('./base-visual-component.js');
const Spacing = require('../properties/spacing.js');

module.exports = class BaseContainerComponent extends BaseVisualComponent {
  constructor() {
    super();

    this.padding = new Spacing();

    this.content = [];
  }

  calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits) {
    const units = this.calculateUnits();

    const spacingLeft = this.margin.left + this.padding.left;
    const spacingTop = this.margin.top + this.padding.top;

    const spacingHorizontal = spacingLeft + this.margin.right + this.padding.right;
    const spacingVertical = spacingTop + this.margin.bottom + this.padding.right;

    const width = availableWidth - spacingHorizontal - (this.border || 0) * 2;
    const height = availableHeight - spacingVertical - (this.border || 0) * 2;

    widthUnits = (width - units.absolute.width) / (units.relative.width || 1);
    heightUnits = (height - units.absolute.height) / (units.relative.height || 1);

    return {
      spacingTop: spacingTop,
      spacingLeft: spacingLeft,
      width: width,
      height: height,
      widthUnits: widthUnits,
      heightUnits: heightUnits,
    }
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    let zpl = '';

    for (let c_id in this.content) {
      const element = this.content[c_id];

      let left = offsetLeft + sizing.spacingLeft + (this.border || 0);
      let top = offsetTop + sizing.spacingTop + (this.border || 0);

      if (element.fixed) {
        left = this.getSize(element.left);
        top = this.getSize(element.top);
      }

      zpl += element.generateZPL(left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    const sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    for (let c_id in this.content) {
      const element = this.content[c_id];

      let left = offsetLeft + sizing.spacingLeft + (this.border || 0);
      let top = offsetTop + sizing.spacingTop + (this.border || 0);

      if (element.fixed) {
        left = this.getSize(element.left);
        top = this.getSize(element.top);
      }

      element.generateBinaryImage(binaryBase, left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
    }
  }
}