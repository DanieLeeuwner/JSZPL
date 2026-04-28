import { ImageProcessor } from './image-processor.ts';
import { ImageResizer } from './image-resizer.ts';
import { BarcodeRenderer } from './barcode-renderer.ts';

export const LabelTools = {
  ImageProcessor: new ImageProcessor(),
  ImageResizer: new ImageResizer(),
  BarcodeRenderer: new BarcodeRenderer(),
  Logger: (_msg: string): void => { /* override to enable logging */ },
};
