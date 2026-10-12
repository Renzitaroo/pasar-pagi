import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html")
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api/v1": {
        target: "https://paymentgateway.daeroom.my.id",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
