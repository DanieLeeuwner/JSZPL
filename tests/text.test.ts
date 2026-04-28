import { Text, SerialNumber, FontFamilyName, FontFamily, Alignment, AlignmentValue } from '../src/jszpl.ts';
import { createLabel } from './test-helpers.ts';
import _ from 'lodash';

test('add text to a label', () => {
  const label = createLabel();

  const text = new Text();
  label.content.push(text);
  text.fontFamily = new FontFamily(FontFamilyName.D);
  text.text = 'Hello World!';

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^AD,,,
^FB780,1000,0,L,0
^FDHello World!^FS
^XZ`);

  const binaryData: (boolean | number)[][] = [];
  label.generateBinaryImage(binaryData);

  expect(binaryData.length).toBe(400);

  const blackPixels = _.filter(_.flatten(binaryData), (e) => e);
  expect(blackPixels.length).toBe(749);
});

test('add multiline text to a label', () => {
  const label = createLabel();

  const text = new Text();
  label.content.push(text);
  text.fontFamily = new FontFamily(FontFamilyName.D);
  text.text = 'Hello\n World!\nThis\nIs\nA\nNew\nLine';

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^AD,,,
^FB780,1000,0,L,0
^FDHello^FS
^FO10,31^AD,,,
^FB780,1000,0,L,0
^FD World!^FS
^FO10,52^AD,,,
^FB780,1000,0,L,0
^FDThis^FS
^FO10,73^AD,,,
^FB780,1000,0,L,0
^FDIs^FS
^FO10,94^AD,,,
^FB780,1000,0,L,0
^FDA^FS
^FO10,115^AD,,,
^FB780,1000,0,L,0
^FDNew^FS
^FO10,136^AD,,,
^FB780,1000,0,L,0
^FDLine^FS
^XZ`);
});

test('center align text in a label', () => {
  const label = createLabel();

  const text = new Text();
  label.content.push(text);
  text.fontFamily = new FontFamily(FontFamilyName.D);
  text.text = 'Hello World!';
  text.horizontalAlignment = new Alignment(AlignmentValue.Center);
  text.verticalAlignment = new Alignment(AlignmentValue.Center);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,190^AD,,,
^FB780,1000,0,C,0
^FDHello World!\\&^FS
^XZ`);
});

test('add serial number to a label', () => {
  const label = createLabel();

  const serialNum = new SerialNumber();
  label.content.push(serialNum);
  serialNum.fontFamily = new FontFamily(FontFamilyName.D);
  serialNum.format = 'Label 1';

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^AD,,,
^FB780,1000,0,L,0
^SNLabel 1,1,Y^FS
^XZ`);
});
