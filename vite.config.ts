import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig ({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/google-login': {
        target: 'http://localhost:3000',
      }
    }
  },
  root: './client/',
  build: {
    outDir: 'dist',
  },
});