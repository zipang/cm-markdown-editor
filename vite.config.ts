import { resolve } from "node:path";
import { defineConfig } from "vite";

const projectRoot = import.meta.path;

export default defineConfig({
  build: {
    lib: {
      entry: {
        "cm-markdown-editor": resolve(projectRoot, "src/index.ts"),
        "cm-markdown-editor/react": resolve(projectRoot, "src/react/index.ts"),
        "cm-markdown-editor/solid": resolve(projectRoot, "src/solid/index.ts"),
      },
      name: "CmMarkdownEditor",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "solid-js"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "React",
        },
      },
    },
    target: "esnext",
  },
});
