import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hc_twitter_react_frontend/",
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ["**/*.docx"],
});
