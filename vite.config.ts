import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    preset: "static", // Tells Nitro to output static HTML/JS files for GitHub Pages
    baseURL: "/portfolio/", // Matches your repository name
  },
  
  plugins: [
    solidStart(),
    tailwindcss(),
    nitro()
  ]
});
