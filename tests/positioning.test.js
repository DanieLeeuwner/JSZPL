const { Text, FontFamilyName, FontFamily, Circle } = require('../src/jszpl.js');
const testHelpers = require('./test-helpers.js');
const _ = require('lodash');

test('add fixed positioning text to a label', () => {
  const label = testHelpers.createLabel();

  const text = new Text();
  label.content.push(text);
  text.fontFamily = new FontFamily(FontFamilyName.D);
  text.text = 'Hello World!';
  text.fixed = true;

  text.top = 50;
  text.left = 150;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO300,100^AD,,,
^FB780,1000,0,L,0
^FDHello World!^FS
^XZ`);

  const binaryData = [];
  label.generateBinaryImage(binaryData);

  expect(binaryData.length).toBe(400);

  const blackPixels = _.filter(_.flatten(binaryData), (e) => e);
  expect(blackPixels.length).toBe(749);
});

test('add fixed position circle to a label', () => {
  const label = testHelpers.createLabel();

  const circle = new Circle();
  label.content.push(circle);
  circle.fill = true;
  circle.width = 150;
  circle.height = 150;
  circle.fixed = true;
  circle.left = 50;
  circle.top = 25;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO100,50^GC150,150,B^FS
^XZ`);

  const binaryData = [];
  label.generateBinaryImage(binaryData);

  expect(binaryData.length).toBe(400);

  const blackPixels = _.filter(_.flatten(binaryData), (e) => e);
  expect(blackPixels.length).toBe(17663);
});