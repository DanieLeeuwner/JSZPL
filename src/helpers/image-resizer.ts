export class ImageResizer {
  resize(targetWidth: number, targetHeight: number, width: number, height: number, data: number[]): number[] {
    const result: number[] = [];

    const dx = width / targetWidth;
    const dy = height / targetHeight;

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const iy = Math.floor(dy * y);
        const ix = Math.floor(dx * x);

        const value = data[(iy * width) + ix];
        result.push(value ? 1 : 0);
      }
    }

    return result;
  }
}
