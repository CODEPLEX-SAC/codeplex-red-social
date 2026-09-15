import { fileURLToPath } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const raiz = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(raiz, 'montaje_local'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(raiz, 'redsocial/frontend'),
    },
  },
  cacheDir: path.resolve(raiz, 'node_modules/.vite'),
  server: {
    port: 5173,
    fs: { allow: [raiz] },
  },
  build: {
    outDir: path.resolve(raiz, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
  },
})
