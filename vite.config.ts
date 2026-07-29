import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    preset: "static",
    baseURL: "/portfolio/",
    prerender: {
      routes: ["/"],
      crawlLinks: true
    }
  },
  plugins: [
    solidStart(),
    tailwindcss()
  ]
});