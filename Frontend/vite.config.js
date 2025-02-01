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
    fs: {
      // Allowing access to both project and frontend directories
      allow: [
        'C:/Users/kalpm/Documents/Web dev/Projects/DemoInheritance/Inheritance-Project', // Your project root
        'C:/Users/kalpm/Documents/Web dev/Projects/DemoInheritance/Inheritance-Project/node_modules', // node_modules
        'C:/Users/kalpm/Documents/Web dev/Projects/DemoInheritance/Inheritance-Project/Frontend' // Adding Frontend directory
      ]
    }
  },
  define: {
    "import.meta.env.VITE_BACKEND_URL": JSON.stringify(BACKEND_URL),
  },
});
