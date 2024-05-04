import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Usando la ruta '/api' como base
      '/api': {
        // El destino es tu servidor Express que está en el puerto 3000
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Para remover la base '/api' de la ruta antes de que la solicitud llegue al servidor Express
        rewrite: (path) => path.replace(/^\/api/, ''),
        build: {
          sourcemap: true // Generar mapas de fuente para producción también
        }      
      },
    },
  },
});


