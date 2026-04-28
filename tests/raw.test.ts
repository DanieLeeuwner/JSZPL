import { Raw } from '../src/jszpl.ts';
import { createLabel } from './test-helpers.ts';

test('add raw data to a label', () => {
  const label = createLabel();

  const raw = new Raw();
  label.content.push(raw);
  raw.data = `^FO50,50^GB100,100,100^FS
^FO75,75^FR^GB100,100,100^FS
^FO93,93^GB40,40,40^FS`;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO50,50^GB100,100,100^FS
^FO75,75^FR^GB100,100,100^FS
^FO93,93^GB40,40,40^FS
^XZ`);
});
