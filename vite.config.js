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
        // Point to the real Spotify API
        target: 'https://api.spotify.com', 
        changeOrigin: true,
        // Removes '/spotify-api' so the API sees '/v1/search'
        rewrite: (path) => path.replace(/^\/spotify-api/, '')
      },
      '/spotify-auth': {
        // Point to the real Spotify Auth server
        target: 'https://accounts.spotify.com',
        changeOrigin: true,
        // Removes '/spotify-auth' so the server sees '/api/token'
        rewrite: (path) => path.replace(/^\/spotify-auth/, '')
      }
    }
  }
})