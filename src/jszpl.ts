import fonts, { initialize } from './b64-fonts.ts';

initialize();

export { SizeType } from './enums/size-type.ts';
export { Rotation } from './enums/rotation.ts';
export { PrintDensityName } from './enums/print-density-name.ts';
export { FontFamilyName } from './enums/font-family-name.ts';
export { BarcodeTypeName } from './enums/barcode-type-name.ts';
export { AlignmentValue } from './enums/alignment-value.ts';

export { LabelTools } from './helpers/label-tools.ts';
export { ImageProcessor } from './helpers/image-processor.ts';
export { ImageResizer } from './helpers/image-resizer.ts';
export { BarcodeRenderer } from './helpers/barcode-renderer.ts';
export { generateHexAscii, encodeHexAscii } from './helpers/zpl-image-tools.ts';

export { Size } from './properties/size.ts';
export { Spacing } from './properties/spacing.ts';
export { GridPosition } from './properties/grid-position.ts';
export { FontFamily } from './properties/font-family.ts';
export { Alignment } from './properties/alignment.ts';
export { PrintDensity } from './properties/print-density.ts';
export { GraphicData } from './properties/graphic-data.ts';
export { BarcodeType } from './properties/barcode-type.ts';

export { Label } from './components/label.ts';
export { Text } from './components/text.ts';
export { Grid } from './components/grid.ts';
export { Box } from './components/box.ts';
export { Line } from './components/line.ts';
export { Circle } from './components/circle.ts';
export { Graphic } from './components/graphic.ts';
export { Barcode } from './components/barcode.ts';
export { Raw } from './components/raw.ts';
export { SerialNumber } from './components/serial-number.ts';

export { default as FontFamilyDefinition } from './b64-fonts.ts';
export type { FontDefinition, FontSpacing, FontSize } from './b64-fonts.ts';

export { fonts };
