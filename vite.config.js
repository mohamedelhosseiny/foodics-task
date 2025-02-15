import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { createVuePlugin as vue2 } from "vite-plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2({
      jsx: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      vue: "vue/dist/vue.esm.js",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.foodics.dev/v5",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
