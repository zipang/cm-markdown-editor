import { defineConfig } from "vite";
import packageConf from "./package.json";

export default defineConfig({
  base: `/${packageConf.name}`,
  build: {
    lib: {
      entry: {
        editor: "src/editor/index.ts",
        // "editor/react": "src/react/index.ts",
        // "cm-markdown-editor/solid": resolve(projectRoot, "src/solid/index.ts"),
      },
      name: "CmMarkdownEditor",
      fileName: "cme",
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        demo: "index.html",
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "solid-js"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
      },
    },
    target: "modules",
  },
});
