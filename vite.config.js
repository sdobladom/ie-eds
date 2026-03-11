import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '.',          // raíz del proyecto
    emptyOutDir: false,   // importante, para que no te borre el proyecto entero
    rollupOptions: {
      input: {
        carousel: 'src/carousel/carousel.jsx',
      },
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