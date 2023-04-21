import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts', 'lib/generateData.ts', 'lib/deleteGeneratedData.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: false,
  minify: true,
  target: 'node14',
  outDir: 'dist'
});
