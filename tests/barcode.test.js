const { Barcode, BarcodeType, BarcodeTypeName, Spacing } = require('../src/jszpl.js');
const testHelpers = require('./test-helpers.js');

test('add QR barcode to a label', () => {
  const label = testHelpers.createLabel();

  const barcode = new Barcode();
  label.content.push(barcode);
  barcode.data = 'Hello World!';
  barcode.width = 200;
  barcode.height = 200;
  barcode.type = new BarcodeType(BarcodeTypeName.QRCode);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^BQ,2,8,Q,7^FDQA,Hello World!^FS
^XZ`);
});

test('add DataMatrix barcode to a label', () => {
  const label = testHelpers.createLabel();

  const barcode = new Barcode();
  label.content.push(barcode);
  barcode.data = 'Hello World!';
  barcode.width = 200;
  barcode.height = 200;
  barcode.type = new BarcodeType(BarcodeTypeName.DataMatrix);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^BXN,10,200,,,~,1^FDHello World!^FS
^XZ`);
});

test('add EAN13 barcode to a label', () => {
  const label = testHelpers.createLabel();

  const barcode = new Barcode();
  label.content.push(barcode);
  barcode.data = '5901234123457';
  barcode.width = 200;
  barcode.height = 50;
  barcode.margin = new Spacing(20);
  barcode.type = new BarcodeType(BarcodeTypeName.EAN13);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO30,30^BEN,50,Y,N^FD5901234123457^FS
^XZ`);
});

test('add EAN13 barcode without an interpretation line to a label', () => {
  const label = testHelpers.createLabel();

  const barcode = new Barcode();
  label.content.push(barcode);
  barcode.data = '5901234123457';
  barcode.width = 200;
  barcode.height = 50;
  barcode.interpretationLine = false;
  barcode.margin = new Spacing(20);
  barcode.type = new BarcodeType(BarcodeTypeName.EAN13);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO30,30^BEN,50,N,N^FD5901234123457^FS
^XZ`);
});

test('add EAN8 barcode to a label', () => {
  const label = testHelpers.createLabel();

  const barcode = new Barcode();
  label.content.push(barcode);
  barcode.data = '5901234123457';
  barcode.width = 200;
  barcode.height = 50;
  barcode.margin = new Spacing(20);
  barcode.type = new BarcodeType(BarcodeTypeName.EAN8);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO30,30^B8N,50,Y,N^FD5901234123457^FS
^XZ`);
});