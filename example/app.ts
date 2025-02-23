import { MarkdownEditor } from "@cme/editor";
import { applyTheme, applyPalette } from "@cme/utils";
import { createToolbar } from "./toolbar/toggle-preview";
import { getPageParameters, type PageParameters } from "./parameters";
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
