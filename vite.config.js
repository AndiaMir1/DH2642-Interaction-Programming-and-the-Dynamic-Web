import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist'
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