import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const blocks = Object.fromEntries(
  readdirSync('./src/components', { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => [d.name, resolve(__dirname, `src/components/${d.name}/${d.name}.jsx`)])
);

export default defineConfig({
  build: {
    outDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: blocks,
      output: {
        entryFileNames: 'blocks/[name]/[name].js',
        assetFileNames: 'blocks/[name]/[name].css',
        chunkFileNames: 'blocks/[name]/[name].js',
        format: 'es',
      },
      preserveEntrySignatures: 'strict',
    }
  }
});