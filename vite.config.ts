import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from /GC-Landing-Page/; local dev stays at /
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/GC-Landing-Page/' : '/',
  plugins: [react()],
})
