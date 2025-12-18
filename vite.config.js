import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
  
  },
  server: {
    port: 5173, 
    host: 'https://herecomesthesong-972a6.web.app/react.html',
    open: true
  },
})
