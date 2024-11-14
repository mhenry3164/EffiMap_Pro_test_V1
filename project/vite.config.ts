import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@services': '/src/services',
      '@store': '/src/store',
      '@types': '/src/types',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Example proxy for API
    },
  },
  define: {
    // Define Firebase config for VITE_ENV variables (optional)
    'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
    'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
    'process.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
  },
});
