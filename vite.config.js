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
    proxy: {
      '/spotify-api': {
        
        target: 'https://api.spotify.com', 
        changeOrigin: true,
        
        rewrite: (path) => path.replace(/^\/spotify-api/, '')
      },
      '/spotify-auth': {
        
        target: 'https://accounts.spotify.com',
        changeOrigin: true,
        
        rewrite: (path) => path.replace(/^\/spotify-auth/, '')
      }
    }
  }
})
