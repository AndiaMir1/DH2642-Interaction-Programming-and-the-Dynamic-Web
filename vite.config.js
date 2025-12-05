
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const pages = { 
    "react":{
        entry: '/src/index.jsx',
        title: "HereComesTheSong React",
        body: '<div id ="root"></div>'
    },
  };

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist'
  }
})