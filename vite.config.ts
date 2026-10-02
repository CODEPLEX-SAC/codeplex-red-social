/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const raiz = path.dirname(fileURLToPath(import.meta.url))

const fechaActualizacion = new Intl.DateTimeFormat('es-PE', {
  dateStyle: 'short',
  timeZone: 'America/Lima',
}).format(new Date())

export default defineConfig({
  define: {
    __FECHA_ACTUALIZACION__: JSON.stringify(fechaActualizacion),
  },
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
  test: {
    root: raiz,
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(raiz, 'montaje_local/configuracion_pruebas.ts')],
    include: ['redsocial/frontend/pruebas/**/*.test.{ts,tsx}'],
  },
})
