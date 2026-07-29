import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // base: "/portfolio/",
  server: {
            baseURL: '/portfolio/',
            preset: 'static',
            prerender: {
                crawlLinks: true
            }
        },
  plugins: [
    solidStart(),
    tailwindcss(),
  ],
});