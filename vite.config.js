import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes built asset paths relative, so the site works whether it's
// served from the domain root (username.github.io) or a subpath (username.github.io/repo).
export default defineConfig({
  base: './',
  plugins: [react()],
})
