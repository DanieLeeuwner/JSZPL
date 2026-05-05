import { Box, Circle, Line, Graphic, GraphicData } from '../src/jszpl.ts';
import { createLabel } from './test-helpers.ts';
import { PNG } from 'pngjs';
import _ from 'lodash';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

test('add box to a label', () => {
  const label = createLabel();

  const box = new Box();
  label.content.push(box);
  box.fill = true;
  box.width = 150;
  box.height = 150;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GB150,150,150,,0^FS
^XZ`);
});

test('add circle to a label', () => {
  const label = createLabel();

  const circle = new Circle();
  label.content.push(circle);
  circle.fill = true;
  circle.width = 150;
  circle.height = 150;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GC150,150,B^FS
^XZ`);
});

test('add box overlapping circle to a label', () => {
  const label = createLabel();

  const circle = new Circle();
  label.content.push(circle);
  circle.fill = true;
  circle.width = 150;
  circle.height = 150;

  const box = new Box();
  label.content.push(box);
  box.fill = true;
  box.width = 150;
  box.height = 150;
  box.invert = true;
  box.cornerRadius = 10;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GC150,150,B^FS
^FO10,10^FR^GB150,150,150,,1^FS
^XZ`);

  const binaryData: (boolean | number)[][] = [];
  label.generateBinaryImage(binaryData);

  expect(binaryData.length).toBe(400);

  const blackPixels = _.filter(_.flatten(binaryData), (e) => e);
  expect(blackPixels.length).toBe(4769);
});

test('add lines to a label', () => {
  const label = createLabel();

  const line1 = new Line();
  label.content.push(line1);
  line1.x1 = 50;
  line1.y1 = 50;
  line1.x2 = 150;
  line1.y2 = 150;
  line1.thickness = 5;

  const line2 = new Line();
  label.content.push(line2);
  line2.x1 = 50;
  line2.y1 = 150;
  line2.x2 = 150;
  line2.y2 = 50;
  line2.thickness = 5;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO60,60^GD100,100,5,B,L^FS
^FO60,60^GD100,100,5,B,R^FS
^XZ`);

  const binaryData: (boolean | number)[][] = [];
  label.generateBinaryImage(binaryData);

  expect(binaryData.length).toBe(400);

  const blackPixels = _.filter(_.flatten(binaryData), (e) => e);
  expect(blackPixels.length).toBe(1351);
});

test('add image to a label', () => {
  const label = createLabel();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const imageBuffer = readFileSync(join(__dirname, 'resources/image.png'));
  const imageData = PNG.sync.read(imageBuffer);

  const graphic = new Graphic();
  label.content.push(graphic);
  graphic.width = 200;
  graphic.height = 200;

  let index = 0;
  const imageBits: number[] = [];

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const red = imageData.data[index++];
      const green = imageData.data[index++];
      const blue = imageData.data[index++];
      const opacity = imageData.data[index++];

      let value = 0;
      if (opacity !== 0) {
        value = (((red + green + blue) / 3) < 180) ? 1 : 0;
      }
      imageBits.push(value);
    }
  }

  graphic.data = new GraphicData(imageData.width, imageData.height, imageBits);

  const zpl = label.generateZPL();
  expect(zpl).toContain('^GFA');

  const binaryData: (boolean | number)[][] = [];
  label.generateBinaryImage(binaryData);

  expect(binaryData.length).toBe(400);

  const blackPixels = _.filter(_.flatten(binaryData), (e) => e);
  expect(blackPixels.length).toBe(7780);

  // Save binary image as PNG to test outputs
  const height = binaryData.length;
  const width = binaryData[0].length;
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const value = binaryData[y][x] ? 0 : 255;
      png.data[idx] = value;
      png.data[idx + 1] = value;
      png.data[idx + 2] = value;
      png.data[idx + 3] = 255;
    }
  }
  writeFileSync(join(__dirname, 'outputs/add-image-to-label.png'), PNG.sync.write(png));
});
