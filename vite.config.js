import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
  },
}