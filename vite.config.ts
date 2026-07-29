import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({  
  plugins: [
    solidStart(),
    tailwindcss(),
    nitro(
      {
      preset: "static",
      baseURL: "/portfolio/" // Ensure 'portfolio' matches your GitHub repository name exactly
    })
  ]
});
