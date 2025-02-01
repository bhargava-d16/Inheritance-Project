import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:8080";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
 
  },
  define: {
    "import.meta.env.VITE_BACKEND_URL": JSON.stringify(BACKEND_URL),
  },
});
