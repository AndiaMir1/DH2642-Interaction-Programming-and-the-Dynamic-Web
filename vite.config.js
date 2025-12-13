import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        react: resolve(__dirname, 'react.html'),
      }
    }
  },
  server: {
    port: 5173, 
    host: "127.0.0.1", // <--- ADD THIS LINE!
  },
})
