import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/jszpl.ts'],
  format: ['esm', 'cjs', 'iife'],
  dts: true,
  outDir: 'dist',
  clean: true,
  name: 'JSZPL',
  globalName: 'JSZPL',
});
