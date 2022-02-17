"use strict";

const FontFamilyDefinition = require('./b64-fonts.js');
FontFamilyDefinition.initialize();

const elements = {
  Text: require('./components/text.js'),
  Box: require('./components/box.js'),
  Line: require('./components/line.js'),
  Circle: require('./components/circle.js'),
  Graphic: require('./components/graphic.js'),
  Grid: require('./components/grid.js'),
  Barcode: require('./components/barcode.js'),
  Raw: require('./components/raw.js'),
  SerialNumber: require('./components/serial-number.js'),
}

module.exports = {
  SizeType: require('./enums/size-type.js'),
  Rotation: require('./enums/rotation.js'),
  PrintDensityName: require('./enums/print-density-name.js'),
  FontFamilyName: require('./enums/font-family-name.js'),
  BarcodeTypeName: require('./enums/barcode-type-name.js'),
  AlignmentValue: require('./enums/alignment-value.js'),

  FontFamilyDefinition: FontFamilyDefinition,

  LabelTools: require('./helpers/label-tools.js'),
  ImageProcessor: require('./helpers/image-processor.js'),
  ImageResizer: require('./helpers/image-resizer.js'),
  BarcodeRenderer: require('./helpers/barcode-renderer.js'),

  Size: require('./properties/size.js'),
  Spacing: require('./properties/spacing.js'),
  GridPosition: require('./properties/grid-position.js'),
  FontFamily: require('./properties/font-family.js'),
  Alignment: require('./properties/alignment.js'),
  PrintDensity: require('./properties/print-density.js'),
  GraphicData: require('./properties/graphic-data.js'),
  BarcodeType: require('./properties/barcode-type.js'),

  Label: require('./components/label.js'),
  Text: elements.Text,
  Grid: elements.Grid,
  Box: elements.Box,
  Line: elements.Line,
  Circle: elements.Circle,
  Graphic: elements.Graphic,
  Barcode: elements.Barcode,
  Raw: elements.Raw,
  SerialNumber: elements.SerialNumber,

  elements: elements,
}