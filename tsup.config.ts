import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts', 'lib/generateData.ts', 'lib/deleteGeneratedData.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
})