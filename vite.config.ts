/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.esm.mjs';
        if (format === 'cjs') return 'index.cjs';
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: 'index.css',
      },
    },
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
  ],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
});
