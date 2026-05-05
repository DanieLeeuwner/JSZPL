import { Text, FontFamily, FontFamilyName } from '../src/jszpl.ts';
import { createLabel } from './test-helpers.ts';

test('characterSet emits ^CI after ^XA', () => {
  const label = createLabel();
  label.characterSet = 28;
  expect(label.generateZPL()).toBe(`^XA\n^CI28\n^XZ`);
});

test('characterSet is not emitted when not set', () => {
  const label = createLabel();
  expect(label.generateZPL()).not.toContain('^CI');
});

test('characterSet appears before element output', () => {
  const label = createLabel();
  label.characterSet = 28;
  const text = new Text();
  label.content.push(text);
  text.fontFamily = FontFamily.D;
  text.text = 'Héllo';
  const zpl = label.generateZPL();
  expect(zpl.indexOf('^CI28')).toBeLessThan(zpl.indexOf('^FD'));
});
