import { fileURLToPath } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias hacia la raíz de frontend (todo el proyecto vive aquí ahora)
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    // Las 40 páginas se importan de forma estática en router/rutas.tsx a
    // propósito (no con React.lazy): con carga perezosa por página, cada
    // AppShell (montado DENTRO de cada página) se desmontaba durante la
    // descarga del chunk destino, mostrando una pantalla en blanco al
    // navegar — confirmado visualmente con Playwright. Un solo bundle de
    // ~690kB (~134kB gzip) es la contraparte aceptada de esa decisión;
    // se sube el umbral de aviso de Vite en vez de reintroducir
    // code-splitting por ruta.
    chunkSizeWarningLimit: 800,
  },
})
