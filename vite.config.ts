import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  // 1. Vite's native property handles the asset sub-directory routing prefix
  base: "/portfolio/",

  plugins: [
    nitro({
        preset: "static", // Forces the production SSG crawl
        prerender: {
          routes: ["/"],
          crawlLinks: true // Restores your original crawler link discovery
        }
      }),
    solidStart(),
    tailwindcss()
  ]
});
