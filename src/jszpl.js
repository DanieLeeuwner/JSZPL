"use strict";

var FontFamilyDefinition = require('./b64-fonts');
FontFamilyDefinition.initialize();

/* Properties */

var SizeType = {
  Absolute : 0, // exact size
  Fraction : 1, // size as part of parent
  Relative : 2, // size together with siblings as part of parent
}

var Rotation = {
  Normal : 'N',
  Right : 'R',
  Bottom : 'I',
  Left : 'B'
}

var PrintDensityName = {
  '6dpmm' : 6,
  '8dpmm' : 8,
  '12dpmm' : 12,
  '24dpmm' : 24,
}

var FontFamilyName = {
  A : 'A',
  B : 'B',
  D : 'D',
  E : 'E',
  F : 'F',
  /*G : 'G',
  H : 'H',
  P : 'P',
  Q : 'Q',
  U : 'U',
  V : 'V',*/
}

var BarcodeTypeName = {
  Code11: 'Code11',
  Interleaved25: 'Interleaved25',
  Code39: 'Code39',
  PlanetCode: 'PlanetCode',
  PDF417: 'PDF417',
  EAN8: 'EAN8',
  UPCE: 'UPCE',
  Code93: 'Code93',
  Code128: 'Code128',
  EAN13: 'EAN13',
  Industrial25: 'Industrial25',
  Standard25: 'Standard25',
  ANSICodabar: 'ANSICodabar',
  Logmars: 'Logmars',
  MSI: 'MSI',
  Plessey: 'Plessey',
  QRCode: 'QRCode',
  DataMatrix: 'DataMatrix',
  PostNet: 'PostNet'
}

var Code128Subset = {
  A: 'A',
  B: 'B',
  C: 'C'
}

var AlignmentValue = {
  Start: 'Start',
  Center: 'Center',
  End: 'End',
}

var LabelTools = {
  ImageProcessor: undefined,
  ImageResizer: undefined,
  Logger: function(msg) { console.log(msg); },
}

class ImageProcessor {
  contstructor() {
    this.processor = undefined;
  }

  processImage(data, cb) {
    LabelTools.Logger("Image Processor not defined");
    cb([]);
  }

  processZplImage(width, height, data) {

  }
}

class ImageResizer {
  constructor() {
  }

  resize(targetWidth, targetHeight, width, height, data) {
    var result = [];

    var dx = width / targetWidth;
    var dy = height / targetHeight;

    for (var y = 0; y < targetHeight; y++) {
      for (var x = 0; x < targetWidth; x++) {
        var iy = Math.floor(dy * y);
        var ix = Math.floor(dx * x);

        var value = data[(iy * width) + ix];

        result.push(value ? 1 : 0);
      }
    }

    return result;
  }
}

class BarcodeRenderer {
  constructor() {

  }

  render(width, height, type, data) {
    var box = new Box();
    box.width = width;
    box.height = height;
    box.border = 2;

    var text = new Text();
    box.content.push(text);
    text.fontFamily = new FontFamily(FontFamilyName.B);
    text.text = 'BARCODE';

    text.verticalAlignment = new Alignment(AlignmentValue.Center);
    text.horizontalAlignment = new Alignment(AlignmentValue.Center);

    var data = [];
    for (var y = 0; y < height; y++) {
      data.push([]);
      for (var x = 0; x < width; x++) {
        data[y].push(0);
      }
    }

    box.generateBinaryImage(data, 0, 0, width, height, width, height);

    return data;
  }
}

class Size {
  constructor(value, sizeType) {
    this.value = value || 0;
    this.sizeType = sizeType || SizeType.Absolute;
  }

  getValue(unitSize) {
    if (typeof(unitSize) == 'number' && this.sizeType == SizeType.Relative)
    {
      return this.value * unitSize;
    }
    return this.value;
  }

  toString() {
    return this.value + (this.sizeType == SizeType.Relative ? '*' : '');
  }
}

class Spacing {

  constructor(left, top, right, bottom) {
    this.left = left || 0;
    this.top = (top == undefined ? this.left : top);
    this.right = (right == undefined ? this.left : right);
    this.bottom = (bottom == undefined ? this.top : bottom);
  }

  get horizontal() {
    return this.left + this.right;
  }

  get vertical() {
    return this.top + this.bottom;
  }

  get horizontalDifference() {
    return Math.abs(this.left - this.top);
  }

  get verticalDifference() {
    return Math.abs(this.top - this.bottom);
  }

  toString() {
    return this.left + ', ' + this.top + ', ' + this.right + ', ' + this.bottom;
  }
}

class GridPosition {
  constructor(column, row) {
    this.column = column || 0;
    this.row = row || 0;
  }

  toString() {
    return this.column + ', ' + this.row;
  }
}

class FontFamily {
  constructor(value, width, height) {
    this.value = value;
    this.width = width;
    this.height = height;
  }

  get definition() {
    return FontFamilyDefinition[this.value];
  }

  toString() {
    return this.value;
  }
}

class Alignment {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

class PrintDensity {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value + ' dpmm';
  }
}

class GraphicData {

  constructor(width, height, data) {
    this.data = data || [];
    this.width = width || 0;
    this.height = height || 0;
  }

  toString() {
    return this.width + ' x ' + this.height;
  }
}

class BarcodeType {
  constructor(type, subset) {
    this.value = type;
    this.subset = subset || null;
  }

  toString() {
    return this.value + ' - ' + this.subset;
  }
}

/* Elements */

class BaseElement {
  constructor() {
    this.invert = false;
    this.fixed = false;

    this.grid = new GridPosition();

    this.notImplemented = [];
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

class BaseVisualElment extends BaseElement {
  constructor() {
    super();

    this.width = new Size();
    this.height = new Size();

    this.top = new Size();
    this.left = new Size();

    this.margin = new Spacing();
  }

  getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    // gets start position and size of content
    var left = this.getSize(this.left, widthUnits) + this.margin.left;
    var top = this.getSize(this.top, heightUnits) + this.margin.top;

    var width = this.getSize(this.width, widthUnits) || (availableWidth - this.margin.horizontal);
    var height = this.getSize(this.height, heightUnits) || (availableHeight - this.margin.vertical);

    if (typeof(this.top) == 'object' && this.top.sizeType == SizeType.Fraction) {
      top = (availableHeight * this.top.value);
    }
    if (typeof(this.left) == 'object' && this.left.sizeType == SizeType.Fraction) {
      left = (availableWidth * this.left.value);
    }

    return {
      left: Math.round(left + offsetLeft),
      top: Math.round(top + offsetTop),
      width: Math.round(width),
      height: Math.round(height),
    };
  }

  getSize(prop, unitSize) {
    if (typeof(prop) == 'number') {
      return prop;
    } else {
      return prop.getValue(unitSize);
    }
  }

  calculateUnits() {
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

    var elements = this.content || [];

    for (var e_id in elements) {
      var element = elements[e_id];

      units.absolute.width += element.margin.horizontal + (this.border || 0);
      units.absolute.height += element.margin.vertical + (this.border || 0);

      if (typeof(element.border) == 'number') {
        units.absolute.width += element.border * 2;
        units.absolute.height += element.border * 2;
      }

      if (typeof(element.width) == 'number') {
        units.absolute.width += element.width;
      } else if (element.width.sizeType == SizeType.Absolute) {
        units.absolute.width += element.width.value;
      } else {
        units.relative.width += element.width.value;
      }

      if (typeof(element.height) == 'number') {
        units.absolute.height += element.height;
      } else if (element.height.sizeType == SizeType.Absolute) {
        units.absolute.height += element.height.value;
      } else {
        units.relative.height += element.height.value;
      }
    }

    return units;
  }
}

class BaseContainerElement extends BaseVisualElment {
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

class Label extends BaseContainerElement {
  constructor() {
    super();

    this.printDensity = new PrintDensity(PrintDensityName['8dpmm']);

    this.notImplemented = ['fixed', 'grid', 'margin', 'left', 'top']
  }

  generateZPL() {
    var zpl = '^XA';

    zpl += '\n';

    var width = this.getSize(this.width) * this.printDensity.value;
    var height = this.getSize(this.height) * this.printDensity.value;

    zpl += super.generateZPL(0, 0, width, height);

    zpl += '^XZ';

    return zpl;
  }

  generateBinaryImage(binaryBase) {
    var width = this.getSize(this.width) * this.printDensity.value;
    var height = this.getSize(this.height) * this.printDensity.value;

    for (var y = 0; y < height; y++) {
      binaryBase.push([]);
      for (var x = 0; x < width; x++) {
        binaryBase[y].push(false);
      }
    }

    super.generateBinaryImage(binaryBase, 0, 0, width, height);
  }
}

class Text extends BaseVisualElment {
  constructor() {
    super();

    this.text = '';
    this.fontFamily = new FontFamily(FontFamilyName.A);

    // this.rotation = Rotation.Normal;
    this.verticalAlignment = new Alignment(AlignmentValue.Start);
    this.horizontalAlignment = new Alignment(AlignmentValue.Start);
  }

  characterMap() {
    var characters = [];
    for (var c_id in this.text) {
      let character = this.text[c_id];
      let charset = this.fontFamily.definition.characters;

      if (charset[character] === undefined) {
        character = ' ';
      }

      characters.push(charset[character]);
    }
    return characters;
  }

  calculateSize() {
    var characters = this.characterMap();
    var height = characters[0].length + this.fontFamily.definition.spacing.top + this.fontFamily.definition.spacing.bottom;
    var width = 0;

    for (var c_id in characters)
    {
      var character = characters[c_id];
      width += character[0].length;
      width += this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;
    }

    return {
      width: width,
      height: height
    }
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var size = this.calculateSize();

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + (position.height / 2) - (size.height / 2);
    }

    var zpl = '';

    if (this.invert) {
      zpl += '^LRY\n';
    }

    var horizontalAlignment;
    switch (this.horizontalAlignment.value) {
      case AlignmentValue.Start:
        horizontalAlignment = 'L'
        break;
      case AlignmentValue.Center:
        horizontalAlignment = 'C'
        break;
      case AlignmentValue.End:
        horizontalAlignment = 'R'
        break;
    }

    const fontHeight = this.fontFamily.height || ''
    const fontWidth = this.fontFamily.width || ''

    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);
    zpl += '^A' + this.fontFamily.value + ',' + 'N' + ',' + fontHeight + ',' + fontWidth + '\n';
    zpl += '^FB' + Math.round(position.width) + ',1,0,' + horizontalAlignment + ',0\n';
    zpl += '^FD' + this.text + '^FS\n';

    if (this.invert) {
      zpl += '^LRN\n';
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var characters = this.characterMap();

    var size = this.calculateSize();

    if (this.horizontalAlignment == AlignmentValue.End) {
      position.left = position.left + position.width - (size.width);
    } else if (this.horizontalAlignment == AlignmentValue.Center) {
      position.left = position.left + (position.width - size.width) / 2;
    }

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + ((position.height) / 2) - (size.height / 2);
    }

    for (var c_id in characters) {
      var character = characters[c_id];

      var top = position.top;
      var left = position.left;

      position.left += character[0].length + this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;

      for (var y = 0; y < character.length; y++) {
        for (var x = 0; x < character[0].length; x++) {
          var value = character[y][x] == 1;

          var yIndex = Math.round(y + top);
          var xIndex = Math.round(x + left);

          if ((yIndex > 0 && yIndex < binaryBase.length && xIndex > 0 && xIndex < binaryBase[yIndex].length) == false) continue;

          if (value) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = value;
            }
          }
        }
      }
    }
  }
}

class BaseGraphic extends BaseContainerElement {
  constructor() {
    super();

    this.border = 0;
    this.fill = false;
  }
}

class Box extends BaseGraphic {
  constructor() {
    super();

    this.cornerRadius = 0;
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert) {
      zpl += '^FR';
    }

    var thickness = this.border;

    if (this.fill) {
      thickness = Math.min(position.width, position.height);
    }

    var shorterSide = Math.min(position.width, position.height);
    var roundingIndex = Math.round((this.cornerRadius * 16) / shorterSide);

    if (thickness > 0) {
      zpl += '^GB' + position.width + ',' + position.height + ',' + (thickness || '') + ',,' + roundingIndex + '^FS' + '\n';
    } else {
      zpl += '\n';
    }

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var borderSize = (this.border || 0);

    var yTop = this.cornerRadius;
    var yBottom = position.height - this.cornerRadius - 1;
    var xLeft = this.cornerRadius;
    var xRight = position.width - this.cornerRadius - 1;

    if (this.fill || this.border > 0) {
      for (var y = 0; y < position.height; y++) {
        for (var x = 0; x < position.width; x++) {

          var xIndex = x + position.left;
          var yIndex = y + position.top;

          if (yIndex < 0 || xIndex < 0 || yIndex >= binaryBase.length || xIndex >= binaryBase[yIndex].length) continue;

          var center = undefined;
          if (this.cornerRadius > 0) {
            if (y < yTop) {
              if (x < xLeft) {
                // top left
                center = {
                  x: xLeft,
                  y: yTop,
                }
              } else if (x > xRight) {
                // top right
                center = {
                  x: xRight,
                  y: yTop,
                }
              }
            } else if (y > yBottom) {
              if (x < xLeft) {
                // bottom left
                center = {
                  x: xLeft,
                  y: yBottom,
                }
              } else if (x > xRight) {
                // bottom right
                center = {
                  x: xRight,
                  y: yBottom,
                }
              }
            }
          }

          if (center != undefined) {
            var distance = Math.sqrt(Math.pow(y - center.y, 2) + Math.pow(x - center.x, 2));
            if (distance <= this.cornerRadius + 1) {
              if (this.fill || distance >= this.cornerRadius - this.border) {
                if (this.invert) {
                  binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
                } else {
                  binaryBase[yIndex][xIndex] = true;
                }
              }
            }
            continue;
          }

          if ((this.fill) || (y < borderSize) || (y >= position.height - borderSize) || (x < borderSize) || (x >= position.width - borderSize)) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = true;
            }
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }
}

class Circle extends BaseGraphic {
  constructor() {
    super();
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert) {
      zpl += '^FR';
    }

    var thickness = this.border;

    if (this.fill) {
      thickness = Math.min(position.width, position.height);
    }

    if (thickness > 0) {
      if (position.width != position.height) {
        // ellipse
        zpl += '^GE' + position.width + ',' + position.height + ',' + (thickness || '') + ',B' + '^FS' + '\n';
      } else {
        // circle
        zpl += '^GC' + position.width + ',' + (thickness || '') + ',B' + '^FS' + '\n';
      }
    } else {
      zpl += '\n';
    }

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var yCenter = position.height / 2;
    var xCenter = position.width / 2;

    var widthHalf = position.width / 2;
    var heightHalf = position.height / 2;

    var widthHalfBorder = widthHalf - this.border;
    var heightHalfBorder = heightHalf - this.border;

    if (this.fill || this.border > 0) {
      for (var y = 0; y < position.height; y++) {
        for (var x = 0; x < position.width; x++) {

          var yIndex = Math.round(y + position.top);
          var xIndex = Math.round(x + position.left);

          var value = false;

          value = (Math.pow(x - xCenter, 2) / Math.pow(widthHalf, 2)) + (Math.pow(y - yCenter, 2) / Math.pow(heightHalf, 2)) <= 1;
          if (this.fill == false) {
            value &= (Math.pow(x - xCenter, 2) / Math.pow(widthHalfBorder, 2)) + (Math.pow(y - yCenter, 2) / Math.pow(heightHalfBorder, 2)) >= 1;
          }

          if (value) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = value;
            }
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }
}

class Graphic extends BaseVisualElment {
  constructor() {
    super();

    this.data = new GraphicData();
    this.border = 0;
  }

  generateContainer() {
    var container = new Box();
    container.border = this.border;
    container.margin = this.margin;
    container.top = this.top;
    container.left = this.left;
    return container;
  }

  extractImageData(cb) {
    var processor = LabelTools.ImageProcessor || new ImageProcessor();
    var imageData = processor.processImage(this.data);
    cb(imageData);
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var container = this.generateContainer();
    var zpl = container.generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var imageData = LabelTools.ImageResizer.resize(position.width, position.height, this.data.width, this.data.height, this.data.data);

    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert)
    {
      zpl += "^FR";
    }

    var widthBytes = Math.ceil(position.width / 8);
    var byteCount = widthBytes * position.height;
    var hexData = ZPLImageTools.generateHexAscii(position.width, position.height, imageData);
    hexData = ZPLImageTools.encodeHexAscii(hexData);

    zpl += '^GFA,' + byteCount + ',' + byteCount + ',' + widthBytes + ',' + hexData + '^FS';

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var container = this.generateContainer();
    container.generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var imageData = LabelTools.ImageResizer.resize(position.width, position.height, this.data.width, this.data.height, this.data.data);


    for (var y = 0; y < position.height; y++) {
      for (var x = 0; x < position.width; x++) {

        var yIndex = y + position.top;
        var xIndex = x + position.left;

        var index = y * position.width + x;

        var value = imageData[index];

        if (value) {
          if (this.invert) {
            binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
          } else {
            binaryBase[yIndex][xIndex] = true;
          }
        }
      }
    }
  }
}

class Grid extends BaseContainerElement {
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

class Barcode extends BaseVisualElment {
  constructor() {
    super();

    this.data = '';
    this.maxLength = 32;
    this.type = new BarcodeType(BarcodeTypeName.CODE_11);

    this.notImplemented = ['invert']
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '';

    switch (this.type.value) {
      case BarcodeTypeName.Code49:
        zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top + 25);
        break;

      default:
        zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);
        break;
    }


    if (this.invert)
    {
      zpl += "^FR";
    }

    switch (this.type.value) {
      case BarcodeTypeName.Code11:
        zpl += '^B1N,N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.Interleaved25:
        zpl += '^B2N,' + position.height + ',Y,N,N';
        break;

      case BarcodeTypeName.Code39:
        zpl += '^B3N,N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.PlanetCode:
        zpl += '^B5N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.PDF417:
        var rowHeight = 10;
        var rows = Math.ceil(position.height / rowHeight);
        var bytes = this.maxLength * rows;
        var columns = Math.ceil(bytes / rows);

        zpl += '^B7N,' + rowHeight + ',0,' + columns + ',' + rows + ',N';
        break;

      case BarcodeTypeName.EAN8:
        zpl += '^B8N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.UPCE:
        zpl += '^B9N,' + position.height + ',Y,N,Y';
        break;

      case BarcodeTypeName.Code93:
        zpl += '^BAN,' + position.height + ',Y,N,N';
        break;

      case BarcodeTypeName.Code128:
        zpl += '^BCN,' + position.height + ',Y,N,N,N';
        break;

      case BarcodeTypeName.EAN13:
        zpl += '^BEN,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.Industrial25:
        zpl += '^BIN,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.Standard25:
        zpl += '^BJN,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.ANSICodabar:
        zpl += '^BKN,N,' + position.height + ',Y,N,A,A';
        break;

      case BarcodeTypeName.Logmars:
        zpl += '^BLN,' + position.height + ',N';
        break;

      case BarcodeTypeName.MSI:
        zpl += '^BMN,B,' + position.height + ',Y,N,N';
        break;

      case BarcodeTypeName.Plessey:
        zpl += '^BPN,N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.QRCode:
        var magnification = Math.floor(position.height / 10) - 2;
        zpl += '^BQN,2,' + magnification + ',Q,7';
        break;

      case BarcodeTypeName.DataMatrix:

        var rows = Math.ceil(Math.sqrt(Math.max(this.data.length, this.maxLength)));
        rows = Math.ceil(rows / 2) * 2;
        var rowHeight = Math.ceil(position.height / rows);

        zpl += '^BXN,' + rowHeight + ',200,' + rows + ',' + rows, ',6,~';
        break;

      case BarcodeTypeName.PostNet:
        zpl += '^BZN,' + position.height + ',Y,N';
        break;
    }

    zpl += '^FD'

    if (this.type.value === BarcodeTypeName.Code128 && this.type.subset) {
      switch (this.type.subset) {
        case Code128Subset.A:
          zpl += '>9';
          break;
        case Code128Subset.B:
          zpl += '>:';
          break;
        case Code128Subset.C:
          zpl += '>;';
          break;
      }
    }

    zpl += this.data;
    zpl += '^FS\n';

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var barcodeData = LabelTools.BarcodeRenderer.render(position.width, position.height, this.type, this.data);

    for (var y = 0; y < position.height; y++) {
      for (var x = 0; x < position.width; x++) {
        var yIndex = y + position.top;
        var xIndex = x + position.left;

        binaryBase[yIndex][xIndex] = barcodeData[y][x];
      }
    }
  }
}

var ZPLImageTools = {
  generateHexAscii: function(width, height, imageData) {
    var index = 0;
    var bitIndex = 0;
    var output = '';

    var currentValue = 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

        var value = imageData[index];
        currentValue += (value << (7 - bitIndex));

        if (bitIndex == 7 || x == width - 1) {
          var valueString = currentValue.toString(16).toUpperCase();
          if (currentValue < 16) {
            valueString = '0' + valueString;
          }
          output += valueString;
          currentValue = 0;
          bitIndex = -1;
        }

        index++;
        bitIndex++;
      }
      output += '\n';
    }
    return output;
  },

  encodeHexAscii: function(data) {
    var mapCode = { 1: "G", 2: "H", 3: "I", 4: "J", 5: "K", 6: "L", 7: "M", 8: "N", 9: "O", 10: "P", 11: "Q", 12: "R", 13: "S", 14: "T", 15: "U", 16: "V", 17: "W", 18: "X", 19: "Y", 20: "g", 40: "h", 60: "i", 80: "j", 100: "k", 120: "l", 140: "m", 160: "n", 180: "o", 200: "p", 220: "q", 240: "r", 260: "s", 280: "t", 300: "u", 320: "v", 340: "w", 360: "x", 380: "y", 400: "z" }

    var outputCode = '';
    var currentLine = '';
    var previousLine = '';

    var newSection = true;
    var currentChar = undefined;
    var counter = 1;

    for (var i = 0; i < data.length; i++) {
      if (newSection) {
        currentChar = data[i];
        counter = 1;
        newSection = false;
        continue;
      }

      if (data[i] == '\n') {
        if (currentChar == '0') {
          currentLine += ',';
        } else if (currentChar == 'F') {
          currentLine += '!';
        } else if (counter > 20) {
          var value = Math.floor(counter / 20) * 20;
          currentLine += mapCode[value];

          var counterMod = counter % 20;
          if (counterMod != 0) {
            currentLine += mapCode[counterMod];
          }

          currentLine += currentChar;
        }

        newSection = true;
        if (currentLine == previousLine) {
          outputCode += ':';
        } else {
          outputCode += currentLine;
          previousLine = currentLine;
        }
        currentLine = '';
        continue;
      }

      if (currentChar == data[i]) {
        counter++;
      } else {
        if (counter > 20) {
          var value = Math.floor(counter / 20) * 20;
          currentLine += mapCode[value];

          var counterMod = counter % 20;
          if (counterMod != 0) {
            currentLine += mapCode[counterMod];
          }
        } else {
          currentLine += mapCode[counter];
        }
        currentLine += currentChar;
        currentChar = data[i];
        counter = 1;
      }
    }
    return outputCode;
  }
};

module.exports = {
  SizeType: SizeType,
  Rotation: Rotation,
  PrintDensityName: PrintDensityName,
  FontFamilyName: FontFamilyName,
  BarcodeTypeName: BarcodeTypeName,
  Code128Subset: Code128Subset,
  AlignmentValue: AlignmentValue,
  LabelTools: LabelTools,
  ImageProcessor: ImageProcessor,
  ImageResizer: ImageResizer,
  BarcodeRenderer: BarcodeRenderer,
  Size: Size,
  Spacing: Spacing,
  GridPosition: GridPosition,
  FontFamily: FontFamily,
  Alignment: Alignment,
  PrintDensity: PrintDensity,
  GraphicData: GraphicData,
  BarcodeType: BarcodeType,
  BaseElement: BaseElement,
  BaseVisualElment: BaseVisualElment,
  BaseContainerElement: BaseContainerElement,
  Label: Label,
  Text: Text,
  BaseGraphic: BaseGraphic,
  Box: Box,
  Circle: Circle,
  Graphic: Graphic,
  Grid: Grid,
  Barcode: Barcode,
}