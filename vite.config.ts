// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/ld59/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: "oxc",
    assetsDir: "assets",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Optional alias for cleaner imports
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"', // Inject environment variables
  },
});
