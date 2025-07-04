import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      createHtmlPlugin({
         minify: true, // Minifikasi HTML
      }),
      visualizer({
         emitFile: true,
         filename: "bundle-visualization.html",
         open: true,
      }),
   ],
  resolve: {
     alias: {
        "@": path.resolve(__dirname, "./src"),
     },
  },
})
