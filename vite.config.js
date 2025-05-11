import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Change the output directory to 'dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with your API server
        changeOrigin: true,
      },
    },
  },
})


