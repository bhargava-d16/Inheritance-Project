import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => {
          const rewrittenPath = path.replace(/^\/api/, '');
          return rewrittenPath;
        }
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
  }
});
