import { MarkdownEditor } from "./editor/MarkdownEditor";
import { getPageParameters, type PageParameters } from "./lib/parameters";
import { applyTheme, applyPalette } from "./lib/theme-loader";
import { createToolbar } from "./toolbar/toggle-preview";
import "katex/dist/katex.min.css";
import doc from "../README.md?raw";

const { mode, theme, palette } = getPageParameters() as PageParameters;

const createEditor = () => {
  try {
    applyTheme(theme);
    applyPalette(palette);
    const ed = new MarkdownEditor({ parentId: "page", doc, mode });
    createToolbar(ed);
  } catch (err) {
    console.error(err);
  }
};

createEditor();
