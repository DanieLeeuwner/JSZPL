import { Box, Circle, Line, Graphic, GraphicData } from '../src/jszpl.ts';
import { createLabel } from './test-helpers.ts';
import { PNG } from 'pngjs';
import _ from 'lodash';

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

  const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAG4AAABsCAYAAACLk4fwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABcGSURBVHhe7d0FnHRV+QdwkJaSUjqkJKRTWkIUJJSSbilpBGlQJAXBoASlpUOlpJQQJVQaVLpDBVSa+/9/z7vPevbund25M/O+7Lrz+3yez07cuXP3/O55+pwZq+hiWKJL3DBFl7hhii5xwxRd4oYpPjLi/v3vfxePP/548f777/e80kUd1Cbu6aefLlZdddUkW221VXHwwQcXf/3rX4tnnnmm54jG+M9//lNcddVV6bMLL7xwseSSSxbvvvtu8a9//Sudg7zwwgs9R3cxEGoT9/DDDxdjjTVWksUWW6xYd911i5/+9KfFJZdcUnz9618v7rjjjuKdd97pOXoUzK5f//rXieT55puv9/Nrrrlm8eabbxZLLbVUej7JJJMUp5xySjrPfvvt1yVxALRFXIgBv/7664u33367uOuuu4p99tmn+OMf/9jziaK44oorii233DI9XmmllXo/t+KKK6ZZ5/Gkk05a3H333ekY2GGHHYq99tqr51kXZXSEuJB11lknkQfXXHNNsd1226XZR6UGZphhhn6fQ9o999zTc8Qoom+55Zau/RsAtYljpxZccMF+gx+ywAILFLfeems69uKLLy423XTTYpNNNknPoYq4P/zhD+m9f/7zn8Wll15aPPTQQ+l5jvvvv7+47777ki01G7fddtukYs1Y8sEHH/QcOTJQmzi4+uqr+w1+LlRnkMf2feELX0iPoUwcYt9777303gorrFA88MAD6TH8/e9/L37+858nku68886khq+88spEFPs69thjp3NMM800XeKaATd+4okn7kNAWczKUJts1WOPPZYe58RNPvnkxT/+8Y/0+o033phsY4CTcuSRRxZPPvlken7vvfcWiy++eC9Zuey6667pmJGEloiD3/zmN4OS97WvfS0de9NNNxXnnntuepwTt+yyyyY1acbtvvvuvTbtwgsvTI6KWfTqq68W3//+9ysJC2kmFPlfQ8vEwW9/+9sByfv4xz+e4j5x2hxzzFHMO++8xRJLLFH86le/Ks4444w0Uxw399xzF5/4xCcSwT/4wQ96Z+crr7xSzDbbbP3Om8u3vvWtdOxIQ1vE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';
  const imageBuffer = Buffer.from(base64Image, 'base64');
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
});
