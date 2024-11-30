import path from "path"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { defineConfig, Plugin } from "vite"

export default defineConfig({
  plugins: [
    TanStackRouterVite() as Plugin,
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
