const BaseVisualComponent = require('./base-visual-component.js');

module.exports = class BaseContainerComponent extends BaseVisualComponent {
  constructor() {
    super();

    this.padding = new Spacing();

    this.content = [];
  }

  calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits) {
    var units = this.calculateUnits();

    var spacingLeft = this.margin.left + this.padding.left;
    var spacingTop = this.margin.top + this.padding.top;

    var spacingHorizontal = spacingLeft + this.margin.right + this.padding.right;
    var spacingVertical = spacingTop + this.margin.bottom + this.padding.right;

    var width = availableWidth - spacingHorizontal - (this.border || 0) * 2;
    var height = availableHeight - spacingVertical - (this.border || 0) * 2;

    var widthUnits = (width - units.absolute.width) / (units.relative.width || 1);
    var heightUnits = (height - units.absolute.height) / (units.relative.height || 1);

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
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '';

    for (var c_id in this.content) {
      var element = this.content[c_id];

      var left = offsetLeft + sizing.spacingLeft + (this.border || 0);
      var top = offsetTop + sizing.spacingTop + (this.border || 0);

      if (element.fixed) {
        left = this.getSize(element.left);
        top = this.getSize(element.top);
      }

      zpl += element.generateZPL(left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    for (var c_id in this.content) {
      var element = this.content[c_id];

      var left = offsetLeft + sizing.spacingLeft + (this.border || 0);
      var top = offsetTop + sizing.spacingTop + (this.border || 0);

      if (element.fixed) {
        left = this.getSize(element.left);
        top = this.getSize(element.top);
      }

      element.generateBinaryImage(binaryBase, left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
    }
  }
}