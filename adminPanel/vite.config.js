import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3001,
  },
  // for dev
  server: {
    host: "0.0.0.0",
    port: 3003,
  },
});
