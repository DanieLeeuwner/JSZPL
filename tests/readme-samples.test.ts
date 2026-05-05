import { Text, FontFamilyName, FontFamily, Alignment, AlignmentValue, Box, Circle, Grid, Size, SizeType, Line, Raw, SerialNumber, Label, PrintDensity, PrintDensityName, Spacing } from '../src/jszpl.ts';
import { createLabel } from './test-helpers.ts';

function createLabelNoPadding(): Label {
  const label = new Label();
  label.printDensity = new PrintDensity(PrintDensityName['8dpmm']);
  label.width = 100;
  label.height = 50;
  return label;
}

test('top snippet - centered text', () => {
  const label = createLabel();
  const text = new Text();
  label.content.push(text);
  text.text = 'Hello World!';
  text.fontFamily = FontFamily.D;
  text.verticalAlignment = Alignment.Center;
  text.horizontalAlignment = Alignment.Center;
  expect(label.generateZPL()).toBe(`^XA\n^FO10,190^AD,,,\n^FB780,1000,0,C,0\n^FDHello World!\\&^FS\n^XZ`);
});

test('install example', () => {
  const label = createLabel();
  const text = new Text();
  label.content.push(text);
  text.fontFamily = new FontFamily(FontFamilyName.D);
  text.text = 'Hello World!';
  expect(label.generateZPL()).toBe(`^XA\n^FO10,10^AD,,,\n^FB780,1000,0,L,0\n^FDHello World!^FS\n^XZ`);
});

test('text element example', () => {
  const label = createLabelNoPadding();
  const text = new Text();
  label.content.push(text);
  text.fontFamily = new FontFamily(FontFamilyName.D);
  text.text = 'Hello World!';
  expect(label.generateZPL()).toBe(`^XA\n^FO0,0^AD,,,\n^FB800,1000,0,L,0\n^FDHello World!^FS\n^XZ`);
});

test('box example', () => {
  const label = createLabelNoPadding();
  const box = new Box();
  label.content.push(box);
  box.fill = true;
  box.width = 150;
  box.height = 150;
  expect(label.generateZPL()).toBe(`^XA\n^FO0,0^GB150,150,150,,0^FS\n^XZ`);
});

test('circle example', () => {
  const label = createLabelNoPadding();
  const circle = new Circle();
  label.content.push(circle);
  circle.fill = true;
  circle.width = 150;
  circle.height = 150;
  expect(label.generateZPL()).toBe(`^XA\n^FO0,0^GC150,150,B^FS\n^XZ`);
});

test('line example', () => {
  const label = createLabelNoPadding();
  const line1 = new Line();
  label.content.push(line1);
  line1.x1 = 50; line1.y1 = 50; line1.x2 = 150; line1.y2 = 150; line1.thickness = 5;
  const line2 = new Line();
  label.content.push(line2);
  line2.x1 = 50; line2.y1 = 150; line2.x2 = 150; line2.y2 = 50; line2.thickness = 5;
  expect(label.generateZPL()).toBe(`^XA\n^FO50,50^GD100,100,5,B,L^FS\n^FO50,50^GD100,100,5,B,R^FS\n^XZ`);
});

test('grid example', () => {
  const label = createLabel();
  const grid = new Grid();
  label.content.push(grid);
  grid.columns.push(new Size(150, SizeType.Absolute));
  grid.columns.push(new Size(1, SizeType.Relative));
  grid.rows.push(new Size(150, SizeType.Absolute));
  grid.rows.push(new Size(1, SizeType.Relative));
  grid.border = 2;
  grid.columnSpacing = 2;
  grid.rowSpacing = 2;
  expect(label.generateZPL()).toBe(`^XA\n^FO10,10^GB780,380,2,,0^FS\n^FO14,14^GB152,152,2,,0^FS\n^FO168,14^GB618,152,2,,0^FS\n^FO14,168^GB152,218,2,,0^FS\n^FO168,168^GB618,218,2,,0^FS\n^XZ`);
});

test('raw example', () => {
  const label = createLabelNoPadding();
  const raw = new Raw();
  label.content.push(raw);
  raw.data = `^FO50,50^GB100,100,100^FS\n^FO75,75^FR^GB100,100,100^FS\n^FO93,93^GB40,40,40^FS`;
  expect(label.generateZPL()).toBe(`^XA\n^FO50,50^GB100,100,100^FS\n^FO75,75^FR^GB100,100,100^FS\n^FO93,93^GB40,40,40^FS\n^XZ`);
});

test('serial number example', () => {
  const label = createLabel();
  const serialNumber = new SerialNumber();
  label.content.push(serialNumber);
  serialNumber.format = '0001';
  expect(label.generateZPL()).toBe(`^XA\n^FO10,10^AA,,,\n^FB780,1000,0,L,0\n^SN0001,1,Y^FS\n^XZ`);
});
