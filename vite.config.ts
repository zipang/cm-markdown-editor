import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { resolve } from "path";
// @ts-expect-error
import __dirname from "./dirname.cjs";

export default defineConfig({
  base: "/",

  // Path aliases
  resolve: {
    alias: {
      "@cme": resolve(__dirname, "src"),
      "@example": resolve(__dirname, "example"),
    },
  },

  // Build configuration
  // Demo page
  // We need to use the name of our package as the name of the library
  // because we will use it as a dependency in the demo page

  // Because the deployment inside Github Pages will use the name of our package
  // https://{owner}.github.io/{package_name}
  build: {
    lib: {
      entry: {
        editor: "src/editor/index.ts",
        index: "index.html",
        // "editor/react": "src/react/index.ts",
        // "editor/solid": "src/solid/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      // input: {
      //   example: "./index.html",
      // },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "solid-js"],
      output: {
        // Configure treeshaking and output directories
        dir: "dist",
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
      treeshake: true,
    },
    target: "modules",
  },

  plugins: [
    nodePolyfills({
      include: ["path"],
    }),
  ],
});
