import { GraphicData } from '../properties/graphic-data.ts';

export class ImageProcessor {
  processImage(_data: GraphicData, _cb?: (result: number[]) => void): void {
    if (_cb) _cb([]);
  }

  processZplImage(_width: number, _height: number, _data: number[]): void {
    // override in platform-specific implementation
  }
}
