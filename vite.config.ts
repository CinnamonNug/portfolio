import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default {
  // SolidStart's internal router architecture expects plugins down here
  plugins: [
    solidStart({
      // 1. SolidStart handles Nitro natively via this built-in 'server' key
      server: {
        baseURL: "/portfolio/",
        preset: "static", // Forces the 'static' SSG build
        prerender: {
          routes: ["/"],
          crawlLinks: true
        }
      }
    }),
    tailwindcss() // Clean Tailwind v4 compilation path
  ]
};
