import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Logintsx/', 
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
