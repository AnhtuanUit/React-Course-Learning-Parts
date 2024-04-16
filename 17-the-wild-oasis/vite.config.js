import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    //add this property
    // eslint-disable-next-line no-undef
    sourcemap: process.env.NODE_ENV === "development",
  },
});
