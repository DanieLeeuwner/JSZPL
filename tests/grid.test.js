const { Grid, Text, Size, Spacing, FontFamily, FontFamilyName, SizeType } = require('../src/jszpl.js');
const testHelpers = require('./test-helpers.js');

test('add grid to a label', () => {
  const label = testHelpers.createLabel();

  const grid = new Grid();
  label.content.push(grid);
  grid.columns.push(new Size(1, SizeType.Relative));
  grid.columns.push(new Size(1, SizeType.Relative));
  grid.rows.push(new Size(2, SizeType.Relative));
  grid.rows.push(new Size(2, SizeType.Relative));
  grid.columnSpacing = 2;
  grid.rowSpacing = 2;
  grid.border = 2;
  grid.padding = new Spacing(10);

  const text00 = new Text();
  grid.content.push(text00);
  text00.text = '(0, 0)';
  text00.fontFamily = new FontFamily(FontFamilyName.D);

  const text10 = new Text();
  grid.content.push(text10);
  text10.text = '(1, 0)';
  text10.fontFamily = new FontFamily(FontFamilyName.D);
  text10.grid.column = 1;

  const text01 = new Text();
  grid.content.push(text01);
  text01.text = '(0, 1)';
  text01.fontFamily = new FontFamily(FontFamilyName.D);
  text01.grid.row = 1;

  const text11 = new Text();
  grid.content.push(text11);
  text11.text = '(1, 1)';
  text11.fontFamily = new FontFamily(FontFamilyName.D);
  text11.grid.column = 1;
  text11.grid.row = 1;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GB780,380,2,,0^FS
^FO14,14^GB381,181,2,,0^FS
^FO26,26^AD,,,
^FB357,1,0,L,0
^FD(0, 0)^FS
^FO397,14^GB389,181,2,,0^FS
^FO409,26^AD,,,
^FB365,1,0,L,0
^FD(1, 0)^FS
^FO14,197^GB381,189,2,,0^FS
^FO26,209^AD,,,
^FB357,1,0,L,0
^FD(0, 1)^FS
^FO397,197^GB389,189,2,,0^FS
^FO409,209^AD,,,
^FB365,1,0,L,0
^FD(1, 1)^FS
^XZ`);
});