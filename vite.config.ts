import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // bind to all addresses
    port: 5174,       // or your desired port
    strictPort: true, // fail if port is taken (optional)
  },
})