
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Ruta base para que los assets carguen correctamente al subir por FTP
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
    svgr({
      svgrOptions: {
        icon: true, // hace los svg más pequeños
      },
    }),
  ],
  resolve: {
    alias: {
      // Alias principal: @/ apunta a fuente/
      '@': path.resolve(__dirname, 'fuente'),
    },
  },
  publicDir: 'publico',
  server: {
    port: 3000,
    open: true,
  },
})