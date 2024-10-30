import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4124,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4124",
  },
})
