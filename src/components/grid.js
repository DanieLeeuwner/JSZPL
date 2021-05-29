const BaseContainerComponent = require('./base-container-component.js');

module.exports = class Grid extends BaseContainerComponent {
  constructor() {
    super();

    this.columns = [];
    this.rows = [];

    this.columnSpacing = 0;
    this.rowSpacing = 0;
  }

  calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits) {
    var units = this.calculateUnits();

    var spacingLeft = this.margin.left;
    var spacingTop = this.margin.top;

    var spacingHorizontal = spacingLeft + this.margin.right;
    var spacingVertical = spacingTop + this.margin.bottom;

    var width = availableWidth - spacingHorizontal;
    var height = availableHeight - spacingVertical;

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

  generateChildren(availableWidth, availableHeight) {

    var columnDefinitions = this.columns;
    if (columnDefinitions.length == 0) {
      columnDefinitions.push(new Size(1, SizeType.Relative));
    }
    var rowDefinitions = this.rows;
    if (rowDefinitions.length == 0) {
      rowDefinitions.push(new Size(1, SizeType.Relative));
    }

    var units = {
      absolute: {
        width: 0,
        height: 0
      },
      relative: {
        width: 0,
        height: 0
      }
    }

    for (var c_id in columnDefinitions) {
      var cell = columnDefinitions[c_id];

      if (typeof(cell) == 'object') {
        if (cell.sizeType == SizeType.Absolute) {
          units.absolute.width += cell.value;
        } else {
          units.relative.width += cell.value;
        }
      } else if (typeof(cell) == 'number') {
        units.absolute.width += cell;
      }
    }

    for (var c_id in rowDefinitions) {
      var cell = rowDefinitions[c_id];

      if (typeof(cell) == 'object') {
        if (cell.sizeType == SizeType.Absolute) {
          units.absolute.height += cell.value;
        } else {
          units.relative.height += cell.value;
        }
      } else if (typeof(cell) == 'number') {
        units.absolute.height += cell;
      }
    }

    var borderSpacing = (this.border || 0) * 4;

    units.absolute.width += borderSpacing;
    units.absolute.height += borderSpacing;

    var absoluteWidth = (availableWidth - borderSpacing - (this.columnSpacing * (columnDefinitions.length + 1)));
    var absoluteHeight = (availableHeight - borderSpacing - (this.rowSpacing * (rowDefinitions.length + 1)));

    var widthUnits = (absoluteWidth - units.absolute.width) / (units.relative.width || 1);
    var heightUnits = (absoluteHeight - units.absolute.height) / (units.relative.height || 1);

    var content = [];
    var contentCells = [];

    var top = this.rowSpacing;

    var unusedHeight = absoluteHeight + (this.border || 0) * 2;

    for (var y = 0; y < rowDefinitions.length; y++) {
      content[y] = [];

      var unusedWidth = absoluteWidth + (this.border || 0) * 2;

      var left = this.columnSpacing;

      var height = Math.ceil(this.getSize(rowDefinitions[y], heightUnits)) + (this.border || 0);

      if (y == this.rows.length - 1) {
        height = unusedHeight;
      }

      unusedHeight -= height;

      for (var x = 0; x < this.columns.length; x++) {

        var cell = new Box();
        content[y].push(cell);
        contentCells.push(cell);

        var width = Math.ceil(this.getSize(columnDefinitions[x], widthUnits)) + (this.border || 0);

        if (x == this.columns.length - 1) {
          width = unusedWidth;
        }

        unusedWidth -= width;

        cell.width = width;
        cell.height = height;
        cell.top = top;
        cell.left = left;
        cell.border = this.border;
        cell.padding = this.padding;

        left += width + this.columnSpacing;
      }

      top += height + this.rowSpacing;
    }

    for (var c_id in this.content) {
      var element = this.content[c_id];

      if (element.grid.row < 0 || element.grid.row >= rowDefinitions.length) continue;
      if (element.grid.column < 0 || element.grid.column >= columnDefinitions.length) continue;

      content[element.grid.row][element.grid.column].content.push(element);
    }

    var contentBox = new Box();
    contentBox.content = contentCells;
    contentBox.fixed = this.fixed;
    contentBox.width = this.width;
    contentBox.height = this.height;
    contentBox.border = this.border;
    contentBox.invert = this.invert;
    contentBox.padding = new Spacing();

    return contentBox;
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var contentBox = this.generateChildren(position.width, position.height);
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    return contentBox.generateZPL(position.left, position.top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var contentBox = this.generateChildren(position.width, position.height);
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    contentBox.generateBinaryImage(binaryBase, position.left, position.top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
  }
}
