import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: '/',
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "https://inheritance-project-4kr9.onrender.com": {
  //       target: import.meta.env.MODE === "development" ? "http://localhost:8080" : "https://inheritance-project-4kr9.onrender.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\https://inheritance-project-4kr9.onrender.com/, ""),
  //     }
  //   },
 
  // },
  // define: {
  //   "import.meta.env.VITE_BACKEND_URL": JSON.stringify(BACKEND_URL),
  // },
});
