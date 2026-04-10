
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
   // Ruta base para que los assets carguen correctamente al subir por FTP
  base: '/dist/',
  plugins: [
    tailwindcss(),
    react(),
    svgr({
      svgrOptions: {
        icon: true,//hace los svg nmas pequeños
      },
    })
  ],
  server: {
    port: 3000,
    open: true
  }
})