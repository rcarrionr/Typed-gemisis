import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Typed-gemisis/', // Reemplaza esto con el nombre exacto de tu repo en GitHub
})
